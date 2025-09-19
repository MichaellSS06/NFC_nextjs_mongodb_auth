import jwt from 'jsonwebtoken'

export default async function userExtractor(request) {
  const authorization = request.headers.get('Authorization')
  let token = ''

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }
  
  if (!token) {
    throw new Error("token missing or invalid");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return Response.json({ error: 'token missing or invalid' }, {status:401})
    }
    const { id: userId } = decodedToken
    return userId

  } catch (err) {//eslint-disable-line
    throw new Error("token missing or invalid");
  }
}