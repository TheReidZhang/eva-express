import { Mjml, MjmlBody } from '@faire/mjml-react';
import React from 'react';
import Footer from 'email/component/Footer';
import Header from 'email/component/Header';

export default function MainLayout({ children }) {
  return (
    <Mjml>
      <MjmlBody background-color="#E8FBFD">
        <Header />
        {children}
        <Footer />
      </MjmlBody>
    </Mjml>
  );
}
