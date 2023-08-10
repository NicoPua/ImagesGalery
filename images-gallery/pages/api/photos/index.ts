// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import { dbConnect, dbDisconnect } from '@/utils/mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import cleanAPIData from '@/aux-functions/cleanAPIData';
import validationPostData from '@/aux-functions/validationPostData';

const Photo = require("@/models/Photo");

//ENDPOINT /api/photos

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const {method, body} = req;
  const { UNSPLASH_ACCESS_KEY } = process.env;

  switch (method) {
    case "GET":
      try {
        const response = await axios.get(`https://api.unsplash.com/photos/?client_id=${UNSPLASH_ACCESS_KEY}`);
        const cleanedAPIData : any = await cleanAPIData(response.data);

        const queryOptions: object = {      //Condiciones para filtrar documentos de la database 
          hidden: { $ne: true }
        };
        const allPhotosDB = await Photo.find(queryOptions)
        .populate(
          "user",
          "_id name firstname lastname profilepic email"
        );
        const allPhotos = [...cleanedAPIData, ...allPhotosDB];

        if(allPhotos.length){
          await dbDisconnect();
          return res.status(200).json(allPhotos);
        }else{
          await dbDisconnect();
          return res.status(200).json({ error: "Ha ocurrido un error"});
        }
      } catch (error : any) {
        await dbDisconnect();
        return res.status(400).json({error: error.message});
      }
    break;
    
    case "POST":
      try {
        const { description, user, location, image, rating, likes, reviews } = body;
        
        if(!description || !user){
          return res.status(400).json({ error: "Faltan datos por completar."});
        }

        const fechaActual = new Date;
        const bodyData : BodyInformation = { description, uploaded_on: fechaActual, user, location, image, rating, likes, reviews }
        const errorMsg: string = validationPostData(bodyData);
        if(errorMsg.length !== 0){
          return res.status(400).json({ error: errorMsg })
        }

        const newPhoto = new Photo(bodyData);
        const validationPhoto = newPhoto.validateSync();
        if(validationPhoto){
          await dbDisconnect();
          return res.status(400).json({ error: validationPhoto.errors[Object.keys(validationPhoto.errors)[0]].message});
        }else{
          await newPhoto.save();
          await dbDisconnect();
          return res.status(200).json({ success: "Datos correctos", data: newPhoto });
        }
      } catch (error: any) {
        await dbDisconnect();
        return res.status(400).json({error: error.message})
      }
    break;
    
    default:
      await dbDisconnect();
      return res.status(400).json({error: "La petición HTTP no existe en la base de datos"});
  }
}

export interface BodyInformation{
  description: string,
  uploaded_on: Date,
  user: object,
  location: string,
  image: string,
  rating: number,
  likes: number,
  reviews: string
}