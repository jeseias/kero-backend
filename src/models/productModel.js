const mongoose = require('mongoose');
const slugify = require('slugify'); 

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Um produto deve ter um nome'],
      unique: true,
      trim: true
    },   
    price: {
      type: Number,
      required: [true, 'A tour must have a price']
    }, 
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description']
    }, 
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image']
    },
    images: [String],   
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
  }
); 

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
productSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});  

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
