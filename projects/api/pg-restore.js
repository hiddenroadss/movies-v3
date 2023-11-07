const { exec } = require('child_process');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const BACKUP_DIR = process.env.BACKUP_DIR;

const backupFile = path.join(BACKUP_DIR, `backup_<timestamp>.tar`);

const pgRestoreCmd = `"pg_restore" -h ${DB_HOST} -p ${DB_PORT} -U ${DB_USERNAME} -d ${DB_NAME} -F t --clean --verbose "${backupFile}"`;

const env = {
  ...process.env,
  PGPASSWORD: DB_PASSWORD,
};

exec(pgRestoreCmd, { env }, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Database restored successfully from: ${backupFile}`);
});