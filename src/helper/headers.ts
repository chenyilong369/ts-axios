/*
 * @Author: your name
 * @Date: 2020-08-06 09:01:56
 * @LastEditTime: 2020-08-07 22:37:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ts-axios\src\helper\headers.ts
 */
import { deepMerge, isPlainObject } from './util'
import { Method } from '../type'

function normalizeContent(headers: any, normalize: string): void {
  if (!headers) return
  Object.keys(headers).forEach(name => {
    if (name !== normalize && name.toUpperCase() === normalize.toUpperCase()) {
      headers[normalize] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeader(headers: any, data: any): any {
  normalizeContent(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json; charset=utf-8'
    }
  }

  return headers
}

export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return
  }
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })
  return parsed
}

// 合并header(j降级)， 提取内部信息
export function flatterMethods(header: any, method: Method): any {
  if (!header) {
    return header
  }

  header = deepMerge(header.common, header[method], header)

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']

  methodsToDelete.forEach(method => {
    delete header[method]
  })

  return header
}
