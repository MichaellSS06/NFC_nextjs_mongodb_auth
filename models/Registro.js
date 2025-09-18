import mongoose from "mongoose"

const registroSchema = new mongoose.Schema({
  subestacion: { type: String, required: true },
  date: Date,
  materiales: [{
    nombre: { type: String, required: true },
    cantidad: { type: Number, required: true, min: 1 },
    _id: false
  }],
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

export const Registro = mongoose.model('Registro', registroSchema)
