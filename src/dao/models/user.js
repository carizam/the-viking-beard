// src/models/user.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  last_name: {
    type: String,
    required: [true, "El apellido es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El correo electrónico es obligatorio"],
    unique: true,
    match: [/.+\@.+\..+/, "Por favor ingrese un correo electrónico válido"],
  },
  age: {
    type: Number,
    required: [true, "La edad es obligatoria"],
    min: [18, "Debe ser mayor de edad para registrarse"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
});

// Middleware
UserSchema.pre("save", function (next) {
  // Solo hash la contraseña si ha sido modificada (o es nueva)
  if (!this.isModified("password")) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
