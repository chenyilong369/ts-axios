/*
 * @Author: your name
 * @Date: 2020-08-06 01:20:13
 * @LastEditTime: 2020-08-06 01:47:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ts-axios\example\simple\app.ts
 */
import axios from '../../src/index'

axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
})
