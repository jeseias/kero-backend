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
    category: {
      type: String,
      required: [true, 'O produto deve ter uma categoria'],
      enum: ['git', 'eletronicos', 'materias', 'vestuários']
    },
    subCategory: {
      type: String,
      reqiured: [true, 'O produto deve ter uma sub-categoria']
    },
    top: {
      type: Boolean,
      default: false
    },
    price: {
      type: Number,
      required: [true, 'Um produto deve ter um preço']
    }, 
    summary: {
      type: String,
      trim: true,
      required: [true, 'Um produto deve ter um sumário']
    }, 
    imageCover: {
      type: String,
      required: [true, 'Um producto deve ter uma imagen principal']
    },
    images: [String],   
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
  }
); 

productSchema.virtual('img__url').get(function() { 
  return process.env.LOCATION !== 'http://127.0.0.1' 
          ? `${process.env.LOCATION}/files/img/products/${this.imageCover}`
          : `${process.env.LOCATION}:${process.env.PORT}/files/img/products/${this.imageCover}`;
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
productSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});  

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
