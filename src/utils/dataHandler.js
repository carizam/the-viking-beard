const fs = require("fs");
const path = require("path");

// Función para leer json
function readJsonFile(fileName) {
  const filePath = path.join(__dirname, "..", "..", fileName);
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
}

// Función para escribir en el json
function writeJsonFile(fileName, data) {
  const filePath = path.join(__dirname, "..", "..", fileName);
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8", (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

module.exports = {
  readJsonFile,
  writeJsonFile,
};
