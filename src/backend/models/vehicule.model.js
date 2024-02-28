const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Creating a new schema for the property model for the make an offer.

const vehiculeSchema = new Schema({
  make: {
    type: String,
    required: false,
  },

  model: {
    type: String,
    required: false,
  },

  price: {
    type: Number,
    required: false,
  },


  transmisssion: {
    type: String,
    required: false,
  },

  numberOfSeats: {
    type: Number,
    required: false,
  },


  address: {
    type: String,
    default: false

  },

  colour: {
    type: String,
    default: false

  },


 numberOfDoors: {
    type: Number,
    required: false,
  },

  numberOfBaggage: {
    type: Number,
    required: false,
  },


});

module.exports = mongoose.model("Vehicule", vehiculeSchema);