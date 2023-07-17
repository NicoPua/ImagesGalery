import React from "react";
import NextHead from "next/head";

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

      <nav className="w-full flex flex-row justify-around ">
        <p>Hola</p>
        <p>Hola</p>
        <p>Hola</p>
      </nav>

      <main>{children}</main>

      <footer className="w-full flex flex-row justify-around">
        <p>Hola</p>
        <p>Hola</p>
        <p>Hola</p>

        <p>Hola</p>
        <p>Hola</p>
        <p>Hola</p>

        <p>Hola</p>
        <p>Hola</p>
        <p>Hola</p>
      </footer>
    </div>
  );
};

export default Layout;
