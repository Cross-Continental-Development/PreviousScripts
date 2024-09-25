const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3306;

app.use(express.json());

const db = mysql.createConnection({
    host: '102.222.124.17',
    user: 'xcondea8o1p9_admin',
    password: 'adminshare2teach',
    database: 'xcondea8o1p9_SHARE2TEACH',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.listen(PORT, () => {
    console.log(`Server is running on https://102.222.124.17:${PORT}`);
});


// Create a new RATINGS
app.post('/RATINGS', (req, res) => {
    const { user, rating, description } = req.body;
    db.query('INSERT INTO RATINGS (RATINGS.USER_ID, RATINGS.RATING, RATINGS.DESCRIPTION) VALUES (?, ?,?)', [user, rating, description ], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Rating created successfully', id: result.insertId });
    });
});


// Get all RATINGS
app.get('/RATINGS', (req, res) => {
    db.query('SELECT * FROM RATINGS', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get specific RATINGS
app.get('/RATINGS', (req, res) => {
    const {search_id } = req.body;
    db.query('SELECT * FROM RATINGS WHERE RATINGS.ID = ?',[search_id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Update RATINGS description
app.put('/RATINGS', (req, res) => {
    const {user, rating, description} = req.body;
    db.query('UPDATE RATINGS SET RATINGS.USER_ID = ?, RATINGS.RATING = ? , RATINGS.DESCRIPTION = ? WHERE RATINGS.ID = ?',[user, rating, description], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Rating updated successfully', id: results.insertId });
    });
});

// Delete RATINGS description
app.put('/RATINGS', (req, res) => {
    const {search_id} = req.body;
    db.query('DELETE FROM RATINGS WHERE RATINGS.ID = ?',[search_id], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Rating updated successfully', id: results.insertId });
    });
});
