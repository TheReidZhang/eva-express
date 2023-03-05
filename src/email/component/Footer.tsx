import { MjmlSection, MjmlColumn, MjmlDivider, MjmlText } from '@faire/mjml-react';
import React from 'react';

export default function Footer() {
  return (
    <MjmlSection background-color="white" padding="20px">
      <MjmlColumn width="100%">
        <MjmlDivider border-width="1px" border-color="lightgray"></MjmlDivider>
        <MjmlText>1 (666) 888 8686</MjmlText>
        <MjmlText>support@support.com</MjmlText>
        <MjmlText>New York, NY. United States</MjmlText>
        <MjmlText>Terms of use</MjmlText>
        <MjmlText>Privacy Policy</MjmlText>
      </MjmlColumn>
    </MjmlSection>
  );
}
