import axios from 'axios'

const baseUrl = 'http://localhost:3000/api/users'

const signup = async credentials => {
  const res = await axios.post(baseUrl, credentials)
  console.log(res)
  if (res.status!==200) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.error  || "SignUp failed")
  }
  return res.data
}

export default { signup }