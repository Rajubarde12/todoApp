const fs = require('fs');
const path = require('path');

const logFiles = (directoryPath) => {
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return console.error('Unable to scan directory: ' + err);
        }
        files.forEach(file => {
            const filePath = file;
            console.log(filePath);
        });
    });
};

const directoryPath = path.join(__dirname, '../assets/fonts');
logFiles(directoryPath);
