const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	job: {
		type: String,
		required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        street: {
            type: String,
            required: true
        },
        number: {
            type: Number,
            required: true
        },
        complement: String,
        city: {
            type: String,
            required: true
        },
        postCode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    birth: {
        type: Date,
        required: true
    },
    birthAddress: {
        city: String,
        state: String,
        country: String
    },
	description: {
		type: String
	}
});

module.exports = mongoose.model('Profile', profileSchema);