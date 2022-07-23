import mongoose from 'mongoose';
import {MONGODB_URI} from './config.js'

export async function connectToDb() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('DB connect!')
  }
  catch{
    console.log('Error DB')
  }
}