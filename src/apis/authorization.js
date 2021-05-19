import { authorizationApi } from '../utils/helper'

export default {
  signIn (data) {
    return authorizationApi.post('/admin/signin', data)
  },
  logOut () {
    return authorizationApi.post('/logout')
  },
  checkLogin () {
    return authorizationApi.post('/api/user/check')
  }
}
