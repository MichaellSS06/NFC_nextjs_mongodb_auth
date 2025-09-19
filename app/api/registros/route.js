import { Registro } from "@/models/Registro"
import userExtractor from "@/middleware/userExtractor"
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
    await connectDB();
    const registros = await Registro.find({}).populate('user', {
    username: 1,
    name: 1
  })
  return Response.json(registros)
}

export async function POST(req, res) {
  await connectDB();
  const body = await req.json()
  const {
    subestacion,
    materiales
  } = body

  try{
    const userId = await userExtractor(req, res)
    const user = await User.findById(userId)
    console.log(user)

    if (!subestacion) {
      return Response.json({
        error: 'required "subestacion" field is missing'
      }, {status: 400})
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

      return Response.json(savedRegistro)
    } catch (error) {
      return Response.send("Error guardando registro", error)
    }
  } catch (error) {
    return Response.json({ error: error.message }, { status: 401 });
  }
  
}