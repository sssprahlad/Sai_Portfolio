const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./auth.db", (err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Sql Database connected");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
  )
`);

db.run(`
    CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT NOT NULL,
        title TEXT NOT NULL,
        technologies TEXT NOT NULL,
        gitUrl TEXT NOT NULL,
        projectLink TEXT NOT NULL,
        description TEXT NOT NULL
    )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS myDetails (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            address TEXT NOT NULL,
            profileImage TEXT NOT NULL,
            resume TEXT NOT NULL,
            linkedIn TEXT NOT NULL,
            github TEXT NOT NULL,
            twitter TEXT NOT NULL,
            facebook TEXT NOT NULL,
            instagram TEXT NOT NULL,
            whatsapp TEXT NOT NULL,
            location TEXT NOT NULL,
            frontend TEXT NOT NULL,
            backend TEXT NOT NULL,
            database TEXT NOT NULL
            
        )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS myExperience (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                company TEXT NOT NULL,
                position TEXT NOT NULL,
                duration TEXT NOT NULL  
            )
            `);

            db.run(`CREATE TABLE IF NOT EXISTS responsibilities (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              experienceId INTEGER NOT NULL,
              responsibility TEXT NOT NULL,
              FOREIGN KEY (experienceId) REFERENCES myExperience(id) ON DELETE CASCADE
            )`);


module.exports = db;