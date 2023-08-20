const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

//get info form
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

//atur engine express
app.set("view engine", "ejs");
app.set("views", "views");

//membuat koneksi ke mysql
const db = mysql.createConnection({
   host: "localhost", //atur host kalian
   database: "school", //atur nama db kalian
   user: "root", // atur user kalian
   password: "root", // atur pw kalian
});

//menghubungkan ke database
db.connect((err) => {
   if (err) throw err;
   console.log("db connected...");

   app.get("/", (req, res) => {
      const sql = "SELECT * FROM data_siswa";
      db.query(sql, (err, result) => {
         const siswa = JSON.parse(JSON.stringify(result));
         console.log("hasil database", siswa);
         res.render("index", { siswa: siswa, title: "Daftar Siswa" });
      });
   });

   // untuk menambah db
   app.post("/tambah", (req, res) => {
      const add = req.body;
      const insertSql = `INSERT INTO data_siswa (nama, alamat, kelas) VALUES ('${add.nama}', '${add.alamat}', '${add.kelas}')`;
      db.query(insertSql, (err, result) => {
         if (err) throw err;
         res.redirect("/");
      });
   });
});

//menyalakan host browser
app.listen(8000, () => {
   console.log("server ready..");
});
