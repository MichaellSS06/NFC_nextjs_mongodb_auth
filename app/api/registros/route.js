import { Registro } from "@/models/Registro"


export async function GET() {
    const registros = await Registro.find({}).populate('user', {
    username: 1,
    name: 1
  })
  return Response.json(registros)
}