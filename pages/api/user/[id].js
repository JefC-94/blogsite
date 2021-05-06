import db from '../db';

export default (req, res) => {
  const {id} = req.query;
    if(req.method === "GET"){
      db.query(`SELECT id, username FROM users WHERE ID = ${id}`, (err, results, fields) => {
        if(err){
          res.send(err);
          res.end();
        }
        res.status(200).json(results[0]);
      });
    }
  }
  