import express from "express";
import cacheResponseDirective from "express-cache-response-directive";

const app = express();

app.attach = function(httpServer) {
    httpServer.on("request", app);
}

app.detach = function(httpServer) {
    httpServer.off("request", app);
}

if (app.get("env") === "development") {
    app.use(express.static("public"));
}
app.use(cacheResponseDirective());
app.use("/api", require("./http/api").default);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status);
    res.send(`HTTP-${status}`);
});

export default app;
