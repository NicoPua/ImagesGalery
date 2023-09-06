
export const sendedEmail : any = (validator: string, email: string, AppURL: string) => {
    let template = `
        <!DOCTYPE html>
        <html>
            <img src='https://res.cloudinary.com/djngnnxvp/image/upload/v1693859359/picsart_gallery/hsoh0smdihs5uiliisad.png' alt='PicsArt Logo' width='170' height='100'>
            <h1>¡Muchas gracias por Registrarte!</h1>
            <p>E-mail: ${email}</p>
            <p>Para poder verificar tu cuenta haz click 
                <a href="${AppURL}/users/validation?m=${email}&c=${validator}">AQUÍ</a>
                y podrás Iniciar sesión.</p>
            <p>- Equipo de PicsArt Gallery</p>
        </html>
        `
    return template;
}