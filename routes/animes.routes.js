import { Router } from 'express';
import { getAnimes, getAnime, createAnime, editAnime, deleteAnime } from '../controllers/animes.controllers.js';
import fileUpload from 'express-fileupload';

const router = Router();

router.get('/animes', getAnimes);

router.get('/animes/:id', getAnime);

router.post('/animes', fileUpload({
    useTempFiles : true,
    tempFileDir : './upload'
}), createAnime);
//Esto es para que solo funcione este metodo en este metodo http

router.put('/animes/:id', fileUpload({
    useTempFiles : true,
    tempFileDir : './upload'
}), editAnime);

router.delete('/animes/:id', deleteAnime);

export default router;