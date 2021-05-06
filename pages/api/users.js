// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from './db';

export default (req, res) => {
  db.query('SELECT * FROM users', (err, results, fields) => {
    if(err){
      res.send(err);
      res.end();
    }
    res.status(200).json(results);
  });
  //res.status(200).json({ name: 'John Doe' })
}
