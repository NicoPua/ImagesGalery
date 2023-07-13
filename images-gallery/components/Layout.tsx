import React from "react";

const Layout = ({ children, title, description}) => {
    return(
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
    )
}

export default Layout;

