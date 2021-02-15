import { AxiosRequestConfig } from './type'
import { processHeader } from './helper/headers'
import { transfromRequest, transfromResponse } from './helper/data'

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  header: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },

  xsrfCookieName: 'XSRF-TOKEN',
  xsrHeaderName: 'X-XSRF-TOKEN',
  // 默认配置

  transformRequest: [
    function(data: any, header: any): any {
      processHeader(header, data)
      return transfromRequest(data)
    }
  ],

  transformResponse: [
    function(data: any): any {
      return transfromResponse(data)
    }
  ]
}

const methodsNotData = ['delete', 'get', 'head', 'options']

methodsNotData.forEach(method => {
  defaults.header[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']

methodsWithData.forEach(method => {
  defaults.header[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
