import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

// Manejo de peticiones GET y POST
export async function GET() {
  await connectDB();
  const users = await User.find();
  return Response.json(users);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const newUser = await User.create(body);
  return Response.json(newUser);
}
