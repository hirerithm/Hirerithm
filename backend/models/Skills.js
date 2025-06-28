const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  resume_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
    required: true,
  },
  skill_name: { type: String },
});

module.exports = mongoose.model("Skills", skillSchema);
