const FooterBar = () =>{
    return(
        <footer className="bg-gray-900 text-gray-100 w-full h-48  flex flex-row justify-around">
            <div className="flex flex-col justify-around">
                <p>Home</p>
                <p>Upload Photo</p>
                <p>About</p>
                <p>Contact us</p>
            </div>

            <div className="flex flex-col justify-around">
                <p>Next JS</p>
                <p>React JS</p>
                <p>JavaScript</p>
                <p>Tailwind CSS</p>
            </div>

            <div className="flex flex-col justify-around">
                <p>Portfolio</p>
                <p>Dev. Full Stack: Gonzalo Pua</p>
            </div>
        </footer>
    )
}

export default FooterBar;