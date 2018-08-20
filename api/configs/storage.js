const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

const profile = () => {
  const _storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../../public/storage/users/'));
    },
    filename: (req, file, cb) => {
      let name = crypto.randomBytes(20).toString('hex') + '.jpeg';
      // name += '.' + file.mimetype.slice(6);
      cb(null, name);
    }
  });

  const upload = multer({ storage: _storage });
  return upload;
};

const product = () => {
  const _storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../../public/storage/images/'));
    },
    filename: (req, file, cb) => {
      let name = crypto.randomBytes(20).toString('hex') + '.jpeg';
      // name += '.' + file.mimetype.slice(6);
      cb(null, name);
    }
  });

  const upload = multer({ storage: _storage });
  return upload;
}

module.exports = { profile, product };
