import Vue from 'vue'
// import { db } from '../.env'

export const userKey = '__vinler_user'
// export const carrinho = []
// export const baseApiUrl = `http://192.168.15.7:3000`
// export const baseApiUrl = `http://192.168.100.161:3000`
export const baseApiUrl = `http://localhost:3000`

export function showError(e) {
  if (e && e.response && e.response.data) {
    Vue.toasted.global.defaultError({ msg: e.response.data})
  } else if (typeof e === 'string') {
    Vue.toasted.global.defaultError({ msg: e })
  } else {
    Vue.toasted.global.defaultError()
  }
}

export default { baseApiUrl, showError, userKey }