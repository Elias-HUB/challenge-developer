const express = require("express");
const morgan = require("morgan");
const path = require("path");
var cors = require("cors");
const app = express();

const a = require("./database");

// Setting

//Toma el puerto por defecto
app.set("port", process.env.PORT || 3000);

//Middlewares (Seccion que se ejecuta antes de las rutas)
app.use(morgan("dev")); //Para que muestre las solicitudes por consola
app.use(express.json()); //Valida que los formatos sean json
app.use(cors());
// Routes
app.use("/api/tasks", require("./routes/task.routes"));

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// Starting the server

//escuchar puerto 3000
//Para acento es alt+96 `
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
