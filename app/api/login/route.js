import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import User from '@/models/User'
import { connectDB } from "@/lib/mongodb";

export async function POST(req) {
  await connectDB();
  const body = await req.json()
  console.log(body)
  const { username, password } = body

  const user = await User.findOne({ username })

  const passwordCorrect = user === null
    ? false
    : await bcryptjs.compare(password, user.password)

  if (!(user && passwordCorrect)) {
    return Response.json({
      error: 'invalid user or password'
    },{status:401})
  }
  //sesion de usuario
  const userForToken = {
    id: user._id,
    username: user.username
  }

  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    {
      expiresIn: 60 * 60 * 24 * 7
    }
  )

  return Response.json({
    name: user.name,
    username: user.username,
    token
  })
}