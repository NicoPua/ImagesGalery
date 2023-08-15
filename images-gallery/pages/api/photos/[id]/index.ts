import cleanDataPhotoAPI from "@/aux-functions/cleanDataPhotoAPI";
import { SinglePhotoDataAPI } from "@/aux-interfaces/auxLittleInterfaces";
import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import axios from "axios";
import { isValidObjectId } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

const Photo = require("@/models/Photo");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    const { method, query: {id}, body } = req;
    const { UNSPLASH_ACCESS_KEY } = process.env;

    switch(method){
        case "GET":
            try {

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
        
        case "PUT":
            try {
                if(isValidObjectId(id)){
                    const { description, location, image, hidden } = body;
                    if(!description || !image || !location) throw new Error("Faltan datos por recibir.");
                    const updatedPhoto = await Photo.updateOne(
                        { _id: id },
                        { 
                            description, 
                            location, 
                            image,
                            hidden 
                        });
    
                    if(updatedPhoto.acknowledged){
                        return res.status(200).json({ 
                            success: true,
                            msg: "Los datos se han actualizado correctamente." 
                        })
                    }else{
                        await dbDisconnect();
                        return res.status(200).json({ 
                            success: false,
                            error: "No se pudo completar la petición, intentelo más tarde."
                        })
                    }
                }else{
                    await dbDisconnect();
                    throw new Error("Por favor, debe ingresar una ID válida.");
                }
            } catch (error : any) {
                await dbDisconnect()
                return res.status(400).json({ error: error.message})
            }
        break;

        case "DELETE": 
            try {
                if(isValidObjectId(id)){
                    const deletedPhoto = await Photo.findByIdAndRemove(id);
                    if(deletedPhoto){
                        return res.status(200).json({ 
                            success: true,
                            msg: `Se han borrado correctamente los datos de: ${id}`
                        });
                    }else{
                        await dbDisconnect();
                        return res.status(400).json({ 
                            success: false,
                            msg: "Ha ocurrido un error, no se pudo remover de la Database."
                        }) 
                    }
                }else{
                    await dbDisconnect();
                    throw new Error("Por favor, debe ingresar una ID válida.");
                }
                
            } catch (error : any){
                await dbDisconnect();
                return res.status(400).json({ error: error.message }) 
            }
        break;
        default:
            await dbDisconnect();
            return res.status(400).json({ error: "La petición HTTP solicitada no existe."});
        break;
    }
}