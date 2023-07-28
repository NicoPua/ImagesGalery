import { Schema, model, models, Document, Model} from 'mongoose'

interface UserDocument extends Document {
    firstname: string;
    lastname: string;
    name: string;
    password: string;
    email: string;
    profilepic: string;
    birthdate: Date;
    age?: number;
    active: boolean;
    deleted: boolean;
  }

var userSchema = new Schema<UserDocument>(
    {
        firstname: {
            type: String,
            required: [true, "El nombre es requerido"],
            trim: true
        },
        lastname: {
            type: String,
            required: [true, "El apellido es requerido"],
            trim: true
        },
        name: {
            type: String,
            required: [true, "El nombre de usuario es requerido"],
            trim: true
        }
        ,
        password: {
            type: String,
            required: [true, "La contraseña es requerida"],
        },
        email: {
            type: String,
            required: [true, "El email es requerido"],
        },
        profilepic: {
            type: String,
            default: 'https://res.cloudinary.com/dacl2du1v/image/upload/v1684330929/userAvt_tkcm8u.png',
        },
        birthdate: {
            type: Date,
            required: [true, "La fecha de nacimiento es requerida"],
        },
        age: { 
            type: Number
        },
        active: {
            type: Boolean,
            default: false,
        },
        deleted: { 
            type: Boolean,
            default: true
        }
    },
    { timestamps: false, versionKey: false }
)

const User: Model<UserDocument> = models.User || model<UserDocument>("User", userSchema);

module.exports = User;