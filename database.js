const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const { NODE_ENV } = require('./config');

const dbPath = NODE_ENV === 'production' ? '/tmp/database.sqlite' : './database.sqlite';

async function getDatabase() {
  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
}

module.exports = getDatabase;
