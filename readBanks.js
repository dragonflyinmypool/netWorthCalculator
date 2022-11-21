// import library to read file system
const fs = require("fs");
// import library to read csv file
const csv = require("csv-parser");

let bankData = {};

// check for csv files in the data folder
fs.readdir("./data/banks", (err, files) => {
  // loop through files
  files.forEach((file) => {
    readCSV(file);
  });
});

function readCSV(file) {
  // get the name of the file, remove number at the beginning (1., 2. ect.) and the the .csv extension at the end
  let accountName = file.replace(/^[0-999]+./, "").replace(".csv", "");
  bankData[accountName] = [];
  // read the csv file
  fs.createReadStream("./data/banks/" + file)
    .pipe(csv())
    .on("data", (row) => {
      // add the row to the bankData object
      bankData[accountName].push(row);
    })
    .on("end", () => {
      console.log(`${accountName} read`);
    });
}
console.log(bankData);
