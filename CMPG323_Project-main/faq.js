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


// Create a new faq
app.post('/FAQ', (req, res) => {
    const { question, answer} = req.body;
    db.query('INSERT INTO FAQ (FAQ.QUESTION, FAQ.ANSWER) VALUES (?, ?)', [question, answer], (err, result) => {
        if (err) throw err;
        res.json({ message: 'FAQ created successfully', id: result.insertId });
    });
});


// Get all FAQ
app.get('/FAQ', (req, res) => {
    db.query('SELECT * FROM FAQ', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get specific FAQ
app.get('/FAQ', (req, res) => {
    const {question } = req.body;
    db.query('SELECT * FROM FAQ WHERE FAQ.ID LIKE ?',[question], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Update faq description
app.put('/FAQ', (req, res) => {
    const {question, answer} = req.body;
    db.query('UPDATE FAQ SET FAQ.QUESTION = ?, FAQ.ANSWER = ? WHERE FAQ.ID = ?',[question, answer], (err, results) => {
        if (err) throw err;
        res.json({ message: 'FAQ updated successfully', id: results.insertId });
    });
});

// Delete faq description
app.put('/FAQ', (req, res) => {
    const {search_id} = req.body;
    db.query('DELETE FROM FAQ WHERE FAQ.ID = ?',[search_id], (err, results) => {
        if (err) throw err;
        res.json({ message: 'FAQ updated successfully', id: results.insertId });
    });
});
