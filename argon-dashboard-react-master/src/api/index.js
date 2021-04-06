import axios from 'axios'

const url = 'http://localhost:5000/api/settings'

export const fetchSettings = () => axios.get(url)