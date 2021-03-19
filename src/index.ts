//import express from 'express';
import cors from "cors";
import express from 'express';
import { createConnection } from "typeorm";

import generalesRoute from "./routes/generalesRoute";
import facturasRoute from "./routes/facturasRoute";
//import config from "./config.json";

import config from "./config.json";

const connection = createConnection({
    type: config.type,
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    sid: config.sid,
    //entities: ["./dist/entities/**/*.js"],
    entities: [`${config.entities}`],
    synchronize: false,
    logging: ["info", "error"]/*,
    logger: new TypeOrmLogger()*/
});


const app = express();
app.use(cors());
app.use(express.json());
app.use(generalesRoute);
app.use(facturasRoute);



//app.listen(config.puertoAPI);
app.listen(3100);
console.log(`Servidor iniciado puerto 3100`);


console.log("Iniciado");

