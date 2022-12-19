const { AuthenticationError } = require('apollo-server-express');
const { Profile } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc')

// queries and mutations that allow for the app to interact with the data in the database
const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    findProfileByInterest: async (parent, { profileInterest }) => {
      return Profile.find({ interests: profileInterest });
    },
    checkout: async (parent, args, context) => {

      const url = new URL(context.headers.referer).origin;
      const line_items = [];
      const products = [...args.products];

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: 'usd',
        });


        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });



        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });


      return { session: session.id };
    }
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(profile);
      return { token, profile };
    },
    createProfile: async (parent, args) => {
      const profile = await Profile.create(args);
      const token = signToken(profile);
      return { token, profile };
    },
    deleteProfile: async (parent, { profileId }, context) => {
      return Profile.findOneAndDelete({ _id: profileId });
    },
    addInterest: async (parent, { profileId, interest }, context) => {
      return Profile.findOneAndUpdate(
        { _id: profileId },
        { $addToSet: { interests: interest } },
        { new: true, runValidators: true }
      );
    },
    deleteInterest: async (parent, { profileId, interest}, context) => {
      return Profile.findOneAndUpdate(
        { _id: profileId},
        { $pull: {interests: interest}},
        { new: true }
      );
    },
    updateUserBio: async (parent, { profileId, userBio }, context) => {
      return await Profile.findByIdAndUpdate(
        { _id: profileId },
        { userBio: userBio },
        { new: true }
      )

    },
    updateUser: async (parent, {profileId, firstName, lastName, email, password}, context) => {
      return await Profile.findByIdAndUpdate(
        {_id: profileId},
        { 
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password
        },
        { new: true }
        )
    },

    }

  }
}

module.exports = resolvers;
