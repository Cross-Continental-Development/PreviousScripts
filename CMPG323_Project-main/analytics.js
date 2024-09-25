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


// Create a new analytic
app.post('/ANALYTICS', (req, res) => {
    const { metric, created_date } = req.body;
    db.query('INSERT INTO ANALYTICS (ANALYTICS.METRIC, ANALYTICS.CREATED_DATE) VALUES (?, ?)', [metric, created_date], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Analytics created successfully', id: result.insertId });
    });
});


// Get all ANALYTICS
app.get('/ANALYTICS', (req, res) => {
    db.query('SELECT * FROM ANALYTICS', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get specific ANALYTICS
app.get('/ANALYTICS', (req, res) => {
    const {search_id } = req.body;
    db.query('SELECT * FROM ANALYTICS WHERE ANALYTICS.ID = ?',[search_id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Update analytic description
app.put('/ANALYTICS', (req, res) => {
    const {search_id, metric, created_date } = req.body;
    db.query('UPDATE ANALYTICS SET ANALYTICS.METRIC = ?, ANALYTICS.CREATED_DATE = ? WHERE ANALYTICS.ID = ?',[metric, created_date, search_id], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Analytics updated successfully', id: results.insertId });
    });
});

// Delete analytic description
app.put('/ANALYTICS', (req, res) => {
    const {search_id} = req.body;
    db.query('DELETE FROM ANALYTICS WHERE ANALYTICS.ID = ?',[search_id], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Analytics updated successfully', id: results.insertId });
    });
});
