const { Schema, model } = require('mongoose');


const FriendshipSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  user1: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
  user2: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['PENDING', 'ACCEPTED', 'REJECTED'],
  },
});
  

const Friendship = model('Friendship', FriendshipSchema);

module.exports = Friendship;