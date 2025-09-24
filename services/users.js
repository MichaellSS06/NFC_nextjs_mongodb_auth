import axios from 'axios'

const baseUrl = '/api/users'

const signup = async credentials => {
  const res = await axios.post(baseUrl, credentials)
  console.log(res)
  if (res.status!==200) {
    throw new Error(res.data?.error || "SignUp failed")
  }
  return res.data
}

export default { signup }