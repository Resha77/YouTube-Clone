const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'youtube-clone'
});

db.connect((err) => {
  if (err) console.error('Database connection error:', err);
  else console.log('Connected to MySQL');
});

app.get('/api/videos', (req, res) => {
  const sql = 'SELECT * FROM videopreview';
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));