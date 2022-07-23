import mongoose from "mongoose";
import slugify from "../plugins/slugify.js";

const AnimeSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true, //esto funciona para quitar los espacios al inicio y final
    unique: true
  },
  description: {
    type: String,
    require: true,
    trim: true
  },
  lauching: {
    type: String,
    require: true,
    trim: true
  },
  image: {
    public_id: String,
    secure_url: String
  },
  slug: {
    type: String,
    unique: true
  }
},{
  timestamps: true
});

AnimeSchema.pre('save', function(next){
  if(this.slug) return next();
  generateSlugAndContinue.call(this,0,next);
});

AnimeSchema.statics.validateSlugCount = function(slug){
  return Anime.count({slug: slug})
    .then(count=>{
      if(count > 0) return false;
      return true;
    })
}

function generateSlugAndContinue(count, next){
  this.slug = slugify(this.name);

  if(count != 0)
    this.slug = this.slug + "-" + count;
  
  Anime.validateSlugCount(this.slug).then(isValid=>{
    if(!isValid)
      return generateSlugAndContinue.call(this,count+1,next);
    
    next();
  })
}

let Anime = mongoose.model("Anime", AnimeSchema);

export default Anime;