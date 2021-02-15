/*
 * @Author: your name
 * @Date: 2020-08-06 09:01:23
 * @LastEditTime: 2020-08-07 23:38:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ts-axios\src\helper\data.ts
 */
import { isPlainObject } from './util'

export function transfromRequest(data: any): any {
  if (isPlainObject(data)) {
    data = JSON.stringify(data)
  }
  return data
}

export function transfromResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do noting
    }
  }
  return data
}
