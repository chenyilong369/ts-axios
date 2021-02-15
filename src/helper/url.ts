/*
 * @Author: your name
 * @Date: 2020-08-06 09:01:30
 * @LastEditTime: 2020-08-06 10:05:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ts-axios\src\helper\url.ts
 */
import { isDate, isObject } from './util'

function encode(url: string): string {
  return encodeURIComponent(url)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function BuildUrl(url: string, param?: any): string {
  if (!param) return url

  const posts: string[] = []
  Object.keys(param).forEach(key => {
    const val = param[key]
    if (val === null && typeof val === 'undefined') {
      return
    }
    let value = []
    if (Array.isArray(val)) {
      value = val
      key += '[]'
    } else {
      value = [val]
    }

    value.forEach(v => {
      if (isDate(v)) {
        v = v.toISOString
      } else if (isObject(v)) {
        v = JSON.stringify(v)
      }
      posts.push(`${encode(key)}=${encode(v)}`)
    })
  })

  let serializedParams = posts.join('&')
  if (serializedParams) {
    let hashIndex = url.indexOf('#')
    if (hashIndex !== -1) {
      url = url.slice(0, hashIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
