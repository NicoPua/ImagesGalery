import { Schema, model, models} from 'mongoose'

var userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "El usuario es requerido"],
            trim: true
        },
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
            default: false
        }
    },
    { timestamps: false, versionKey: false }
)

var User = models.User || model("User", userSchema);

module.exports = User;