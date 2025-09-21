import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcryptjs from "bcryptjs"

// Manejo de peticiones GET y POST
export async function GET() {
  await connectDB();
  const users = await User.find({}).populate('registros', {
    subestacion: 1,
    materiales:1,
    date: 1
  });
  return Response.json(users);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const { username, name, password } = body
  console.log(body)
  const saltRounds = 10

  const passwordHash = await bcryptjs.hash(password, saltRounds)
  try {
    const newUser = await User.create({username, name, password: passwordHash});
    return Response.json(newUser);
  } catch(error) {
    if (error.message.includes("Username ya registrado")) {
      return Response.json({ error: error.message }, { status: 409 });
    }
    return Response.json({ error: "Error interno" }, { status: 500 });
  }  
}
