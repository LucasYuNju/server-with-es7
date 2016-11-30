import httpServer from "./lib/http/server";

const port = 8000;
httpServer.listen(8000, () => {
    console.log(`Server is listening at port ${port}...`);
});
