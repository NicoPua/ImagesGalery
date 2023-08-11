import cleanDataPhotoAPI from "@/aux-functions/cleanDataPhotoAPI";
import { SinglePhotoDataAPI } from "@/aux-interfaces/auxLittleInterfaces";
import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import axios from "axios";
import { isValidObjectId } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

const Photo = require("@/models/Photo");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    const { method, query } = req;
    const { UNSPLASH_ACCESS_KEY } = process.env;

    switch(method){
        case "GET":
            try {
                const { id } = query;

                if(isValidObjectId(id)){        //Pregunto si la ID recibida por QUERY es del tipo "ObjectID".
                    const photoDB = await Photo.findOne({ _id: id });
                    await dbDisconnect();
                    return res.status(200).json(photoDB);
                 }else{
                    const photoAPI = (await axios.get(`https://api.unsplash.com/photos/${id}/?client_id=${UNSPLASH_ACCESS_KEY}`)).data
                    const cleanedPhotoData : SinglePhotoDataAPI = cleanDataPhotoAPI(photoAPI);
                    await dbDisconnect();
                    return res.status(200).json(cleanedPhotoData);
                } 
            } catch (error : any) {
                await dbDisconnect();
                return res.status(400).json({ error: error.message}); 
            }
        break;

        default:
            await dbDisconnect();
            return res.status(400).json({ error: "La petición HTTP solicitada no existe."});
        break;
    }
}