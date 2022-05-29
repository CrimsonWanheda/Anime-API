import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './routes/index.routes.js';
import animesRoutes from './routes/animes.routes.js';

const app = express();

app.use(morgan('dev'));

//CORS
app.use(cors());
app.use(express.json());
//app.use(fileUpload({
//    useTempFiles : true,
//    tempFileDir : './uploads'
//}));
//Si se deja esto, significa que se puede utilizar para todas las rutas

//Routes
app.use(indexRoutes);
app.use('/api',animesRoutes);

export default app;