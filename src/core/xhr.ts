/*
 * @Author: your name
 * @Date: 2020-07-07 09:31:46
 * @LastEditTime: 2020-08-07 22:40:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ts-axios\src\xhr.ts
 */
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './type'
import { parseHeaders } from './helper/headers'
import { createError } from './helper/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', header = {}, responseType, timeout } = config
    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    request.open(method.toLocaleUpperCase(), url, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 0) {
        return
      }

      const responseHeader = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeader,
        config,
        request
      }
      // @ts-ignore
      handleResponse(response)
    }

    // Todo 网络错误
    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }

    // Todo 超时错误
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'E CONNECTED', request))
    }

    Object.keys(header).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete header[name]
      } else {
        request.setRequestHeader(name, header[name])
      }
    })

    request.send(data)

    // Todo 非200状态码错误
    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        // @ts-ignore
        resolve(response)
      } else {
        reject(createError('Request failed with status code', config, null, request, response))
      }
    }
  })
}
