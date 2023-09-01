import {v2 as cloudinary} from 'cloudinary';

const {CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET} = process.env;

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_KEY,
    api_secret: CLOUD_SECRET
});

const uploadCl = async (fileImg : any) => {
    const clImage = await cloudinary.uploader.upload(fileImg);
    return clImage.secure_url;
}

const deleteCl = async (uploadedImage : any) => {
    const deletedImage = await cloudinary.uploader.destroy(uploadedImage.public_id);
    return deletedImage;
}

export { uploadCl, deleteCl }