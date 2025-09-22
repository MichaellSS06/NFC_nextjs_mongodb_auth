import axios from 'axios'

const baseUrl = 'https://nonethically-agrobiological-nerissa.ngrok-free.dev/api/login'

const login = async credentials => {
  const res = await axios.post(baseUrl, credentials)
  if (res.status!==200) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.error  || "Login failed")
  }
  return res.data
}

export default { login }