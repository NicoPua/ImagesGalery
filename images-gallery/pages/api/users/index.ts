import { dbConnect, dbDisconnect } from "@/utils/mongoose";
const User = require('../../../models/User')

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  error?: any;
}

interface queryObj {
  deleted: object,
  active: object,
  name?: object
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
  await dbConnect();
  const { method, body, query } = req;

  switch (method) {
    case "GET":
      try {
        let { name } = query;
        const queryOptions: queryObj = {
          deleted: { $ne: true },
          active: { $ne: false },
        };

        if (name) {
          queryOptions.name = { $regex: `${name}`, $options: "i" };
        }

        const response = await User.find(queryOptions)

        if (response.length === 0) {
          await dbDisconnect();
          return res.status(404).json({ error: `No se encontraron usuarios con el nombre '${name}'.`,});
        } else {
          await dbDisconnect();
          return res.status(200).json(response);
        }
      } catch (error: any) {
        console.log(error);
        await dbDisconnect();
        return res.status(400).json({ error: error.message });
      }

    case 'POST':
      try {
        let { name, password, email, birthdate, profilepic, age} = body;
        
        const existingUser = await User.findOne({email})
        if(existingUser){
          res.status(200).json({error: "El E-mail ingresado se encuentra en uso."})
        }

        const newUser = new User({ name, password, email, birthdate, profilepic, age})
      } catch (error) {
        
      }
    break;

    default:
      await dbDisconnect();
      return res.status(400).json({ error: "La petición HTTP no existe en la base de datos" });
    break;
  }
}