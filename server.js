// server.js
// Entry point del servicio ACQUIRE
"use strict";
require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose=require("mongoose");
const acquireRoutes = require("./routes/acquireRoutes");
const {fetchKunna}=require("./services/kunnaService")
const Acquire=require("./models/acquire.js")
console.log("Prediccion importado:", Acquire);
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

//----------------
//Conexion a Mongo
//----------------


mongoose.connect('mongodb://localhost:27017/acquire')
.then(()=>{
  console.log('Conexión a base de datos establecida');
}).catch(err=>{
  console.error('Error al conectarse a base de datos:',err);
});


// Rutas del servicio ACQUIRE
app.use("/", acquireRoutes);


// Arranque del servidor 
app.listen(PORT, async () => {
  const serverUrl = `http://localhost:${PORT}`;
  console.log(`[ACQUIRE] Servicio escuchando en ${serverUrl}`);
});
