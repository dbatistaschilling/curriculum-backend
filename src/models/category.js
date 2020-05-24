const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    category: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    {timestamps: true}
);

categorySchema.virtual('knowledges', {
    ref: 'Knoledge',
    localField: '_id',
    foreignField: 'category'
  });

module.exports = mongoose.model('Category', categorySchema);