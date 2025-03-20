const express = require('express');
const app = express();
const path = require('path');
const apiRoutes = require('./routes/api')

app.use(express.urlencoded({ extended: true }));

app.use("/",express.static(path.join(__dirname, "public")));

app.use("/api", apiRoutes);

app.listen(3000, () =>{
    console.log("Servidor ouvindo na porta 3000");
})