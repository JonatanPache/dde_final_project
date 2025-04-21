const cron = require("node-cron");
const fs = require("fs");
const path = require("path");

const pool = require("../db/db_helper");

const originDir = path.join(__dirname, "..", "static", "images", "game");

cron.schedule("0 2 * * *", async () => {
    console.log("[JOB] Ejecutando limpieza de imágenes...");
  
    try {
        const imagenes = await pool.query(
          "SELECT img_content FROM images WHERE img_estado = 0" // solo estado 0
        );
        //console.log("12",imagenes.lenght );
        if(!imagenes || imagenes.length === 0 ){
            console.log("[JOB] No existen imagenes !! ")
        }
        for (let img of imagenes) {
          const nombreArchivo = path.basename(img.img_content);
          //console.log('12',nombreArchivo)
          const ruta = path.join(originDir, nombreArchivo);
          //console.log('34',ruta);
          if (fs.existsSync(ruta)) {
            fs.unlinkSync(ruta);
            console.log("Imagen eliminada del disco virtual:", ruta);
          }
        }
    
        await pool.query("DELETE FROM images WHERE img_estado = 0");
    
        console.log("[JOB] Limpieza completada.");
      } catch (err) {
        console.error("[JOB ERROR]:", err);
      }
    });