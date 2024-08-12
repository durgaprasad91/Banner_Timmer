const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'Durgaprasad',
  password: 'Durgaprasad@1',
  database: 'bannerDB',
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database.');
});

app.get('/api/banner', (req, res) => {
  const query = 'SELECT * FROM banners WHERE id = 1';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching banner:', err);
      res.status(500).json({ message: 'Error fetching banner' });
    } else if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ message: 'Banner not found' });
    }
  });
});

app.post('/api/banner', (req, res) => {
  const { description, timer, link } = req.body;
  const query = `UPDATE banners SET description = ?, timer = ?, link = ? WHERE id = 1`;

  db.query(query, [description, timer, link], (err, result) => {
    if (err) {
      console.error('Error updating banner:', err);
      res.status(500).json({ message: 'Error updating banner' });
    } else {
      res.json({ message: 'Banner updated successfully' });
    }
  });
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
