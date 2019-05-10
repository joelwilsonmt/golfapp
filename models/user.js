
var mongoose = require('./../config/db-config');
const findOrCreate = require('mongoose-find-or-create');


let UserSchema = mongoose.Schema(
  {
    name: String,
    games: [{
      active: Boolean,
      holes: [{
        par: Number,
        strokes: Number,
        putts: Number,
        fairwayHit: Boolean,
        greensInRegulation: Boolean,
        picture: { data: Buffer, contentType: String }
      }],
      courseName: String,
      date: Date,
      formattedDate: String,
      /*location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }*/
    }]
    },
    { collection: 'golf' });
UserSchema.plugin(findOrCreate, { appendToArray: true });


var User = mongoose.model("User", UserSchema);

module.exports = User;
