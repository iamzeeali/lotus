const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
// set up middleware
app.use(cors());
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

// start the Express server
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
