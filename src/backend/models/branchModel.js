const mongoose = require('mongoose');

const { Schema } = mongoose;

const branchSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    street: String,
    postal_code: String,
    city: String,
    province: String,
    lat: Number,
    lon: Number,
  },
  vehicles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Vehicle',
    },
  ],
  reservations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Reservation',
    },
  ],
});

branchSchema.virtual('address').get(function getAddress() {
  return `${this.location.street}, ${this.location.city}, ${this.location.province}`;
});
branchSchema.virtual('latLon').get(function getLatLon() {
  return [this.location.lat, this.location.lon];
});
branchSchema.set('toJSON', { getters: true });
const Branch = mongoose.model('Branch', branchSchema);

module.exports = Branch;
