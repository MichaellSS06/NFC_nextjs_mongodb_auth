import axios from 'axios'
import { getToken } from './registros'

const baseUrl = 'https://nonethically-agrobiological-nerissa.ngrok-free.dev/api/alertas'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (newAlerta) => {
  const config = {
    headers: {
      Authorization: getToken()
    }
  }

  const request = await axios.post(baseUrl, newAlerta, config)

  if (request.status!==200) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.error  || "No hay credenciales")
  }

  return request.data
}

const update = async (newComment) => {
  const config = {
    headers: {
      Authorization: getToken()
    }
  }
  console.log(id)
  const request = await axios.put(baseUrl, newComment, config)
  
  if (request.status!==200) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.error  || "No hay credenciales")
  }

  return request.data
}

export default { getAll, create, update }