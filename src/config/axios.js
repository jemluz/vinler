import axios from 'axios'

const sucess = res => res
const error = err => {
  if(401 === err.response.status) {
    window.location = '/'
    console.log('O seu login expirou!')
  } else {
    return Promise.reject(err)
  }
}

axios.interceptors.response.use(sucess, error)