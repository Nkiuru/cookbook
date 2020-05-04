const { createWriteStream, mkdir } = require('fs');
const mongoose = require('mongoose');

const storeUpload = async ({ stream, filename, mimetype }) => {
  const id = new mongoose.mongo.ObjectId().toString();
  const path = `uploads/${id}-${filename}`;
  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on('finish', () => resolve({ id, path, filename, mimetype }))
      .on('error', reject),
  );
};

const processUpload = async upload => {
  mkdir('uploads', { recursive: true }, err => {
    if (err) throw err;
  });
  console.log(upload);
  const { createReadStream, filename, mimetype } = await upload;
  const stream = createReadStream();
  return await storeUpload({ stream, filename, mimetype });
};

module.exports = {
  processUpload,
};
