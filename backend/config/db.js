const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "fahad",
  database: "employee_attendance_dev",
});
client.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
module.exports = client;
