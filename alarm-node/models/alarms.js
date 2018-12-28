const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create alarm schema & model

const alarmSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    time: {
        type: String,
        required: [true, 'Time is required']
    },
    status: {
        type: Boolean,
        default: false
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'userSchema'
    }
});

const Alarms = mongoose.model('alarms', alarmSchema);

module.exports = Alarms;