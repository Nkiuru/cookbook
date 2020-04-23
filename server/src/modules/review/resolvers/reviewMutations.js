const Review = require('../../../models/review');
const Recipe = require('../../../models/recipe');

const createReview = async (_, args, { user }) => {
  args.user = user.id;
  if (await Recipe.findOne(args.recipe)) {
    const review = await Review.create(args);
    return await review.populate('user recipe').execPopulate();
  } else {
    throw 'Recipe does not exist';
  }
};

const modifyReview = async (_, args) => {
  if (args.recipe && !(await Recipe.findOne(args.recipe))) {
    throw 'Recipe does not exist';
  }
  const review = await Review.findByIdAndUpdate(args.id, args, { new: true });
  return await review.populate('user recipe').execPopulate();
};

const deleteReview = async (_, args) => {
  const review = await Review.findByIdAndDelete(args.id);
  await Recipe.findByIdAndUpdate(review.recipe, {
    $pull: { reviews: review.id },
  });
  return `${review.name} deleted`;
};

module.exports = {
  createReview,
  modifyReview,
  deleteReview,
};