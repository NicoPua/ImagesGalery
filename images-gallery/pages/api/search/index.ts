import getAllSearchedPhotos from "@/aux-functions/searchImages/getAllSeachedPhotos";
import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    const { query } = req;
    const imgToSearch = query.data;

    try {
        const allSearchedPhotos = await getAllSearchedPhotos(imgToSearch);
        if(allSearchedPhotos.length === 0){
            return res.status(200).json({ notfound: "No se han encontrado imágenes." });
        }
        return res.status(200).json([...allSearchedPhotos])
    } catch (error : any) {
        await dbDisconnect();
        console.log(error.message);
        return res.status(400).json({error: error.message})
    }
}