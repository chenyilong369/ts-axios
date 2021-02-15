import axios from '../../src'

// axios({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hi'
//   }
// })
//
// axios.request({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hi'
//   }
// })
//
// axios.get('/extend/get')
//
// axios.options('/extend/options')
//
// axios.head('/extend/head')
//
// axios.delete('/extend/delete')
//
// axios.post('/extend/post', {msg: 'chen'})
//
// axios.put('/extend/put', {msg: 'yi'})
//
// axios.patch('/extend/patch', {msg: 'long'})

// axios({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hi'
//   }
// })
//
// axios('/extend/post', {
//   method: 'post',
//   data: {
//     msg: 'hello'
//   }
// })

interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}

interface User {
  name: string
  age: number
}

function getUser<T>() {
  return axios<ResponseData<T>>('/extend/user')
    .then(res => res.data)
    .catch(e => console.error(e))
}

async function test() {
  const user = await getUser<User>()
  if(user) {
    console.log(user.result.name)
  }
}

test()

