const fs = require('fs');

const User = {
    fileName: './database/user.json',

    getData: function () {
        return fs.readFileSync(this.fileName)
    },

    create: function (userData) {
        
    }
}