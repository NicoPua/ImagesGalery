import {v2 as cloudinary} from 'cloudinary';

const {CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET} = process.env;

const uptloadCl = async (img : string) => {

    cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_KEY,
    api_secret: CLOUD_SECRET
    });

    const clImg = await cloudinary.uploader.upload(img)
    return clImg.secure_url;

}

module.exports = { uptloadCl }