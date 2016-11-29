const connection = require('./database/db_connection');


const home = {
  method: 'GET',
  path: '/',
  handler(req, reply) {
    var query = 'SELECT * FROM users'
    var users;
    connection.query(query, (err, result) => {
      users = result.rows;
      console.log(users);
      reply.view('users', { users });
    });
  },
};

const addUser = {
  method: 'get',
  path: '/add_user',
  handler(req, reply) {

    var params = req.query;
    console.log(params, "THESE ARE THE PARAMS");

    if(params.update === 'New' ) {
      var querystr = `INSERT INTO users (firstname, surname, type, age) VALUES (
          $1, $2, $3, $4);`
    }
    else {
      var update = params.update.split(' ');
      var updateFirst = update[0];
      var updateSecond = update[1];

      var querystr = `
      UPDATE users
      SET firstname= $1, surname= $2, type= $3, age=$4
      WHERE firstname = '${updateFirst}'
      AND surname = '${updateSecond}';`
    }

    connection.query(querystr, [params.firstname, params.surname, params.type, params.age], (err, result) => {
      console.log('user added', result);

      var query = 'SELECT * FROM users'
      var users;
      connection.query(query, (err, result) => {
        users = result.rows;
        console.log(users);
        reply.view('users', { users });
      });
    });
  },
};

const deleteUser = {
  method: 'GET',
  path: '/delete_user',
  handler(req, reply) {


    var params = req.query


    var update = params.update.split(' ');
    var updateFirst = update[0];
    var updateSecond = update[1];

    var query = `DELETE FROM users
                 WHERE firstname = '${updateFirst}'
                 AND surname = '${updateSecond}';`

    if(params.delete === "DELETE") {
      console.log("into delete");
      connection.query(query, (err, result) => {
        var query = 'SELECT * FROM users'
        var users;
        connection.query(query, (err, result) => {
          users = result.rows;
          reply.view('users', { users });
        });
      });
    } else {
      var query = 'SELECT * FROM users'
      var users;
      connection.query(query, (err, result) => {
        users = result.rows;
        console.log(users);
        reply.view('users', { users });
      });
    }
  },
};




module.exports = [
  home,
  addUser,
  deleteUser
];
