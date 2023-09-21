import type { NextApiRequest, NextApiResponse } from 'next'
import validationUserData from "@/aux-functions/validations/validationUserData";
import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import { isValidObjectId } from 'mongoose';
import { getUserById } from '@/aux-functions/usernameAPI/getUserById';
import { encryptPass, verifyPassword } from '@/utils/lib/lib';

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
            
            const { name, firstname, lastname, email, birthdate, password } = body;

            if(password){
                const { encryptedPassword, newSalt} : any = await encryptPass(password);
                const passwordMatch = await verifyPassword(password, encryptedPassword, newSalt);

                if(!passwordMatch){
                    await dbDisconnect();
                    throw new Error("Ocurrió un error con la contraseña.")
                }

                const bodyInfo: any = { 
                    firstname: firstname? firstname : userFounded.firstname, 
                    lastname: lastname? lastname : userFounded.lastname, 
                    email: email? email : userFounded.email, 
                    birthdate: birthdate? birthdate : userFounded.birthdate, 
                    name: name? name : userFounded.name, 
                    password: password? encryptedPassword : userFounded.password, 
                    salt: password? newSalt : userFounded.salt
                };

                const errorMsg : string = validationUserData(bodyInfo);
                if(errorMsg) return res.status(400).json({error: errorMsg})

                const updatedUser = await User.updateOne(
                    { _id: id },
                    {   
                        ...bodyInfo
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
            }else{
                const bodyInfo: any = { 
                    firstname: firstname? firstname : userFounded.firstname, 
                    lastname: lastname? lastname : userFounded.lastname, 
                    email: email? email : userFounded.email, 
                    birthdate: birthdate? birthdate : userFounded.birthdate, 
                    name: name? name : userFounded.name
                };

                const errorMsg : string = validationUserData(bodyInfo);
                if(errorMsg) return res.status(400).json({error: errorMsg})

                const updatedUser = await User.updateOne(
                    { _id: id },
                    {   
                        ...bodyInfo
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
            }
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