//configuacion global

//=====Puerto================================
process.env.PORT = process.env.PORT || 3000;

// =========ENTORNO ================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/muelitas';
} else {
    //urlDB = process.env.MONGO_URL;
    //coneccion a bbdd en producción
    urlDB = "mongodb+srv://myuser:isowdc420@cluster0.r5z78.mongodb.net/muelitas";
}

process.env.URLDB = urlDB;