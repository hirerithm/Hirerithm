const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  resume_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
    required: true,
  },
  certificate_name: { type: String, required: true },
  issued_date: { type: Date, required: true },
  //issuing_org: { type: String, required: true },
  certificate_number: { type: String, required: true },
});

module.exports = mongoose.model("Certificate", certificateSchema);
