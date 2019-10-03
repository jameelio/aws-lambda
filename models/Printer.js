const mongoose = require('mongoose');
const PrinterSchema = new mongoose.Schema({
    name: String,
    ip: String,
    status:Boolean
});
module.exports = mongoose.model('Printer', PrinterSchema);