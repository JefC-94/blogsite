const mysql2 = require('mysql2');

const devConfig = {
    host: 'ID348579_testapp.db.webhosting.be',
    user: 'ID348579_testapp',
    password: 'test1234',
    database: 'ID348579_testapp',
    port: 3306,
}

const conn = mysql2.createConnection(devConfig)

/* conn.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Database connected!");
    }
});
 */

module.exports = conn;