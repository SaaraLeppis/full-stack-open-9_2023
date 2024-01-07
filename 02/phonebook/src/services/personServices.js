import axios from "axios"
// * used in section 2 with db.json
//const baseUrl = "http://localhost:3001/persons"

// to combine with backend, section 3
//const baseUrl = "http://localhost:3001/api/persons"
// for production use
const baseUrl = "/api/persons"

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data
  })
}

const create = newData => {
  const request = axios.post(baseUrl, newData)
  return request.then(response => response.data)
}

const remove = removeIndex => {
  const request = axios.delete(`${baseUrl}/${removeIndex}`)
  return request.then(response => response.data)
}
const update = (id, dataObject) => {
  const request = axios.put(`${baseUrl}/${id}`, dataObject)
  return request.then(response => response.data)
}
export default { getAll, create, remove, update }
