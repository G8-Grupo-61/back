//AL instalar babel se puede usar import en vez del const y el require
import express from 'express';//Requerir express
import morgan from 'morgan';//Requerir Morgan
import cors from 'cors';
// Para acceder al directorio actual
import path from 'path';


const app = express();

//CONEXION BBDD
const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/base_prueba1';
const options = {useNewUrlParser: true, useUnifiedTopology: true};

// // using promises
mongoose.connect(uri, options).then(
    /** ready to use. The `mongoose.connect()` promise resolves to
   mongoose instance. */
    () => { 
        console.log('Conectado a DB') 
        },
    /** handle initial connection error */
    err => { 
        err => { console.log(err) }
        }
   );
   
   
//MIDDLEWARE
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
//application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));


//RUTAS

app.use('/api', require('./routes/nota'));
app.use('/api', require('./routes/products'));


// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

//PUERTO

//Configuración del puerto estaticamente
// app.listen(3000, function () {
//     console.log('Servidor escuchando en puerto 3000');
//    });

//Configuración del puerto dinámico
app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), function () {
console.log('Example app listening on port'+ app.get('puerto'));
});