const mongoose = require("mongoose");

const formSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  email:{type: String, required: true},
  address: { type: String },
  phoneNumber: { type: Number },
  service: { type: Boolean },
});

module.exports = mongoose.model("Form", formSchema);
