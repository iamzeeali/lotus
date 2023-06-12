const express = require('express');
const oracledb = require('oracledb');
const app = express();
const port = 5000;
const cors = require('cors');

// set up middleware
app.use(cors());
app.use(
  cors({
    origin: ['http://10.100.76.215:3000'], // Give server IP
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

let clientOpts = {};
clientOpts = { libDir: 'C:instantclient_21_10' };
// initialize Oracle client
oracledb.initOracleClient(clientOpts);

// Connection details
const dbConfig = {
  user: 'HMI',
  password: 'hmi',
  connectString: '10.100.76.101:1521/BFL2',
};

// Function to establish a connection to the database
async function connectToDatabase() {
  try {
    // Establish a connection to the database
    const connection = await oracledb.getConnection(dbConfig);

    console.log('Connected to Oracle database');

    // Release the connection
    await connection.close();
  } catch (err) {
    console.error('Error connecting to Oracle:', err);
  }
}

// Call the function to connect to the database
connectToDatabase();

// Function to fetch data from the table
async function fetchDataFromTable(req, res) {
  let connection;

  try {
    // Establish a connection to the database
    connection = await oracledb.getConnection(dbConfig);

    const chunk = req.params.chunk;
    const limit = 1;
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
      FROM T_REALTIME_ANALYSIS
      ORDER BY TIME_LOG ASC
      OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`;

    // Fetch data using the SQL query
    const result = await connection.execute(sql);

    // Process the result
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
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    // Release the connection
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

// Set up a route to fetch data from the Oracle database
app.get('/report/:chunk', fetchDataFromTable);

// Start the Express server
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
