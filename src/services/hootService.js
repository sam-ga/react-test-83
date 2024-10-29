import axios from './interceptors'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/hoots`

// * Index
export const index = () => {
  return axios.get(BASE_URL)
}

// * Show
export const show = (hootId) => {
  // Path: /hoots/:hootId
  return axios.get(`${BASE_URL}/${hootId}`)
}

// * Create
export const create = (formData) => {
  return axios.post(BASE_URL, formData)
}

// * Update
export const update = (hootId, formData) => {
  return axios.put(`${BASE_URL}/${hootId}`, formData)
}

// * Delete
export const deleteHoot = (hootId) => {
  // Path: /hoots/:hootId
  return axios.delete(`${BASE_URL}/${hootId}`)
}

// ! Comment Services

// * Create Comment
export const createComment = (hootId, formData) => {
  return axios.post(`${BASE_URL}/${hootId}/comments`, formData)
}