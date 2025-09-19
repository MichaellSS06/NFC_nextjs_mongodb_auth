import { NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import { Registro } from "@/models/Registro";
import userExtractor from "@/middleware/userExtractor";

export async function PUT(req, { params }, res) {
  await connectDB();

  const { id } = await params;
  const body = await req.json();
  const { subestacion, materiales } = body;

  const newRegistroInfo = { subestacion, materiales };

  const userId = await userExtractor(req, res)
  const registroActual = await Registro.findById(id)
  const userRegistroActual= registroActual.user

  if (!userRegistroActual.equals(userId)) return NextResponse.json("Registro no corresponde a usuario")

  return Registro.findByIdAndUpdate(id, newRegistroInfo, { new: true })
    .then(result => {
      console.log(result)
      return NextResponse.json(result)
    })
    .catch(error => {
    return NextResponse.json("Error actualizando registro", error)
  })
}
