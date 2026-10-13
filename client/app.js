// Production entry point for the cPanel Node.js application selector.
const { createServer } = require("node:http");
const next = require("next");

const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((request, response) => {
    Promise.resolve(handle(request, response)).catch((error) => {
      console.error("Portfolio request failed:", error);
      if (!response.headersSent) response.statusCode = 500;
      response.end();
    });
  });
  server.on("error", (error) => {
    console.error("Portfolio server failed:", error);
    process.exit(1);
  });
  server.listen(process.env.PORT || 3000);
}).catch((error) => {
  console.error("Portfolio startup failed. Install dependencies and run npm run build first:", error);
  process.exit(1);
});
