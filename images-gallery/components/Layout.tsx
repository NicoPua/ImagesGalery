import React from "react";
import NextHead from "next/head";
import FooterBar from "./FooterBar";
import NavBar from "./NavBar";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

const Layout = ({children , title, description}: LayoutProps) => {
  return (
    <div>
      <NextHead>
        <title>{title}</title>
        <meta name="description" content={description}/>
      </NextHead>

      <NavBar />
      <main>{children}</main>
      <FooterBar />
    </div>
  );
};

export default Layout;
