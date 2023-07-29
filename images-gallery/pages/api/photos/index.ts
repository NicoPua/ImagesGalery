// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const Photo = require("@/models/Photo");
import { dbConnect, dbDisconnect } from '@/utils/mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const {method, query, body} = req;

  switch (method) {
    case "GET":
      
      break;
  
    default:
      await dbDisconnect();
      return res.status(400).json({error: "La petición HTTP no existe en la base de datos"});
  }
}
