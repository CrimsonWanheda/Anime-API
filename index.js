import {connectToDb} from './db.js';
import app from './app.js';
import {PORT} from './config.js';

const main = async ()=>{
  await connectToDb();
  app.listen(3000);
  console.log('Servidor ejercutandose en puerto', PORT || 3000);
}

main();