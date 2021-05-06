import db from '../db';

export default (req, res) => {
  const {id} = req.query;
    if(req.method === "GET"){
      db.query(`SELECT * FROM users WHERE ID = ${id}`, (err, results, fields) => {
        if(err){
          res.send(err);
          res.end();
        }
        res.status(200).json(results[0]);
      });
    }
    if(req.method === "PUT"){
      db.query(`UPDATE users SET username = '${req.body.username}', password = '${req.body.password}' WHERE id = ${id}`, (err, results, fields) => {
        if(err){
          res.send(err);
          res.end();
        }
        res.status(200).json('User updated');
      })
    }
    if(req.method === "DELETE"){
      db.query(`DELETE FROM users WHERE id = ${id}`, (err, results, fields) => {
        if(err){
          res.send(err);
          res.end();
        }
        res.status(200).json('User deleted');
      })
    }
  }
  