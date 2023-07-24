import { dbConnect, dbDisconnect } from "@/utils/mongoose";

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  await dbConnect();
  const { method, body, query } = req;

  switch (method) {
    case "GET":
      try {
        let { name, address } = query;
        const queryOptions = {
          deleted: { $ne: true },
          active: { $ne: false },
        };
        if (name) {
          queryOptions.name = { $regex: `${name}`, $options: "i" };
        }
        if (address) {
          queryOptions["address.city"] = {
            $regex: `${address}`,
            $options: "i",
          };
        }
        const response = queryOptions
          ? await Employer.find(queryOptions).populate(
              "address",
              "-_id name street state country zipCode city"
            )
          : await Employer.find({}).populate("address", "-_id name city");

        if (response.length === 0) {
          return res.status(404).json({
            error: `No se encontraron empleados con el nombre ${name}`,
          });
        } else {
          await dbDisconnect();
          return res.status(200).json(response);
        }
      } catch (error) {
        console.log(error);
        await dbDisconnect();
        return res.status(400).json({ error: error.message });
      }
      break;
    default:
      await dbDisconnect();
      res.status(404).json({ error: "La petición HTTP no existe en la base de datos" });
      break;
  }
}