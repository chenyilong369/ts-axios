/*
 * @Author: your name
 * @Date: 2020-07-07 08:29:19
 * @LastEditTime: 2020-08-07 23:39:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ts-axios\src\index.ts
 */
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../type'
import xhr from './xhr'
import { BuildUrl } from '../helper/url'
import { transfromRequest, transfromResponse } from '../helper/data'
import { flatterMethods, processHeader } from '../helper/headers'
import transform from './transform'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(res => {
    return transfromResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transFrom(config)
  config.data = transform(config.data, config.header, config.transformRequest)
  // 提取header
  config.header = flatterMethods(config.header, config.method!)
}

function transFrom(config: AxiosRequestConfig): string {
  const { url, params } = config
  return BuildUrl(url!, params)
}

// function transfromData(config: AxiosRequestConfig): any {
//   return transfromRequest(config.data)
// }
//
// function transFromHeader(config: AxiosRequestConfig): any {
//   const {header = {}, data} = config
//   return processHeader(header, data)
// }

function transfromResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
