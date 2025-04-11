const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "instructor"], default: "student" },

    // ✅ Instructor profile fields (optional)
    instructorProfile: {
      description: { type: String },
      qualification: { type: String },
      experience: { type: String },
      specialization: { type: String },
      linkedin: { type: String },

      // ✅ Bank Details (only for instructors who set it)
      bankName: { type: String },
      accountHolderName: { type: String },
      accountNumber: { type: String },
      ifscCode: { type: String },
      upiId: { type: String },
    },
  },
  { timestamps: true }
);

// ✅ Virtual full name
UserSchema.virtual("name").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.set("toObject", { virtuals: true });
UserSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User", UserSchema);
