const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const knowledgeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    courseSituation: {
        type: String,
        default: 'Finished',
        enum: ['Finished', 'Coursing']
    },
    status: {
        type: String,
        default: 'Active',
        enum: ['Active', 'Disactivated']
    },
    url: String,
    level: Number,
    initialDate: Date,
    finalDate: Date,
    duration: Number,
    address: String,
    note: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
},
    {timestamps: true}
);

module.exports = mongoose.model('knowledge', knowledgeSchema);