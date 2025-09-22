import axios from 'axios'

const baseUrl = 'https://nonethically-agrobiological-nerissa.ngrok-free.dev/api/registros'

// let token = null

export const getToken = () => {
  const loggedUserJSON = window.localStorage.getItem("loggedUser");
  if (!loggedUserJSON) return null;
  const user = JSON.parse(loggedUserJSON);
  return `Bearer ${user.token}`;
};

// const setToken = newToken => {
//   token = `Bearer ${newToken}`
// }

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (newObject) => {
  const config = {
    headers: {
      Authorization: getToken()
    }
  }

  const request = await axios.post(baseUrl, newObject, config)

  if (request.status!==200) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.error  || "Campos faltantes o no hay credenciales")
  }

  return request.data
}

const update = async (id, newObject) => {
  const config = {
    headers: {
      Authorization: getToken()
    }
  }
  console.log(id)
  const request = await axios.put(`${baseUrl}/${id}`, newObject, config)
  
  if (request.status!==200) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.error  || "Registro no corresponde a usuario o no hay credenciales")
  }

  return request.data
}

export default { getAll, create, update }