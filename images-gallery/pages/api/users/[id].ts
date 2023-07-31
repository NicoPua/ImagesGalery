import type { NextApiRequest, NextApiResponse } from 'next'
import validationUserData from "@/aux-functions/validationUserData";
import { dbConnect, dbDisconnect } from "@/utils/mongoose";

const User = require('../../../models/User')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { method, body, query } = req;

  switch (method) {
    case "PUT":
        try {
            const { _id } = query;

            const userFounded = await User.findOne({ _id });
            if(!userFounded){
            res.status(400).json({error : "No se han encontrado usuarios con esta ID."})
            }
            res.status(200).json(userFounded)
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