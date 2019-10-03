const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let databaseConnected;

module.exports = connectToDatabase = () => {
    if (databaseConnected) {
        console.log('Already connected');
        return Promise.resolve();
    }

    console.log('Startinh up connection');
    return mongoose.connect(process.env.DB)
        .then(db => {
            databaseConnected = db.connections[0].readyState;
        });
};