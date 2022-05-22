import { Router } from 'express';

const router = Router();

router.get('/', (req, res)=>{
  res.send("Funcionando");
})

export default router;