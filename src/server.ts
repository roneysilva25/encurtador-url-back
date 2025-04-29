import express from "express"
import "express-async-errors"
import cors from "cors"
import "dotenv/config"
import { corsOptions } from "./config/corsOptions"
import { routes } from "./routes"
import { errorHandler } from "./middlewares/errorHandler"
import bodyParser from "body-parser"

function bootstrap() {
    const app = express()
    const port = Number(process.env.PORT)

    app.use(cors(corsOptions))

    app.use(bodyParser.json({ "limit": "1mb" }))

    app.use(routes)

    app.use(errorHandler)

    app.listen(port, () => console.log("Server running on: " + port))
}

bootstrap();