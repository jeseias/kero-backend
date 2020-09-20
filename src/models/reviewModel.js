// review / rating / createdAt / ref to tour / ref to user
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'O seu testemunho não pode estar vazinho!']
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },  
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'O testemunho deve esta relacionado com algum cliente']
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
  }
);


reviewSchema.pre(/^find/, function(next) { 
  this.populate({
    path: 'user',
    select: 'name photo'
  });
  next();
}); 

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
