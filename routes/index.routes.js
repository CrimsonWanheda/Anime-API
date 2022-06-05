import { Router } from 'express';
import fs from 'fs';

const router = Router();

router.get('/', (req, res)=>{
<<<<<<< HEAD
  res.render("index");
=======
  res.render("main")
>>>>>>> 5585b073b9cd802f93f5e9f695996507261980ee
  
})

export default router;