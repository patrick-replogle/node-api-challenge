const server = require("./server.js");

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 4000;

server.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
