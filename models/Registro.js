import mongoose from "mongoose"

const registroSchema = new mongoose.Schema({
  subestacion: String,
  date: Date,
  materiales: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

registroSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const Registro = mongoose.model('Registro', noteSchema)
