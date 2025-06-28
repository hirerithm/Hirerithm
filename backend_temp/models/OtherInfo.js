const mongoose = require("mongoose");

const otherInfoSchema = new mongoose.Schema({
  resume_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
    required: true,
  },
  content: { type: String, required: true },
});

module.exports = mongoose.model("OtherInfo", otherInfoSchema);
