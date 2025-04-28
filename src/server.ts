import express from "express"
import cors from "cors"
import "dotenv/config"
import { corsOptions } from "./config/corsOptions"

function bootstrap() {
    const app = express()
    const port = Number(process.env.PORT)

    app.use(cors(corsOptions))

    app.listen(port, () => console.log("Server running on: " + port))
}