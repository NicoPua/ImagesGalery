import type { NextApiRequest, NextApiResponse } from 'next'
import validationUserData from "@/aux-functions/validations/validationUserData";
import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import { encryptPass, verifyPassword } from '@/utils/lib/lib';
import { mailOptions, transporter } from '@/utils/nodemailer/sendEmailValidation';
import { sendedEmail } from '@/utils/nodemailer/sendedEmail';

const User = require('../../../models/User')

const { APP_URL } = process.env;

interface queryObj {
  deleted: object,
  active: object,
  firstname?: object
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { method, body, query } = req;

  switch (method) {
    case "GET":
      try {
        let { firstname } = query;
        const queryOptions: queryObj = {      //Condiciones para filtrar documentos de la database 
          deleted: { $ne: true },
          active: { $ne: false },
        };

        if (firstname) {
          queryOptions.firstname = { $regex: `${firstname}`, $options: "i" };
          const response = await User.find(queryOptions)
          if (response.length === 0) {
            await dbDisconnect();
            return res.status(404).json({ error: `No se encontraron usuarios ACTIVOS con el nombre '${firstname}'.`,});
          } else {
            await dbDisconnect();
            return res.status(200).json(response);
          }
        }else{
          const allUsers = await User.find(queryOptions)
          if(allUsers.length) {
            await dbDisconnect();
            return res.status(200).json(allUsers);
          }else{
            await dbDisconnect();
            return res.status(400).json({error: "Ha ocurrido un error, no se encontraron usuarios."});
          } 
        }
      } catch (error: any) {
        console.log(error);
        await dbDisconnect();
        return res.status(400).json({ error: error.message });
      }

    case 'POST':
      try {
        let { name, firstname, lastname, password, email, birthdate } = body;

        //Pass
        const { encryptedPassword, newSalt} : any = await encryptPass(password);

        const passwordMatch : Promise<boolean> = await verifyPassword(
          password, 
          encryptedPassword, 
          newSalt
        ) as Promise<boolean>;

        if (!passwordMatch) {
          await dbDisconnect();
          return res.status(400).json({ success: false, msg: "La contraseña es incorrecta" });
        }
        let validatorEncode = newSalt.toString("base64");
        let validator = encodeURIComponent(validatorEncode);

        //------------------
        const bodyInfo : userData = { 
          name, 
          firstname, 
          lastname, 
          password: encryptedPassword,
          email,
          birthdate,
          salt: newSalt,
          validator: validator
        };

        /* const existingUser = await User.findOne({email})
        if(existingUser){
          return res.status(200).json({ success: false, msg: "El E-mail ingresado se encuentra en uso."})
        } */
        
        const options : object = mailOptions("nicopua7@gmail.com")  //CAMBIAR POR 'email' cuando esté listo.
        await transporter.sendMail({
          ...options,
          subject: `${firstname} ${lastname} (${name})`,
          text: "PicsArt Register",
          html: sendedEmail(validator, email, APP_URL)
        });

        const newUser = new User(bodyInfo);
        console.log(newUser)
        const errorData: string = validationUserData(bodyInfo);
        if(errorData.length !== 0) throw new Error(errorData);

        const validationUser = newUser.validateSync();
        if(validationUser){
          await dbDisconnect();
          return res.status(400).json({ error: validationUser.errors[Object.keys(validationUser.errors)[0]].message});
        } 
        await newUser.save();
        await dbDisconnect();
        return res.status(200).json({ success: true, msg: "Usuario registrado con éxito." });

      } catch (error:any) {
        console.log(error);
        await dbDisconnect();
        return res.status(400).json({ success: false, error: error.message });
      }
    break;

    default:
      await dbDisconnect();
      return res.status(400).json({ error: "La petición HTTP no existe en la base de datos" });
    break;
  }
}

export interface userData{
  name: string,
  firstname: string,
  lastname: string,
  password: string,
  email: string, 
  birthdate: string,
  salt: string,
  validator: string,
}
