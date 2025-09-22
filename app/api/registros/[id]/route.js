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

  try {
  const userId = await userExtractor(req, res)
  const registroActual = await Registro.findById(id)
  const userRegistroActual= registroActual.user

  if (!userRegistroActual.equals(userId)) return NextResponse.json({error:"Registro no corresponde a usuario"},{status:409})

  return Registro.findByIdAndUpdate(id, newRegistroInfo, { new: true })
    .then(result => {
      console.log(result)
      return NextResponse.json(result)
    })
    .catch(error => {
    return NextResponse.json({error:"Error actualizando registro", error},{status: 500})
  })
  }
  catch (error){
    return Response.json({ error: error.message }, { status: 401 });
  }
}
