import config from "config";
import hdb from "hdb";

let connection = null;
function getConnection() {
    if (!connection) {
        connection = hdb.createClient(config.get("db.connection"));
        connection.on("error", (error) => {
            console.error("Network error", error);
        });
    }
    return new Promise((resolve, reject) => {
        if (connection.readyState === "connected") {
            resolve(connection);
        }
        connection.connect((error) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(connection);
            }
        });
    });
}

export async function query(command) {
    const connection = await getConnection();
    return new Promise((resolve, reject) => {
        connection.exec(command, (error, rows) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(rows);
            }
        });
    });
}
