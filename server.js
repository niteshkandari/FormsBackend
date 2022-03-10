require("dotenv").config();
const http = require("http");
const app = require("./app");
const cors = require("cors");

app.user(cors({origin:"*"}))

const port = process.env.PORT ;

const server = http.createServer(app);

server.listen(port, () => console.log(`server is listening on port => ${port}`));
