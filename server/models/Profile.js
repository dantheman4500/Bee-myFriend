const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const profileSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  userBio: {
    type: String,
    required: false,
    default: "This user has no bio yet."
  },
  image: {
    type: String,
    default: "https://i.postimg.cc/TPXj84Sc/bee.png"
  },
  interests: [
    {
      type: String,
      required: false,
      default: "coding"
    }
  ],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'Profile',
  }],
});


//* set up pre-save middleware to create password
profileSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

//* compare the incoming password with the hashed password
profileSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Profile = model('Profile', profileSchema);

module.exports = Profile;
