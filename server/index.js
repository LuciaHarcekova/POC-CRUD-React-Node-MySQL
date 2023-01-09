const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'blog',
});

// Create user
app.post("/create", (req, res) => {

    const firstName = req.body.firstName;
    const surname = req.body.surname;
    const password = req.body.password;
    const email = req.body.email;

    db.query('INSERT INTO user (first_name, surname, password, email) VALUES (?, ?, ?, ?)',
        [firstName, surname, password, email],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted!");
            }
        }
    );
});

// Get users
app.get("/users", (req, res) => {
    db.query('SELECT * FROM user',
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});

// Update user
app.put("/update", (req, res) => {
    const id = req.body.id;
    const password = req.body.password;
    db.query("UPDATE user SET password = ? WHERE id = ?", [
        password, id
    ], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// Delete user
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM user WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(3000, () => {
    console.log("Yeeeey, your server is listening on 3000!");
});