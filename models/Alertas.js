import mongoose from "mongoose"

const alertasSchema = new mongoose.Schema({
  cantidadActual: {type: Number},
  cantidadRegistro: {type: Number},
  fecha: {type: String},
  mensaje: {type: String},
  nombre: {type: String},
  status: {type: String},
  subestacion: {type: String},
  comentario: {type: String}
})

alertasSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default mongoose.models.Alertas || mongoose.model('Alertas', alertasSchema)
