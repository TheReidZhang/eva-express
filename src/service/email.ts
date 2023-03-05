const { NODE_ENV, MAILER_HOST, MAILER_PORT, MAILER_AUTH_USER, MAILER_AUTH_PASS, MAILER_DOMAIN } = process.env;

import { renderToMjml } from '@faire/mjml-react/utils/renderToMjml';
import mjml2html from 'mjml';
import { MJMLParseResults } from 'mjml-core';
import { ReactElement } from 'react';
import Mail, { Attachment } from 'nodemailer/lib/mailer';
import nodemailer from 'nodemailer';
import _ from 'lodash';
import htmlToText from 'html-to-text';

const emails = {
  communication: { address: `communication@${MAILER_DOMAIN}`, name: 'Nitra' },
  support: { address: `support@${MAILER_DOMAIN}`, name: 'Support' },
  welcome: { address: `welcome@${MAILER_DOMAIN}`, name: 'Welcome' },
  storage: { address: `storage@${MAILER_DOMAIN}`, name: 'Storage' },
  errors: { address: `errors@${MAILER_DOMAIN}`, name: 'Errors' },
  doNotReply: {
    address: `donotreply@${MAILER_DOMAIN}`,
    name: 'Do Not Reply',
  },
};

function render(email: ReactElement): MJMLParseResults {
  return mjml2html(renderToMjml(email), { validationLevel: 'strict' });
}

type EmailSendArgs<TemplateProps> = {
  from: string;
  name: string;
  subject: string;
  email: (args: TemplateProps) => JSX.Element;
  tos: string[];
  ccs?: string[];
  bccs?: string[];
  extraOptions?: any;
  attachments?: Attachment[];
  args: TemplateProps;
};

async function send<TemplateProps>({
  from,
  name,
  subject,
  email,
  tos,
  ccs = [],
  bccs = [],
  extraOptions = {},
  attachments = [],
  args,
}: EmailSendArgs<TemplateProps>) {
  // validate tos
  if (tos.length === 0) {
    throw new Error('Email must be sent to at least one recipient.');
  }

  tos = _.uniq(tos);
  ccs = _.uniq(ccs);
  bccs = _.uniq(bccs);

  const { html, json, errors } = render(email(args));
  if (errors.length > 0) throw new Error('MJML render error: ' + errors);

  // create message
  // Docs: https://nodemailer.com/message/addresses/
  const message: Mail = {
    from: {
      name: name,
      address: from,
    },
    to: tos,
    ccs: ccs,
    bccs: bccs,
    attachments: attachments,
    subject: subject,
    text: htmlToText.convert(html), // convert the html to text
    html,
    ...extraOptions,
  };

  /**
   * send email
   *
   * sendgrid doc to add key - https://stackoverflow.com/questions/34811307/nodemailer-sendgrid-with-apikey
   * Send Example Below:
   * const mailer = nodemailer.createTransport({
   *   host: 'smtp.sendgrid.net',
   *   port: 465,
   *   secure: true,
   *   auth: {
   *     user: 'apikey',
   *     pass: 'SG.XXXX.XXXX',
   *   },
   * });
   */
  const transporter = nodemailer.createTransport({
    host: MAILER_HOST,
    port: Number(MAILER_PORT),
    secure: MAILER_PORT === '465', // true for 465, false for other ports
    auth: {
      user: MAILER_AUTH_USER, // generated ethereal user
      pass: MAILER_AUTH_PASS, // generated ethereal password
    },
  });

  return await transporter.sendMail(message);
} // END send

export default { render, send, emails };
