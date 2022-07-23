import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './routes/index.routes.js';
import animesRoutes from './routes/animes.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { create } from 'express-handlebars';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(morgan('dev'));

//CORS
app.use(cors());
app.use(express.json());

//Settings
app.set('views', path.join(__dirname, 'views'));
app.engine(
    '.hbs', 
    create({
        defaultLayout: 'main',
        layoutsDir: path.join(app.get('views'), 'layouts'),
        partialsDir: path.join(app.get('views'), 'partials'),
        extname: '.hbs'
    }).engine
);
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, 'public')));

//app.use(fileUpload({
//    useTempFiles : true,
//    tempFileDir : './uploads'
//}));
//Si se deja esto, significa que se puede utilizar para todas las rutas

//Routes
app.use(indexRoutes);
app.use('/api',animesRoutes);

//Page error 404
app.use(function(req, res) {
    res.status(400);
    res.render("404")
});

app.use(function(error, req, res, next) {
    res.status(500);
    res.send(`Server ${error}`);
});

export default app;