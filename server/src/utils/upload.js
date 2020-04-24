const { createWriteStream } = require('fs');
const mongoose = require('mongoose');

const storeUpload = async ({ stream, filename, mimetype }) => {
  const id = mongoose.Types.ObjectId();
  const path = `images/${id}-${filename}`;
  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on('finish', () => resolve({ id, path, filename, mimetype }))
      .on('error', reject),
  );
};

const processUpload = async upload => {
  const { createReadStream, filename, mimetype } = await upload;
  const stream = createReadStream();
  return await storeUpload({ stream, filename, mimetype });
};

module.exports = {
  processUpload,
};
