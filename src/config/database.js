import firebird from "node-firebird";

const dbOptions = {
  host: '10.1.1.31',
  port: 3050,
  database: 'C:\\Danieli\\BANCOS\\GIRASSOL4.FDB',
  user: 'SYSMTS',
  password: 'Meta202',
  lowercase_keys: true,
  role: null,
  pageSize: 4096
};

function executeQuery(ssql, params, callback) {

  firebird.attach(dbOptions, function(err, db) {
    if (err) {
     return callback(err, []);
    }

    db.query(ssql, params, function(err, result) {
      db.detach();

      if (err) {
       return callback(err,[]);
     } else {
       return callback(undefined, result);
     }
     });
  });
 }

export { executeQuery };

