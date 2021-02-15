import { AxiosTransformer } from '../type'

export default function transform(
  data: any,
  header: any,
  fns?: AxiosTransformer | AxiosTransformer[]
): any {
  if (!fns) {
    return data
  }

  if (!Array.isArray(fns)) {
    fns = [fns]
  }

  fns.forEach(fn => {
    // 链式调用
    data = fn(data, header)
  })
  return data
}
