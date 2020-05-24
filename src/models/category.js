const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Knowledge = require('./knowledge');

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
    ref: 'Knowledge',
    localField: '_id',
    foreignField: 'category'
});

categorySchema.pre('remove', async function(next) {
    await Knowledge.deleteMany({ category: this._id });
    next();
})

module.exports = mongoose.model('Category', categorySchema);