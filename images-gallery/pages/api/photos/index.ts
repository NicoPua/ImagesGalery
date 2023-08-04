// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const Photo = require("@/models/Photo");
import axios from 'axios';
import { dbConnect, dbDisconnect } from '@/utils/mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import cleanAPIData from '@/aux-functions/cleanAPIData';

//ENDPOINT /api/photos

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const {method, query, body} = req;
  const { UNSPLASH_ACCESS_KEY } = process.env;

  switch (method) {
    case "GET":
      try {
        const response = await axios.get(`https://api.unsplash.com/photos/?client_id=${UNSPLASH_ACCESS_KEY}`);

        const cleanedData : any = await cleanAPIData(response.data);
        if(cleanedData.length){
          await dbDisconnect();
          return res.status(200).json(cleanedData);
        }else{
          await dbDisconnect();
          return res.status(200).json({ error: "Ha ocurrido un error"});
        }
      } catch (error : any) {
        await dbDisconnect();
        return res.status(400).json({error: error.message});
      }
      break;
  
    default:
      await dbDisconnect();
      return res.status(400).json({error: "La petición HTTP no existe en la base de datos"});
  }
}
