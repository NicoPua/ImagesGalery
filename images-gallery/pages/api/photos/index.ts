// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import { dbConnect, dbDisconnect } from '@/utils/mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import cleanAPIData from '@/aux-functions/cleanAPIData';
import validationPostData from '@/aux-functions/validations/validationPostData';

const Photo = require("@/models/Photo");

//ENDPOINT /api/photos

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { 
    method,
    body,
    query
  } = req;

  const { UNSPLASH_ACCESS_KEY } = process.env;

  switch (method) {
    case "GET":
      const {idUser} = query;

      try {
        if(idUser){     //Pregunto si hay una ID de un usuario por QUERY.
          const queryOptions = {
            user: idUser
          }
          const userPhotos = await Photo.find(queryOptions)
          .populate(
            "user",
            "_id name firstname lastname profilepic email"
          );

          if(!userPhotos){
            await dbDisconnect();
            throw new Error("No se ha encontrado la imagen con esa userID.");
          }

          return res.status(200).json(userPhotos) 
        }else{         
          const response = await axios.get(`https://api.unsplash.com/photos/?client_id=${UNSPLASH_ACCESS_KEY}`);
          const cleanedAPIData : any = await cleanAPIData(response.data);

          /* const queryOptions: object = {      //Condiciones para filtrar documentos de la database 
            hidden: { $ne: true }
          };
          const allPhotosDB = await Photo.find(queryOptions)
          .populate(
            "user",
            "_id name firstname lastname profilepic email"
          ); */
          if(cleanedAPIData.length){
            return res.status(200).json(cleanedAPIData);
          }else{
            await dbDisconnect();
            throw new Error("Ha ocurrido un error");
          }
        }
      } catch (error : any) {
        await dbDisconnect();
        return res.status(400).json({error: error.message});
      }
    break;
    
    case "POST":
      try {
        const { description, user, image, location, rating, likes, categories, reviews } = body;

        if(!description || !user || !image){
          throw new Error("Faltan datos por completar.");
        }
        
        const fechaActual = new Date;
        const bodyData : BodyInformation = { description, uploaded_on: fechaActual, categories, user, location, image, rating, likes, reviews }
        const errorMsg: string = validationPostData(bodyData);
        if(errorMsg.length !== 0){
          throw new Error(errorMsg); 
        }
        
        const newPhoto = new Photo(bodyData);
        const invalidPhoto = newPhoto.validateSync();
        if(invalidPhoto){
          await dbDisconnect();
          throw new Error (invalidPhoto.errors[Object.keys(invalidPhoto.errors)[0]].message);
        }else{
          await newPhoto.save();
          await dbDisconnect();
          return res.status(200).json({ success: "Datos correctos", data: newPhoto });
        }
      } catch (error: any) {
        await dbDisconnect();
        console.log(error)
        return res.status(400).json({error: error.message})
      }
    break;
    
    default:
      await dbDisconnect();
      return res.status(400).json({error: "La petición HTTP no existe."});
    break;
  }
}

export interface BodyInformation{
  description: string,
  uploaded_on: Date,
  user: object,
  location: string,
  image: any,
  rating: number,
  likes: number,
  categories: string[],
  reviews: string
}