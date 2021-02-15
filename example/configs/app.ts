import axios, { AxiosTransformer } from '../../src/index'
import qs from 'qs'

axios.defaults.header.common['test2'] = 123

// axios({
//   url: '/configs/post',
//   method: 'post',
//   data: qs.stringify({
//     a: 1
//   }),
//   header:{
//     test: '321'
//   }
// }).then((res) => {
//   console.log(res.data)
// })

// axios({
//   transformRequest: [(
//     function(data) {
//       return qs.stringify(data)
//     }
//   ), ...(axios.defaults.transformRequest as AxiosTransformer[])],
//
//   transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]),
//     function(data) {
//       if (typeof data === 'object') {
//         data.b = 2
//       }
//       return data
//     }],
//
//   url: '/configs/post',
//   method: 'post',
//   data: {
//     a: 1
//   }
// }).then((res) => {
//   console.log(res.data)
// })

// create静态接口
const instance = axios.create({
  transformRequest: [(function(data) {
    return qs.stringify(data)
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],

  transformResponse: [
    ...(axios.defaults.transformResponse as AxiosTransformer[]),
    function(data) {
      if (typeof data === 'object') {
        data.b = 2
      }
      return data
    }
  ]
})

instance({
  url: '/configs/post',
  method: 'post',
  data: {
    a: 1
  }
}).then(res => {
  console.log(res.data)
})
