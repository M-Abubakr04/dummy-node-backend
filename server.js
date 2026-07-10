const http = require("http");
const os = require("os");

const port = Number(
  process.env.SERVER_PORT ||
  process.env.PORT ||
  5000
);

const environment = process.env.SERVER_ENV || "unknown";

const server = http.createServer((request, response) => {
  if (request.url === "/health") {
    response.writeHead(200, {
      "Content-Type": "application/json"
    });

    response.end(
      JSON.stringify({
        status: "healthy",
        environment: environment,
        hostname: os.hostname(),
        timestamp: new Date().toISOString()
      })
    );

    return;
  }

  response.writeHead(200, {
    "Content-Type": "application/json"
  });

  response.end(
    JSON.stringify({
      message: "Dummy Node backend version 2 deployed successfully",
      version: "2.0.0",
      environment: environment,
      hostname: os.hostname()
    })
  );
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Dummy Node backend started on port ${port}`);
  console.log(`Environment: ${environment}`);
});
