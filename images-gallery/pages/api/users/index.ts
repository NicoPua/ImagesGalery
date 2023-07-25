import { dbConnect, dbDisconnect } from "@/utils/mongoose";

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  error?: any;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
  await dbConnect();
  const { method, body, query } = req;

  switch (method) {
    case "GET":
      try {
        let { name, password, birthdate, profilepic, age} = query;
        await dbDisconnect();
        return res.status(200).json({error:"among us"})
      } catch (error: any) {
        console.log(error);
        await dbDisconnect();
        return res.status(400).json({ error: error.message });
      }
    break;

    default:
      await dbDisconnect();
      return res.status(400).json({ error: "La petición HTTP no existe en la base de datos" });
    break;
  }
}