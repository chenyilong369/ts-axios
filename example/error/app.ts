import axios, {AxiosError} from '../../src'

axios({
  method: 'get',
  url: '/error/gets'
}).then(res => {
  console.log(res)
}).catch(e => {
  console.log(e)
})

axios({
  method: 'get',
  url: '/error/get'
}).then(res => {
  console.log(res)
}).catch(e => {
  console.log(e)
})

setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  }).then(res => {
    console.log(res)
  }).catch(e => {
    console.log(e)
  })
}, 5000)

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then((res: any) => {
  console.log(res)
}).catch((e:AxiosError)  => {
  console.log(e.message)
  console.log(e.config)
  console.log(e.request)
  console.log(e.response)
  console.log(e.isAxiosError)
  console.log(e.code)
})
