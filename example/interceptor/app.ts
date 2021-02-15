import axios from '../../src/index'

axios.interceptors.request.use(config => {
  config.header.test += '1'
  return config
})

axios.interceptors.request.use(config => {
  config.header.test += '2'
  return config
})

axios.interceptors.request.use(config => {
  config.header.test += '3'
  return config
})

axios.interceptors.response.use(res => {
  res.data += '1'
  return res
})

let interceptor = axios.interceptors.response.use(res => {
  res.data += '2'
  return res
})

axios.interceptors.response.eject(interceptor)

axios.interceptors.response.use(res => {
  res.data += '3'
  return res
})



axios({
  url: '/interceptor/get',
  method: 'get',
  header: {
    test: ''
  }
}).then((res) => {
  console.log(res.data)
})
