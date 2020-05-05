const Review = require('../../../models/review');

const getReviews = async (_, { userId }) => {
  return Review.find({ user: userId }).populate('user recipe');
};

const getReview = async (_, args) => {
  return Review.findById(args.id).populate('user recipe');
};

module.exports = {
  getReview,
  getReviews,
};
