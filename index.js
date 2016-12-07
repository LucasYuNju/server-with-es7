import config from "config";
import express from "express";

import httpServer from "./lib/http/server";
import app from "./lib/app";


(function main() {
    checkEnvironment();
    startHttpServer();
})();


function checkEnvironment() {
    const env = app.get("env");
    if (env !== "development" && env !== "production") {
        throw new Error(`Unsupported NODE_ENV [${env}]`);
    }
    console.log(`Server running in [${env}] mode`);
}

function startHttpServer() {
    console.log('instance no', process.env.NODE_APP_INSTANCE);
    console.log('config.port', config.get("http.port"));
    // const port = parseInt(config.get("http.port"));
    const port = config.get("http.port");
    if (isNaN(port)) {
        throw new Error(`"http.port" must be specified as a number in config`);
    }

    app.attach(httpServer);
    // Equivalent to httpServer.on("request", app);
    httpServer.listen(port, () => {
        console.log(`Server is listening at port ${port}...`);
    });    
}
