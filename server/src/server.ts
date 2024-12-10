import express from "express";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerSpect from "./config/swagger";
import router from "./router";
import db from "./config/db";

// Conectar a la base de datos
export async function ConnectionDB() {
    try {
        await db.authenticate();
        db.sync();
        console.log(colors.bgMagenta("Conexión exitosa a la Base de Datos"));
    } catch (error) {
        console.log(colors.bgRed.white("Hubo un error al conectar a la Base de Datos"));
    }
}

ConnectionDB();

// Instancia de express
const server = express();

// Configuración de CORS
const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        // Si origin es undefined (ej. solicitudes de la misma máquina), permite
        if (!origin || origin === process.env.FRONTEND_URL) {
            callback(null, true);
        } else {
            console.log(`Bloqueo de CORS para el origen: ${origin}`);
            callback(new Error("Error de CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"] // Encabezados permitidos
};

server.use(cors(corsOptions)); 

// Leer datos de formularios
server.use(express.json());

// Logger HTTP
server.use(morgan("combined"));

// Rutas principales
server.use("/api/products", router);

server.get("/api", (req, res) => {
    res.json({ msg: "Desde API" });
});

// Documentación con Swagger
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpect));

export default server;