import db from './db';

export default (req, res) => {
    if(req.method === "POST"){
    db.query(`INSERT INTO users(username, password) VALUES ('${req.body.username}', '${req.body.password}')`, (err, results, fields) => {
        if(err){
            res.status(500).json({error: err});
        } else {
            res.status(200).json({id: results.insertId});
        }
        
    });
    }
}
