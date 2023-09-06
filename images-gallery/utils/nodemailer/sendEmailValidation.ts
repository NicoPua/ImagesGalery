const nodemailer = require("nodemailer");

const { GMAIL, GMAIL_PASS } = process.env;

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: GMAIL,
        pass: GMAIL_PASS,
    }
})

export const mailOptions = (email : string) =>{
    if(email){
        return {
            from: GMAIL,
            to: email
        }
    }else{
        return {
            from: GMAIL,
            to: GMAIL
        }
    }
}
