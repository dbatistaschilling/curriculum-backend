const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillSchema = new Schema({
    category: {
        type: String,
        required: true,
        descriptions: [{
            name: {
                type: String,
                required: true
            },
            level: Number
        }],
    }
},
    {timestamps: true}
);

module.exports = mongoose.model('Skill', skillSchema);