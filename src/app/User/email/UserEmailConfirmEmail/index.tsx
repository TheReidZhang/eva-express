import { MjmlSection, MjmlColumn, MjmlText, MjmlSpacer } from '@faire/mjml-react';
import CTAButton from 'email/component/CTAButton';
import MainLayout from 'email/layout/MainLayout';
import React from 'react';

// Default values for preview purposes
const previewDefaults: UserConfirmEmailEmailProps = {
  confirmEmailLink: 'https://google.com/confirm_email?code=123124124',
};

export interface UserConfirmEmailEmailProps {
  confirmEmailLink: string;
}

export default function UserConfirmEmailEmail({ confirmEmailLink }: UserConfirmEmailEmailProps = previewDefaults) {
  return (
    <MainLayout>
      <MjmlSection background-color="white" padding="30px 40px">
        <MjmlColumn width="100%">
          <MjmlText fontWeight="bold">Confirm your email</MjmlText>
          <MjmlSpacer />
          <MjmlText>
            Congratulations! You're almost there. Please confirm your email to proceed to the next step!
          </MjmlText>
          <MjmlSpacer />
          <CTAButton link={confirmEmailLink} label="Confirm Email" />
        </MjmlColumn>
      </MjmlSection>
    </MainLayout>
  );
}
