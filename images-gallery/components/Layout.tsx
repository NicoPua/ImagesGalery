import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  title: string;
  description: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title, description }) => {
  return (
    <div>
      <nav>
        <p>Hola</p>
        <p>Hola</p>
        <p>Hola</p>
      </nav>

      <main>{children}</main>

      <footer>
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
