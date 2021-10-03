import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: [true, "Please provide a first name."] },
  lastName: { type: String, required: [true, "Please provide a last name."] },
  phone: { type: String, required: [true, "Please provide a phone number."] },
  passCode: Number,
  token: String,
});

export default mongoose.models.Users || mongoose.model('Users', UserSchema);