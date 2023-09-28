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
        <link rel="icon" href="https://res.cloudinary.com/djngnnxvp/image/upload/v1695910559/onlylogo_j5wxiv.png" />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://res.cloudinary.com/djngnnxvp/image/upload/v1695910120/completelogo_pikj3i.png" />
      </NextHead>

      <NavBar />
      <main>{children}</main>
      <FooterBar />
    </div>
  );
};

export default Layout;
