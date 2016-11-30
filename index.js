import httpServer from "./lib/http/server";
import app from "./lib/app";

app.attach(httpServer);
// equivalent httpServer.on("request", app);

const port = 8000;
httpServer.listen(8000, () => {
    console.log(`Server is listening at port ${port}...`);
});
