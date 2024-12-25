const express = require("express")
const cors = require("cors")
const path = require("path")
const router = require("./routes")
const connexion = require("./db/db")
const app = express()
const port = 8080

app
    .use(cors())
    .use(express.json())
    .use(router)
    .use('/uploads', express.static(path.join(__dirname, "src/uploads")))

app.get("/", (req, res) => {
    res.send("Hello API")
})

connexion()

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})