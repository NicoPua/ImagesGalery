import type { NextApiRequest, NextApiResponse } from 'next'
import validationUserData from "@/aux-functions/validationUserData";
import { dbConnect, dbDisconnect } from "@/utils/mongoose";

const User = require('../../../models/User')

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
          const allUsers = await User.find()
          if(allUsers.length) return res.status(200).json(allUsers);
          else return res.status(400).json({error: "Ha ocurrido un error, no se encontraron usuarios."})
        }
      } catch (error: any) {
        console.log(error);
        await dbDisconnect();
        return res.status(400).json({ error: error.message });
      }

    case 'POST':
      try {
        let { name, firstname, lastname, password, email, birthdate, profilepic, age } = body;
        const bodyInfo : userData = { name, firstname, lastname, password, email, birthdate, profilepic, age};

        const existingUser = await User.findOne({email})
        if(existingUser){
          res.status(200).json({error: "El E-mail ingresado se encuentra en uso."})
        }

        const newUser = new User(bodyInfo);
        
        const errorData: string = validationUserData(bodyInfo);
        if(errorData.length !== 0) return res.status(400).json({ error: errorData});

        const validationUser = newUser.validateSync();
        if(validationUser){
          await dbDisconnect();
          res.status(400).json({ error: validationUser.errors[Object.keys(validationUser.errors)[0]].message});
        } 
        console.log(newUser)
        await newUser.save();
        await dbDisconnect();
        res.status(200).json({Nice: "Datos correctos"})

      } catch (error:any) {
        console.log(error);
        await dbDisconnect();
        return res.status(400).json({ error: error.message });
      }
    break;

    default:
      await dbDisconnect();
      return res.status(400).json({ error: "La petición HTTP no existe en la base de datos" });
    
  }
}

export interface userData{
  name: string,
  firstname: string,
  lastname: string,
  password: string,
  email: string, 
  birthdate: string, 
  profilepic: string, 
  age: number
}
