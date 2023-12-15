import axios from "axios"
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => {
    return response.data
  })
}

const create = (newData) => {
  const request = axios.post(baseUrl, newData)
  console.log(request, "in create")
  return request.then((response) => response.data)
}
export default { getAll, create }
