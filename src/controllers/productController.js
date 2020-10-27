const fs = require('fs');

const multer = require('multer');
const sharp = require('sharp');
const Product = require('./../models/productModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Não é uma imagen! Providência apenas imagens.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadProductImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 }
]);

// upload.single('image') req.file
// upload.array('images', 5) req.files

exports.resizeProductImages = catchAsync(async (req, res, next) => {
  // if (!req.files.imageCover || !req.files.images) return next();
  
  if (req.files && req.files.imageCover) {
    // 1) Cover image
    req.body.imageCover = `product-${req.user.id}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/products/${req.body.imageCover}`);
  }

  if (req.files && req.files.images) {
    // 2) Images
    req.body.images = [];
  
    await Promise.all(
      req.files.images.map(async (file, i) => {
        const filename = `product-${req.user.id}-${Date.now()}-${i + 1}.jpeg`;
  
        await sharp(file.buffer)
          .resize(2000, 1333)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`public/img/products/${filename}`);
  
        req.body.images.push(filename);
      })
    );

    next();
  }

  next();
}); 

exports.deleteImages = catchAsync(async (req, res, next) => {
  if (req.files) {
    const { id } = req.params;
    const products = await Product.findById(id)
  
    const imgName = products.imageCover 

    if (imgName === 'default.jpg') return next()
    
    return fs.unlink(`public/img/products/${imgName}`, () => {
      next()
    })
  }

  next()
})

exports.getAllProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product);
exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);  
