import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import { verifyPassword } from "@/utils/lib/lib";
import { NextAuthOptions } from "next-auth";

const User = require('../../../models/User');

const googleClientId = process.env.GOOGLE_CLIENT_ID || '';
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || '';

interface MyAuthOptions extends NextAuthOptions {
  providers: NextAuthOptions['providers'];
}


const authOptions : MyAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jsmith@mail.com",
        },
        password: { 
          label: "Password", 
          type: "password" 
        },
      },

      async authorize(credentials : any) {
        const { username, password } = credentials;
        if (!username || !password) {
          throw new Error("Todos los campos son obligatorios");
        }
        await dbConnect();

        let email = username;
        let user = await User.findOne({ email });

        console.log(user);

        if (!user) {
          await dbDisconnect();
          throw new Error("E-mail no registrado.");
        }

        if (!user.active) {
          await dbDisconnect();
          throw new Error("El usuario no ha sido activado");
        }

        if (user.deleted) {
          await dbDisconnect();
          throw new Error(
            "El usuario ha sido borrado por incumplimiento de las normas, si lo considera un error, envíe un mail a nicopua7@gmail.com"
          );
        }

        let isValid;

        isValid = await verifyPassword(password, user.password, user.salt);

        if (!isValid) {
          await dbDisconnect();
          throw new Error("Password incorrecto.");
        }

        let logedUser = {
          id: user._id,
          username: user.name,
          name: `${user.firstname} ${user.lastname}`,
          email: user.email,
          image: user.profilepic,
        };
        await dbDisconnect();
        return logedUser;
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/users/login",
  },
  callbacks: {
    async signIn({ account, profile } : any) : Promise<string | boolean> {
      if (account.provider === "google") {
        //console.log('google profile: ', profile);
        let logedUser: any = {
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          provider: 'google',
        };

        return logedUser;
      }

      if (account.provider === "credentials") {
        console.log('credentials profile: ', profile);
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
  }

}

export default NextAuth(authOptions);
