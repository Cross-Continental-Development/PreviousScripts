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

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Log a message indicating the server is running
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


// Get all ROLES
app.get('/ROLES', (req, res) => {
    db.query('SELECT * FROM ROLES', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Create a new ROLE
app.post('/ROLES', (req, res) => {
    const { name, description } = req.body;
    db.query('INSERT INTO ROLES (ROLES.ROLE_NAME, ROLES.DESCRIPTION) VALUES (?, ?)', [name, description], (err, result) => {
        if (err) throw err;
        res.json({ message: 'ROLE created successfully', id: result.insertId });
    });
});


// Get specific ROLES
app.get('/ROLES/:id', (req, res) => {
    const {search_id } = req.body;
    db.query('SELECT * FROM ROLES WHERE ROLES.ID = ?',[search_id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Update ROLE description
app.put('/ROLES/:id', (req, res) => {
    const {search_id, name, description } = req.body;
    db.query('UPDATE ROLES SET ROLES.ROLE_NAME = ?, ROLES.DESCRIPTION = ? WHERE ROLES.ID = ?',[name, description, search_id], (err, results) => {
        if (err) throw err;
        res.json({ message: 'ROLE updated successfully', id: results.insertId });
    });
});

// Delete ROLE description
app.delete('/ROLES/:id', (req, res) => {
    const {search_id} = req.body;
    db.query('DELETE FROM ROLES WHERE ROLES.ID = ?',[search_id], (err, results) => {
        if (err) throw err;
        res.json({ message: 'ROLE updated successfully', id: results.insertId });
    });
});

