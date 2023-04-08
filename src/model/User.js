const fs = require('fs');

const User = {
    fileName: './database/user.json',

    getData: function () {
        return fs.readFileSync(this.fileName, 'utf-8');
    },

    create: function (userData) {
        
    }
}

console.log(User.getData());