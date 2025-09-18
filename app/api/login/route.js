import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import User from '@/models/User'

export async function POST(req) {
  const { body } = req
  const { username, password } = body

  const user = await User.findOne({ username })

  const passwordCorrect = user === null
    ? false
    : await bcryptjs.compare(password, user.password)

  if (!(user && passwordCorrect)) {
    response.status(401).json({
      error: 'invalid user or password'
    })
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

  return Response.send({
    name: user.name,
    username: user.username,
    token
  })
}