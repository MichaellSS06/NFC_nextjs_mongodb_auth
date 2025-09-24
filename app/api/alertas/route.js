import userExtractor from "@/middleware/userExtractor"
import Alertas from "@/models/Alertas";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();
    const alertas = await Alertas.find({})
  return Response.json(alertas)
}

export async function POST(req, res) {
  await connectDB();
  const body = await req.json()
  const {
    cantidadActual,
    cantidadRegistro,
    fecha,
    mensaje,
    nombre,
    status,
    subestacion
  } = body

  try{
    await userExtractor(req, res)

    const newAlerta = new Alertas({
      cantidadActual,
      cantidadRegistro,
      fecha,
      mensaje,
      nombre,
      status,
      subestacion
    })

    try {
      const savedAlerta = await newAlerta.save()
      return Response.json(savedAlerta)

    } catch (error) {
      return Response.json({error: "Error guardando alerta", error},{ status: 500})
    }
  } catch (error) {
    return Response.json({ error: error.message }, { status: 401 });
  }
  
}

export async function PUT(req, res) {
  await connectDB();
  const body = await req.json()
  const {
    id,
    comentario
  } = body

  try{
    await userExtractor(req, res)

    if (!comentario) {
      return NextResponse.json({
        error: 'required "comentario" field is missing'
      }, {status: 400})
    }

    return Alertas.findByIdAndUpdate(id, {comentario}, { new: true })
        .then(result => {
          console.log(result)
          return NextResponse.json(result)
        })
        .catch(error => {
        return NextResponse.json({error:"Error actualizando registro", error},{status: 500})
      })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 401 });
  }
  
}