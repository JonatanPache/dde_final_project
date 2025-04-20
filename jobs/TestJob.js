const cron = require("node-cron");
const { exec } = require("child_process");
const pool = require("../db/db_helper");

//cron.schedule("0 2 * * *", () => {
cron.schedule("*/2 * * * *", () => {
    console.log("[JOB] Ejecutando pruebas unitarias...");
  
    exec("npm test", (error, stdout, stderr) => {
      if (error) {
        console.error(`[JOB ERROR] Error ejecutando tests: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`[JOB STDERR]: ${stderr}`);
      }
  
      console.log(`[JOB RESULT]:\n${stdout}`);
    });
  });