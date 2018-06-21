const multer = require('multer');
const crypto = require('crypto');

const profile = () => {
  const _storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './storage/users/');
    },
    filename: (req, file, cb) => {
      let name = crypto.createHash('md5').update(file.originalname).digest('hex');
      name += '.' + file.mimetype.slice(6);
      cb(null, name);
    }
  });

  const upload = multer({ storage: _storage });
  return upload;
};
const product = () => {
  const _storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './storage/images/');
    },
    filename: (req, file, cb) => {
      let name = crypto.createHash('md5').update(file.originalname).digest('hex');
      name += '.' + file.mimetype.slice(6);
      cb(null, name);
    }
  });

  const upload = multer({ storage: _storage });
  return upload;
}

module.exports = { profile, product };