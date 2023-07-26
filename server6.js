const express = require('express');
const oracledb = require('oracledb');
const app = express();
const port = 5000;
const cors = require('cors');

// set up middleware
app.use(cors());
app.use(
  cors({
    origin: [
      'http://10.100.76.215:3000',
      'http://10.100.76.216:3000',
      'http://10.100.76.215:5000',
      'http://10.100.76.246:3000',
    ], // Give server IP
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
  // user: 'HMI',
  // password: 'hmi',
  // connectString: '10.100.76.101:1521/BFL2',
  user: 'SYSTEM',
  password: 'gjh649NJnewr92',
  connectString: '103.235.106.202:1521/XE',
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
async function fetchDataForAll(req, res) {
  let connection;

  try {
    // Establish a connection to the database
    connection = await oracledb.getConnection(dbConfig);

    const sql = `
    SELECT *
    FROM (
      SELECT t.*, ROWNUM AS rnum, TO_CHAR(t.TIME_LOG, 'HH24:MI') AS FORMATTED_TIME_LOG
      FROM (
        SELECT *
        FROM (
          SELECT *
          FROM T_REALTIME_ANALYSIS
          ORDER BY TIME_LOG DESC -- Ordering by TIME_LOG in descending order
        )
        WHERE ROWNUM <= 30
        ORDER BY TIME_LOG ASC -- Ordering by TIME_LOG in ascending order
      ) t
    )
    ORDER BY rnum ASC -- Ordering by rnum in descending order`;

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
    res.json({ error: 'Internal Server Error' });
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

async function fetchDataForAllSecond(req, res) {
  let connection;

  try {
    // Establish a connection to the database
    connection = await oracledb.getConnection(dbConfig);

    const rowNo = req.params.rowNo;

    const sql = `SELECT *
    FROM (
      SELECT t.*, ROWNUM AS rnum, TO_CHAR(t.TIME_LOG, 'HH24:MI') AS FORMATTED_TIME_LOG
      FROM (
        SELECT *
        FROM T_REALTIME_ANALYSIS
        ORDER BY TIME_LOG DESC
      ) t
    )
    WHERE rnum <= 1`;

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

async function fetchDataForBar(req, res) {
  let connection;

  try {
    // Establish a connection to the database
    connection = await oracledb.getConnection(dbConfig);

    // const row = req.params.row;
    // const sqlq = `SELECT *
    // FROM (
    //   SELECT t.*, ROWNUM AS rnum, TO_CHAR(t.BATCH_TIME, 'HH24:MI') AS FORMATTED_BATCH_TIME
    //   FROM (
    //     SELECT *
    //     FROM (
    //       SELECT *
    //       FROM T_HMI_VALIDATION_DATA
    //       ORDER BY BATCH_TIME DESC
    //     )
    //     WHERE ROWNUM <= 10
    //     ORDER BY BATCH_TIME ASC
    //   ) t
    // )
    // ORDER BY rnum ASC -- Ordering by rnum in descending order`;

    const sqlq = `SELECT *
      FROM (
          SELECT *
          FROM (
              SELECT *
              FROM T_HMI_VALIDATION_DATA
              WHERE HM_SAMPLE_ID LIKE '21%'
              ORDER BY BATCH_TIME DESC
          )
          WHERE ROWNUM <= 10
          ORDER BY BATCH_TIME ASC
      )`;

    const result = await connection.execute(sqlq);

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
    res.json({ error: 'Internal Server Error' });
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
// ==================================================================
async function fetchDataForBarSecond(req, res) {
  let connection;

  try {
    // Establish a connection to the database
    connection = await oracledb.getConnection(dbConfig);

    const rowNo = req.params.rowNo;
    // const sql = `
    // SELECT *
    // FROM T_HMI_VALIDATION_DATA
    // WHERE ROWNUM <= 10`;

    // const sql = `SELECT *
    // FROM (
    //   SELECT t.*, ROWNUM AS rnum, TO_CHAR(t.BATCH_TIME, 'HH24:MI') AS FORMATTED_BATCH_TIME
    //   FROM (
    //     SELECT *
    //     FROM T_HMI_VALIDATION_DATA
    //     ORDER BY BATCH_TIME DESC
    //   ) t
    // )
    // WHERE rnum <= 1`;

    const sql = `SELECT *
    FROM (
      SELECT t.*, ROWNUM AS rnum, TO_CHAR(t.BATCH_TIME, 'HH24:MI') AS FORMATTED_BATCH_TIME
      FROM (
        SELECT *
        FROM T_HMI_VALIDATION_DATA
        WHERE HM_SAMPLE_ID LIKE '21%'
        ORDER BY BATCH_TIME DESC
      ) t
    )
    WHERE rnum <= 1`;

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

// =====================================================================================
async function fetchDataForBarHistorical(req, res) {
  let connection;

  try {
    // Establish a connection to the database
    connection = await oracledb.getConnection(dbConfig);

    const date = req.params.date;
    const sqlq = `SELECT *
    FROM (
      SELECT t.*, ROWNUM AS rnum, TO_CHAR(t.BATCH_TIME, 'HH24:MI') AS FORMATTED_BATCH_TIME
      FROM (
        SELECT *
        FROM (
          SELECT *
          FROM T_HMI_VALIDATION_DATA
          WHERE BATCH_TIME >=(TO_DATE('${date}'||' '||TO_CHAR(SYSDATE, 'HH24:MI:SS'), 'YYYY-MM-DD HH24:MI:SS')-3)
          AND BATCH_TIME<(TO_DATE('${date}'||' '||TO_CHAR(SYSDATE, 'HH24:MI:SS'), 'YYYY-MM-DD HH24:MI:SS')) 
          ORDER BY BATCH_TIME DESC -- Ordering by TIME_LOG in descending order
        )
        WHERE ROWNUM <= 20
        ORDER BY BATCH_TIME ASC -- Ordering by TIME_LOG in ascending order
      ) t
    )
    ORDER BY rnum ASC -- Ordering by rnum in descending order`;

    const result = await connection.execute(sqlq);

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
app.get('/report', fetchDataForAll);
app.get('/reportSecond', fetchDataForAllSecond);
app.get('/bar', fetchDataForBar);
app.get('/barSecond', fetchDataForBarSecond);
app.get('/barHistorical/:date', fetchDataForBarHistorical);

// Start the Express server
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
