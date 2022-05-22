import { v2 as cloudinary } from 'cloudinary';
import { KEY_CLOUD, SECRET_CLOUD } from '../config.js';

cloudinary.config({ 
  cloud_name: 'digoyqqyy', 
  api_key: KEY_CLOUD, 
  api_secret: SECRET_CLOUD,
  secure: true
});
//secure es para que utilice ssl

export async function uploadImage(filePath){
  return await cloudinary.uploader.upload(filePath, {
    folder: 'animes'
  })
}

export async function deleteImage(publicId){
  return await cloudinary.uploader.destroy(publicId)
}