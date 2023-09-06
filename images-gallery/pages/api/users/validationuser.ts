import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import { NextApiRequest, NextApiResponse } from "next";

const User = require('../../../models/User')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    const { method, body } = req;
  
    switch (method) {
      case "PUT":
        try {
            const { validator, email } = body;
            console.log(validator, email);

            let user = await User.findOne({ email }).exec();

            if (!user) throw new Error("No se encontró al usuario");

            if (user) {
                let validatorEncoderFromDB = decodeURIComponent(user.validator);
                let validatorEncoderFromQuery = decodeURIComponent(validator);
                console.log(validatorEncoderFromDB)
                console.log(validatorEncoderFromQuery)
                if (validatorEncoderFromDB == validatorEncoderFromQuery) {
                    let result = await User.updateOne(
                        { email: user.email },
                        { $set: { active: true } }
                    ).exec();
                                     
                    if (result.acknowledged) {
                        return res.status(200).json({
                            success: true,
                            msg: "Se actualizo con éxito.",
                            user: user,
                        });
                    }
                }
            }
            throw new Error("El validator no es válido");
        } catch (error:any) {
            await dbDisconnect();
            return res.status(400).json({ success: false, error: error.message })
        }  
      break;

      default:
        await dbDisconnect();
        return res.status(400).json({error: "La petición HTTP no existe."})
    }
}