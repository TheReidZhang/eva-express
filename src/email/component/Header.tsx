import { MjmlSection, MjmlColumn, MjmlImage } from '@faire/mjml-react';
import React from 'react';

export default function Header() {
  return (
    <MjmlSection text-align="center">
      <MjmlColumn width="100%">
        <MjmlImage
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fih1.redbubble.net%2Fimage.699323192.5698%2Fbg%2Cf8f8f8-flat%2C750x%2C075%2Cf-pad%2C750x1000%2Cf8f8f8.u1.jpg&f=1&nofb=1&ipt=3d3d93b359bcf6cb4843ea2168e2b245d5a420446f1bb544e4420af554300dba&ipo=images"
          width="150px"
        />
      </MjmlColumn>
    </MjmlSection>
  );
}
