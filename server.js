'use strict';

const app = require('express')();
const images = require('./src/images.json');
const thumbnails = require('./src/Image_thumbnails.json')

const randomInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

app.get('/images', ({ query }, res) => {
  const i = (query.limit) ? images.slice(0, parseInt(query.limit)) : images;

  setTimeout(() => {
    return res.status(200).json(i);
  }, randomInterval(500, 1500));
});

//For thumbnails
app.get('/imageThumbnails', ({ query }, res) => {
  let i = (query.limit) ? thumbnails.slice(0, parseInt(query.limit)) : thumbnails;

  setTimeout(() => {
    return res.status(200).json(i);
  }, randomInterval(500, 1500));
});

app.listen(5500, () => {
  process.stdout.write('Server is available on http://localhost:5500/\n');
});
