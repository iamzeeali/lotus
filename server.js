const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 5000;
const cors = require("cors");
app.use(cors());

const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
// set up middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// create a MySQL connection pool
const connection = mysql.createConnection({
  connectionLimit: 10,
  host: "103.145.50.213",
  user: "dps_dbuser",
  password: "dps@SBC@23dps",
  database: "db_dsp",
});
// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  const query = `SELECT * FROM tb_users WHERE username = '${username}'`;

  console.log(query);

  connection.query(query, [username], (err, rows) => {
    console.log(rows.length);
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // // if (rows.length === 0) {
    // //   res.status(401).json({ error: "Invalid email or password" });
    // //   return;
    // }

    const user = rows[0];

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      if (!result) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }

      res.json({ message: "Login successful" });
    });
  });
});

// set up a route to fetch data from the MySQL database
app.get("/report/:chunk", (req, res) => {
  const chunk = req.params.chunk;
  const limit = 10;
  const offset = (chunk - 1) * limit;

  const query = `SELECT * FROM tb_chart LIMIT ${limit} OFFSET ${offset}`;

  connection.query(query, (err, rows) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    res.json({ data: rows });
  });
});

// app.get("/report", (req, res) => {
//   connection.query("SELECT * FROM tb_chart LIMIT 10", (error, results, fields) => {
//     if (error) {
//       console.error(error);
//       res.status(500).send("Error fetching users from database");
//       return;
//     }

//     res.send(results);
//     // console.log(res);
//   });
// });

// start the Express server
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
