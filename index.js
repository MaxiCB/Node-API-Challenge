require("dotenv").config()

const server = require("./server")

const port = process.env.PORT || 1337

server.listen(port, () => {
    console.log(`\n *Server running at http://localhost:${port}`)
})

server.get("/", (_req, res) => {
    const MOTD = process.env.MOTD || 'Hello World!'
    res.status(200).json({motd: MOTD})
})