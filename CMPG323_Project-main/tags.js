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


// Create a new TAG
app.post('/TAGS', (req, res) => {
    const { name, description } = req.body;
    db.query('INSERT INTO TAGS (TAGS.TAG_NAME, TAGS.DESCRIPTION) VALUES (?, ?)', [name, description], (err, result) => {
        if (err) throw err;
        res.json({ message: 'TAG created successfully', id: result.insertId });
    });
});


// Get all tags
app.get('/TAGS', (req, res) => {
    db.query('SELECT * FROM TAGS', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get specific tags
app.get('/TAGS', (req, res) => {
    const {search_id } = req.body;
    db.query('SELECT * FROM TAGS WHERE TAGS.ID = ?',[search_id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Update tag description
app.put('/TAGS', (req, res) => {
    const {search_id, name, description } = req.body;
    db.query('UPDATE TAGS SET TAGS.TAG_NAME = ?, TAGS.DESCRIPTION = ? WHERE TAGS.ID = ?',[name, description, search_id], (err, results) => {
        if (err) throw err;
        res.json({ message: 'TAG updated successfully', id: results.insertId });
    });
});

// Delete tag description
app.put('/TAGS', (req, res) => {
    const {search_id} = req.body;
    db.query('DELETE FROM TAGS WHERE TAGS.ID = ?',[search_id], (err, results) => {
        if (err) throw err;
        res.json({ message: 'TAG updated successfully', id: results.insertId });
    });
});
