const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema({
  resume_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
    required: true,
  },
  company_name: { type: String },
  position: { type: String },
  description: { type: String },
  start_year: { type: String },
  isCurrent: { type: Boolean },
  end_year: {
    type: String,
    //required: true,
    validate: {
      validator: function (value) {
        return !value || /^\d{6}$/.test(value);
      },
    },
  },
});

module.exports = mongoose.model("Career", careerSchema);
