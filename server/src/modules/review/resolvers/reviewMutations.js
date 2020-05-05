const Review = require('../../../models/review');
const Recipe = require('../../../models/recipe');
const { ApolloError } = require('apollo-server-express');

const createReview = async (_, args, { user }) => {
  console.log(args);
  args.user = user.id;
  const r = await Recipe.findById(args.recipe);
  if (r) {
    console.log(r.reviews);
    if (
      r.reviews.find(async review => {
        const re = await Review.findById(review);
        return re.user.toString() === user._id.toString();
      })
    ) {
      throw new ApolloError('Cannot review it again');
    }
    const review = await Review.create(args);
    r.reviews.push(review._id);
    await r.save();
    return await review.populate('user recipe').execPopulate();
  } else {
    throw new ApolloError('Recipe does not exist');
  }
};

const modifyReview = async (_, args, { user }) => {
  let review = await Review.findById(args.id);
  if (args.recipe && !(await Recipe.findById(args.recipe))) {
    throw new ApolloError('Recipe does not exist');
  }
  if (!review || review.user.toString() !== user.id.toString()) {
    throw new ApolloError('Unauthorized');
  }
  review.updatedAt = Date.now();
  review.content = args.content;
  return (await review.save()).populate('user recipe').execPopulate();
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
