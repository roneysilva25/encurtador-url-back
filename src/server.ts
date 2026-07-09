import express from "express"
import "express-async-errors"
import "./cron/scheduler"
import cors from "cors"
import "dotenv/config"
import { corsOptions } from "./config/corsOptions"
import { routes } from "./routes"
import { errorHandler } from "./middlewares/errorHandler"
import bodyParser from "body-parser"
import { rateLimiter } from "@roneysilva25/rate-limiter"
import { registerShutdownHandlers } from "./shutdown"
import { Server } from "http"

let server: Server;

registerShutdownHandlers();

function bootstrap() {
    const app = express()
    const port = Number(process.env.PORT)
    const rateLimit = rateLimiter({});

    app.use(cors(corsOptions))

    app.use(rateLimit.limit);

    app.use(bodyParser.json({ "limit": "1mb" }))

    app.use(routes)

    app.use(errorHandler)

    server = app.listen(port, () => console.log("Server running on: " + port));
}

try {
    bootstrap();
} catch (error) {
    console.error("Erro ao inicializar a aplicação.", { error });
    process.exit(1);
}
