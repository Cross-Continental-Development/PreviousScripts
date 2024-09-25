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


// Create a new grade
app.post('/GRADE', (req, res) => {
    const { num, description } = req.body;
    db.query('INSERT INTO GRADE (GRADE.GRADE_NUM, GRADE.DESCRIPTION) VALUES (?, ?)', [num, description], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Grade created successfully', id: result.insertId });
    });
});


// Get all GRADE
app.get('/GRADE', (req, res) => {
    db.query('SELECT * FROM GRADE', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get specific GRADE
app.get('/GRADE', (req, res) => {
    const {search_id } = req.body;
    db.query('SELECT * FROM GRADE WHERE GRADE.ID = ?',[search_id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Update grade description
app.put('/GRADE', (req, res) => {
    const {search_id, num, description } = req.body;
    db.query('UPDATE GRADE SET GRADE.GRADE_NUM = ?, GRADE.DESCRIPTION = ? WHERE GRADE.ID = ?',[num, description, search_id], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Grade updated successfully', id: results.insertId });
    });
});

// Delete grade description
app.put('/GRADE', (req, res) => {
    const {search_id} = req.body;
    db.query('DELETE FROM GRADE WHERE GRADE.ID = ?',[search_id], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Grade updated successfully', id: results.insertId });
    });
});
