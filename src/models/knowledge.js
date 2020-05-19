const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const knowledgeSchema = new Schema({
    category: {
        type: String,
        required: true,
        descriptions: [{
            title: {
                type: String,
                required: true
            },
            status: {
                type: String,
                enum: ['Finished', 'Coursing']
            },
            url: String,
            level: Number,
            initialDate: Date,
            finalDate: Date,
            duration: Number,
            address: String,
            description: String
        }],
    }
},
    {timestamps: true}
);

module.exports = mongoose.model('knowledge', knowledgeSchema);