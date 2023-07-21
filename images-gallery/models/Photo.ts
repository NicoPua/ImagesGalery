import { Schema, model, models } from "mongoose";

var photoSchema = new Schema(
  {
    description: {
      type: String,
      required: [true, "La descripcion es requerida"]
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    location: {
      type: String,
      default: 'undefined',
    },
    rating: {
      type: String,
    },
    profilepic: {
      type: String,
      default:
        "https://res.cloudinary.com/dacl2du1v/image/upload/v1684330929/userAvt_tkcm8u.png",
    },
    likes: {
      type: Number
    }
    ,
    reviews: {
      type: String,
      description: String,
    },
    hidden: { 
      type: Boolean,
      default: false
    },
  },
  { timestamps: false, versionKey: false }
);

var Photo = models.Photo || model("Photo", photoSchema);

module.exports = Photo;