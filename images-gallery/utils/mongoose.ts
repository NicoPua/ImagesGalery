import mongoose, { Connection, ConnectOptions } from "mongoose";

interface MyConnectOptions extends ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

export async function dbConnect(): Promise<void> {
  const options: MyConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(process.env.MONGODB_URL!, options)
  .then(() => {
    const db: Connection = mongoose.connection;
    db.on("error", (err) => {
      console.error("Connection error", err);
    });
    db.once("open", () => {
      console.log("Connection established");
    });
  })
  .catch((error) => {
    console.error("Error connecting to Images-Gallery Database", error);
  });
}

export async function dbDisconnect(): Promise<void> {
  await mongoose.connection.close();
  console.log("Connection shutdown");
}