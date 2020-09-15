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
      enum: ['alimentação', 'eletronicos', 'materias', 'vestuários']
    },
    subCategory: {
      type: String,
      reqiured: [true, 'O produto deve ter uma sub-categoria']
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

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
productSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});  

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
