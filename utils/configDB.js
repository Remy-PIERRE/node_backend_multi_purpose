const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
	"./test.db",
	sqlite3.OPEN_READWRITE,
	(error) => {
		if (error) return console.log("Error connecting to db: ", error.message);
	}
);

module.exports = db;
