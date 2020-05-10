const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    token: {
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

tokenSchema.methods.toJSON = function () {
	// const userObject = this.toObject();
	// delete userObject.password;
    // delete userObject.tokens;
    return this.token;
}

module.exports = mongoose.model('Token', tokenSchema);