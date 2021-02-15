import axios from '../../src/index'


axios.defaults.header.common['test2'] = 123

axios({
  url: '/config/post',
  method: 'post',
  data: JSON.stringify({
    a: 1
  }),
  header:{
    test: '321'
  }
}).then((res) => {
  console.log(res.data)
})
