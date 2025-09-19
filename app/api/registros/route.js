import { Registro } from "@/models/Registro"
import userExtractor from "../../../middleware/userExtractor"
import User from "@/models/User";

export async function GET() {
    const registros = await Registro.find({}).populate('user', {
    username: 1,
    name: 1
  })
  return Response.json(registros)
}

export async function POST(req, res) {
  const {
    subestacion,
    materiales
  } = req.body

  const {userId} = userExtractor(req, res)

  const user = await User.findById(userId)

  if (!subestacion) {
    return response.status(400).json({
      error: 'required "subestacion" field is missing'
    })
  }

  const newRegistro = new Registro({
    subestacion,
    date: new Date(),
    materiales,
    user: user._id
  })

  try {
    const savedRegistro = await newRegistro.save()

    user.registros = user.registros.concat(savedRegistro._id)
    await user.save()

    Response.json(savedRegistro)
  } catch (error) {
    Response.send("Error guardando registro", error)
  }
}

export async function PUT(req, res) {
  const { id } = req.params
  const { subestacion, materiales } = req.body

  const newRegistroInfo = {
    subestacion,
    materiales
  }

  console.log(id, newRegistroInfo)

  Registro.findByIdAndUpdate(id, newRegistroInfo, { new: true })
    .then(result => {
      console.log(result)
      Response.json(result)
    })
    .catch(error => {
    Response.send("Error actualizando registro", error)
  })
}