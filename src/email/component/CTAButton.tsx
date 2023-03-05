import { MjmlButton } from '@faire/mjml-react';
import React from 'react';

export default function CTAButton({ link, label }) {
  return (
    <MjmlButton width="100%" background-color="#264d4f" font-size="18px" href={link}>
      {label}
    </MjmlButton>
  );
}
