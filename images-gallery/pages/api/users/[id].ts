import type { NextApiRequest, NextApiResponse } from 'next'
import validationUserData from "@/aux-functions/validationUserData";
import { dbConnect, dbDisconnect } from "@/utils/mongoose";

const User = require('../../../models/User')

//ENDPOINT: /api/users/[id]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { method, body, query } = req;

  switch (method) {
    case "PUT":
        try {
            const { id } = query;
            const { firstname, lastname, password, email, birthdate, age} = body;
            const userFounded = await User.findById(id);
            if(!userFounded){
                res.status(400).json({error : "No se han encontrado usuarios con esta ID."})
            }

            const updatedUser = await User.updateOne(
                { _id: id },
                {   
                    firstname,
                    lastname, 
                    password, 
                    email,
                    birthdate, 
                    age 
                });
            if (updatedUser.acknowledged){
                await dbDisconnect();
                return res.status(200).json({
                    success: true,
                    msg: "Los datos se actualizaron con éxito!",
                });
            } 
            
            await dbDisconnect();
            return res.status(400).json({
                success: false,
                error: "No se pudo completar la petición, intentelo más tarde.",
            });
        } catch (error: any) {
            console.log(error);
            await dbDisconnect();
            return res.status(400).json({ error: error.message });
        }
    break;
    
    case "DELETE":
    break;

    default:
        await dbDisconnect();
        return res.status(400).json({ error: "La petición HTTP no existe en la base de datos" });
    
  }
}