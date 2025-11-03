import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  role: { type: String, default: 'user' },
}, { timestamps: true });

// Guard against model recompile in dev
const User = mongoose.models?.User || mongoose.model('User', UserSchema);

export { User };
export default User;


  

