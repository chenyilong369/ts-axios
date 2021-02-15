import axios from '../../src/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// document.cookie = 'a=b'
//
// axios.get('/more/get').then((res) => {
//   console.log(res)
// })
//
// axios.post('http://127.0.0.1:8088/more/server2',{}, {
//   withCredentials: true
// }).then(res => {
//   console.log(res)
// })


// const instance = axios.create({
//   xsrHeaderName: 'X-XSRF-TOKEN-D',
//   xsrfCookieName: 'XSRF-TOKEN-D'
// })
//
// instance.get('/more/get').then(res => {
//   console.log(res)
// })

const instance = axios.create()

function calculatePercentage(loaded: number, total: number) {
  return Math.floor(loaded) / total
}

function loadProgressBar() {
  const setupProgress = () => {
    instance.interceptors.request.use(config => {
      NProgress.start()
      return config
    })
  }

  const setupUpdateProgress = () => {
    const update = (e: ProgressEvent) => {
      console.log(e)
      NProgress.set(calculatePercentage(e.loaded, e.total))
    }
    instance.defaults.onDownloadProgress = update
    instance.defaults.onUploadProgress = update
  }

  const setupStopProgress = () => {
    instance.interceptors.response.use(response => {
      NProgress.done()
      return response
    }, error => {
      NProgress.done()
      return Promise.reject(error)
    })
  }

  setupProgress()
  setupUpdateProgress()
  setupStopProgress()
}

loadProgressBar()

const downloadEl = document.getElementById('download')

downloadEl!.addEventListener('click', e => {
  instance.get('http://p.xiaomingming.org/FileUpload/20207139381013884.jpg')
})

const uploadEl = document.getElementById('upload')

uploadEl!.addEventListener('click', e => {
  const data = new FormData()
  const fileEl = document.getElementById('file') as HTMLInputElement
  if(fileEl.files) {
    data.append('file', fileEl.files[0])
    instance.post('/more/upload', data)
  }
})
