import axios from 'axios'
import { getToken } from './registros'

const baseUrl = '/api/alertas'

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
    throw new Error(request.data?.error  || "No hay credenciales")
  }

  return request.data
}

const update = async (newComment) => {
  const config = {
    headers: {
      Authorization: getToken()
    }
  }
  const request = await axios.put(baseUrl, newComment, config)
  
  if (request.status!==200) {
    throw new Error(request.data?.error  || "No hay credenciales")
  }

  return request.data
}

export default { getAll, create, update }