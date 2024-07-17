// Import mongoose
import mongoose from 'mongoose';

// Define user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  
  email: {
    type: String,
    required: true,
    unique: true 
  },
  
  pswd: {
    type: String,
    required: true,
    minlength: 6 // Minimum password length
  },

  cnfrm_pswd:
  {
    type:String,
    required:true
  }

});

const pay =new mongoose.Schema({
  fullName: { type: String, required:true},
  rollno: {type: String, required: true},
  email: {type:String, required: true},
  year: {type:String, required: true},
  address: {type:String, required: true},
  stop: {type:String, required: true},
  zip: {type:Number, required:true},
  date: {type:String, required:true}
})

// Create User model
export const User = mongoose.model('User', userSchema);
export const Pay = mongoose.model('Pay', pay);

