const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const userSchema = new Schema({
  first: {type: String, required: true},
  last: {type: String, required: true},
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  password: { type: String, required: true },
  imgUrl: { type: String, required: true },
  activeConvo: {type: Schema.Types.ObjectId, default: null }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});

userSchema.pre('save', async function(next) {
  // 'this' is the user document
  if (!this.isModified('password')) return next();
  // Replace the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

module.exports = mongoose.model('User', userSchema);