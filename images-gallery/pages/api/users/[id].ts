import type { NextApiRequest, NextApiResponse } from 'next'
import validationUserData from "@/aux-functions/validationUserData";
import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import { userData } from "@/pages/api/users"
import { isValidObjectId } from 'mongoose';
import { getUserById } from '@/aux-functions/usernameAPI/getUserById';

const User = require('../../../models/User')

//ENDPOINT: /api/users/[id]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { method, body, query } = req;

  switch (method) {
    case 'GET':
        try {
            const { id } = query;
            if(isValidObjectId(id)){            //Pregunto si la ID recibida por QUERY es del tipo "ObjectID".
                const userByIdDB = await User.findById(id);
                return res.status(200).json(userByIdDB);
            }else{
                if (typeof id === 'string') {
                    const userName = id;
                    const userByIdAPI = await getUserById(userName);  //Envio en username en vez de la ID.
                    return res.status(200).json(userByIdAPI);
                } else {
                    throw new Error('Username inválido');
                }

            }
        } catch (error: any) {
            await dbDisconnect();
            return res.status(400).json({ error: error.message})
        }
    break;
    case "PUT":
        try {
            const { id } = query;
            const userFounded = await User.findById(id);
            if(!userFounded) throw new Error("No se han encontrado usuarios con esta ID.");
            
            const { firstname, lastname, email, birthdate, age} = body;
            const bodyInfo: userData = { 
                firstname , 
                lastname, 
                email, 
                birthdate, 
                age, 
                name: userFounded.name , 
                password: userFounded.password, 
                profilepic: userFounded.profilepic
            };

            if(!firstname || !lastname || !email || !birthdate || !age) throw new Error("Faltan datos por ingresar.")
            
            const errorMsg : string = validationUserData(bodyInfo);
            if(errorMsg) return res.status(400).json({error: errorMsg})

            const updatedUser = await User.updateOne(
                { _id: id },
                {   
                    firstname,
                    lastname, 
                    email,
                    birthdate, 
                    age 
                }
            );

            if (updatedUser.acknowledged){
                await dbDisconnect();
                return res.status(200).json({
                    success: true,
                    msg: "Los datos se actualizaron con éxito!",
                });
            } 
            await dbDisconnect();
            return res.status(400).json({
                success: false,
                error: "No se pudo completar la petición, intentelo más tarde.",
            });
        } catch (error: any) {
            await dbDisconnect();
            return res.status(404).json({ error: error.message });
        }
    break;
    
    case "DELETE":
        try {
            const { id } = query;

            const userToDelete = await User.findById(id);
            if(!userToDelete) {
                await dbDisconnect();
                return res.status(400).json({error: "No se ha encontrado el usuario con esa ID."});
            }else{
                await User.findByIdAndDelete(id);
                await dbDisconnect();
                return res.status(200).json({success: "Se ha borrado al usuario exitosamente."})
            }
        } catch (error: any) {
            await dbDisconnect();
            return res.status(400).json({ error: error.message })
        }
    break;

    default:
        await dbDisconnect();
        return res.status(404).json({ error: "El tipo de petición HTTP no existe en en el backend." });  
  }
}