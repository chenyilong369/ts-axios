/*
 * @Author: your name
 * @Date: 2020-08-06 09:01:38
 * @LastEditTime: 2020-08-06 10:06:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ts-axios\src\helper\util.ts
 */
const ToString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return ToString.call(val) === '[object Date]'
}

export function isObject(val: any): val is object {
  return val !== null && typeof val === 'object'
}
