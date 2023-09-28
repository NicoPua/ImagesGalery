import { Schema, model, models, Document, Model} from 'mongoose'

interface UserDocument extends Document {
    firstname: string,
    lastname: string,
    name: string,
    password: string,
    email: string,
    profilepic: string,
    birthdate: Date,
    social: SocialInterface,
    created_at: Date,
    updated_on: Date,
    salt: string,
    validator: string,
    active: boolean,
    deleted: boolean,
}

interface SocialInterface{
    instagram: string,
    twitter: string,
    portfolio: string
}

const userSchema = new Schema<UserDocument>(
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
        social: {
            instagram: {
                type: String,
                default: "",
                trim: true
            },
            twitter: {
                type: String,
                default: "",
                trim: true
            },
            portfolio: {
                type: String,
                default: "",
                trim: true
            }
        },
        created_at: {
            type: Date
        },
        updated_on: {
            type: Date
        },
        salt: {
            type: String,
            default: ""
        },
        validator: {
            type: String,
            default: ""
        },
        active: {
            type: Boolean,
            default: false,
        },
        deleted: { 
            type: Boolean,
            default: false
        }
    },
    { timestamps: false, versionKey: false }
)

const User: Model<UserDocument> = models.User || model<UserDocument>("User", userSchema);

module.exports = User;