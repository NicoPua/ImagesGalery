import axios from "axios";
import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import cleanedDataRandomPic from "@/aux-functions/cleanDataRandomPic";
import { PhotoData } from "@/aux-interfaces/apiInterface";

const Photo = require("@/models/Photo");

export default async function handler(req: NextApiRequest, res: NextApiResponse ){
    await dbConnect();
    const { method, query, body} = req;
    const { UNSPLASH_ACCESS_KEY } = process.env;

    switch(method){
        case "GET": 
            try {
                const randomNumber = Math.floor((10 * Math.random()));
                if(randomNumber < 5 ){
                    const response = await axios.get(`https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_ACCESS_KEY}`);
                    const cleanedAPIData : PhotoData = cleanedDataRandomPic(response.data);
                    await dbDisconnect();
                    return res.status(200).json(cleanedAPIData);
                }else{
                    const randomPhoto = await Photo.aggregate([
                        { $sample: { size: 1 } },
                        {
                            $lookup: {
                                from: "users",  // Nombre de la colección "users"
                                localField: "user",
                                foreignField: "_id",
                                as: "user"
                            }
                        },{ 
                            $unwind: "$user"  // Deshacer el array creado por $lookup 
                        }
                    ],);
                    await dbDisconnect();
                    return res.status(200).json(randomPhoto[0])
                }              
            } catch (error: any) {
                await dbDisconnect();
                return res.status(400).json({ error: error.message})
            }
        break;

        default:
            await dbDisconnect();
            return res.status(400).json({error: "La petición HTTP no existe."});
        break;
    }
}