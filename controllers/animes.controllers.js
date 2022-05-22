import Anime from "../models/animes.model.js";
import fs from 'fs-extra';
import { uploadImage, deleteImage } from '../utils/cloudinary.js'

export const getAnimes = async (req, res)=>{
  try{
      const animes = await Anime.find();
      res.json(animes)
  } catch (error){
      return res.status(500).json({"message": error.message})
  }
}

export const getAnime = async (req, res)=>{
  try{
      const anime = await Anime.findById(req.params.id);
      res.json(anime)  
  } catch(error){
      return res.status(500).json({"message": error.message})
  }
}

export const createAnime = async (req, res)=>{
  try{
      const { name, description, lauching } = req.body;
      //console.log(req.files)
      const anime = new Anime({
        name, 
        description,
        lauching
      })

      if(req.files?.image){
        const answer = await uploadImage(req.files.image.tempFilePath);
        anime.image = {
          public_id: answer.public_id,
          secure_url: answer.secure_url
        }
        //console.log(answer);
        await fs.unlink(req.files.image.tempFilePath);//es para eliminar las img  de uploads
      }
    
      await anime.save();
      
      res.json(anime);
  } catch(error){
      return res.status(500).json({"message": error.message})
  }
}

export const editAnime = async (req, res)=>{
  try{
      const { name, description, lauching } = req.body;
      const anime = await Anime.findByIdAndUpdate(req.params.id, {name, description, lauching });
    
      if(req.files?.image){
        console.log(anime.image.public_id);
        await deleteImage(anime.image.public_id);
        
        const answer = await uploadImage(req.files.image.tempFilePath);
        anime.image = {
          public_id: answer.public_id,
          secure_url: answer.secure_url
        }
        await anime.save();
        
        //console.log(answer);
        await fs.unlink(req.files.image.tempFilePath);//es para eliminar las img de uploads
      }
    
      res.json({"status": "success put"});
  } catch(error){
      return res.status(500).json({"message": error.message})
  }
}

export const deleteAnime = async (req, res)=>{
  try{
      const anime = await Anime.findByIdAndDelete(req.params.id);

      if(!anime) return res.status(404).json({"message": "Anime not found"})

      await deleteImage(anime.image.public_id);
    
      res.json({"status": "success delete"});
  } catch(error){
      return res.status(500).json({"message": error.message})
  }
}