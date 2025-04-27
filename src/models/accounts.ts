import mongoose from "mongoose";

const schema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  role: { 
    type: String, 
  },
  is_verified: {
    type: Boolean, 
    default: false 
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  },
});


const Account = mongoose.models.Account || mongoose.model("Account", schema);
export default Account;