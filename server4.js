const express = require("express");
const oracledb = require("oracledb");
const app = express();
const port = 5000;
const cors = require("cors");
const bodyParser = require("body-parser");

// set up middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// create a connection pool
oracledb
  .createPool({
    user: "SYSTEM",
    password: "gjh649NJnewr92",
    connectString: "103.235.106.202:1521/XE",
    poolMin: 2,
    poolMax: 10,
    poolIncrement: 0,
  })
  .then(() => {
    console.log("Connected to Oracle database");
  })
  .catch((err) => {
    console.error("Error connecting to Oracle:", err);
  });

// set up a route to fetch data from the Oracle database
app.get("/report/:chunk", async (req, res) => {
  const chunk = req.params.chunk;
  const limit = 10;
  const offset = (chunk - 1) * limit;

  const sql = `
  SELECT
    TO_CHAR(TIME_LOG, 'DD-MM-YYYY HH24:MI') AS TIME_LOG,
    PRED_SI_PER,
    HOT_BLAST_FLOW,
    HOT_BLAST_TEMP,
    O2_ENRICHMENT,
    STEAM_TPH,
    PCI,
    RAFT,
    CO,
    CO2,
    H2,
    TOP_GAS_PR,
    HOT_BLAST_PRE,
    ETACO,
    TO_CHAR(SIMULATE_TIME, 'DD-MM-YYYY HH24:MI:SS') AS SIMULATE_TIME,
    STATUS
  FROM SYSTEM.T_REALTIME_ANALYSIS
  OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`;

  let connection;

  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(sql);
    const columns = result.metaData.map((column) => column.name);
    const rows = result.rows.map((row) => {
      const formattedRow = {};
      for (let i = 0; i < columns.length; i++) {
        formattedRow[columns[i]] = row[i];
      }
      return formattedRow;
    });

    res.json({ data: rows });
  } catch (err) {
    console.error("Error executing Oracle query:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing Oracle connection:", err);
      }
    }
  }
});

// start the Express server
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
