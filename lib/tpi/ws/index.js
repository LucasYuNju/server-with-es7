import server from "../../ws/sever";
import TpiService from "../logic/TpiService";

const tpiNameSpace = server.of("/tpi/rt");
const tpiService = new TpiService();

tpiNameSpace.on("connection", socket => {
    socket.on("disconnect", (res) => {
        
    });
});

setInterval(() => {
    // ws不适合直接传大量的数据，可以通知client服务器发生变化，通过http重新fetch数据，这样可以充分利用http的缓存
    tpiNameSpace.emit("data", );
}, 1000);

export default tpiNameSpace;
