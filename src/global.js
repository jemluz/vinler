import Vue from 'vue'
// import { db } from '../.env'

export const userKey = '__vinler_user'
// export const carrinho = []
// export const baseApiUrl = `http://192.168.15.2:3000`
// export const baseApiUrl = `http://10.102.224.25:3000`
// export const port = process.env.PORT || 3000;
export const baseApiUrl = `https://mysql669.umbler.com`
// export const baseApiUrl = `http://localhost:3000`

export function showError(e) {
  if (e && e.response && e.response.data) {
    Vue.toasted.global.defaultError({ msg: e })
    console.log(e)
  } else if (typeof e === 'string') {
    Vue.toasted.global.defaultError({ msg: e })
  } else {
    Vue.toasted.global.defaultError()
  }
}

export default { baseApiUrl, showError, userKey }