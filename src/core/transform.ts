import { AxiosTransformer } from '../type'

export default function transfrom(
  data: any,
  header: any,
  fns?: AxiosTransformer[] | AxiosTransformer
): any {
  if (!fns) {
    return data
  }

  if (Array.isArray(fns)) {
    // @ts-ignore
    fns = [fns]
  }
  // @ts-ignore
  fns.forEach(fn => {
    // 链式调用
    data = fn(data, header)
  })
  return data
}
