const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

async function getDatabase() {
  return open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
}

module.exports = getDatabase;
