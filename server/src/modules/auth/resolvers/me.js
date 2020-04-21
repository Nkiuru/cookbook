const me = async (_, args, { user }) => ({
  ...user._doc,
  id: user.id,
  fullName: user.fullName,
});

module.exports = me;
