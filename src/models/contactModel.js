const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Diz nos o seu nome!']
  },
  number: {
    type: Number,
    required: [true, 'Precisamos do seu numero de telefone!']
  },
  message: {
    type: String,
    required: [true, 'A sua mensagen não pode ir vazia!']
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;