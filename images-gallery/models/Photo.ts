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
        "https://img.freepik.com/premium-vector/no-photo-available-vector-icon-default-image-symbol-picture-coming-soon-web-site-mobile-app_87543-10615.jpg?w=2000",
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