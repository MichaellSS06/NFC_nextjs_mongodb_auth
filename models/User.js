import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // genera índice único en la colección
  },
  name: { type: String, required: true },
  password: {
    type: String,
    required: true
  },
  registros: [{
    type: Schema.Types.ObjectId,
    ref: 'Registro'
  }]
});

// Captura errores de índice duplicado
UserSchema.post("save", (error, doc, next) => {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error("Username ya registrado"));
  } else {
    next(error);
  }
});

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v

    delete returnedObject.passwordHash
  }
})

export default mongoose.models.User || mongoose.model("User", UserSchema);
