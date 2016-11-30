import express from "express";

const app = express();
app.use(express.static("public"));

app.attach = function(httpServer) {
    httpServer.on("request", app);
}

app.detach = function(httpServer) {
    httpServer.off("request", app);
}

export default app;
