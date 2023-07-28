const mongoose = require("mongoose");

interface MyConnectOptions{
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

export async function dbConnect(): Promise<void> {
  try {
    const options: MyConnectOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  
    await mongoose.connect(process.env.MONGODB_URL!, options)

    const db = mongoose.connection;
    db.on("error", (err: any) => {
      console.error("Connection error", err);
    });
    db.once("open", () => {
      console.log("Connection established");
    });
   
  } catch (error: any) {
    console.error("Error connecting to Images-Gallery Database", error);
  }
}

export async function dbDisconnect(): Promise<void> {
  await mongoose.connection.close();
  console.log("Connection shutdown");
}