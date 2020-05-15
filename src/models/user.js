const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Profile = require('./profile');

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Active'
  },
  resetToken: String,
  resetTokenExpiration: Date
},
{
  timestamps: true
},
{
  toObject: {
    transform: function (doc, ret) {
      delete ret._id;
    }
  },
  toJSON: {
    transform: function (doc, ret) {
      delete ret._id;
    }
  }
});

userSchema.methods.toJSON = function () {
	const userObject = this.toObject();
	delete userObject.password;
  delete userObject.tokens;
  return userObject;
}

userSchema.virtual('profiles', {
  ref: 'Profile',
  localField: '_id',
  foreignField: 'owner'
});

userSchema.virtual('tokens', {
  ref: 'Token',
  localField: '_id',
  foreignField: 'owner'
});

// Delete all profiles from the deleted user
userSchema.pre('remove', async function(next) {
  await Profile.deleteMany({ owner: this._id });
  next();
})

module.exports = mongoose.model('User', userSchema);