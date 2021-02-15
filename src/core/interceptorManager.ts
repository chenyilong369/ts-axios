import { ResolvedFn, RejectedFn } from '../type'

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

// 拦截器实现
export default class InterceptorManager<T> {
  private Interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.Interceptors = []
  }

  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.Interceptors.push({
      resolved,
      rejected
    })
    return this.Interceptors.length - 1
  }

  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.Interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }

  eject(id: number): void {
    if (this.Interceptors[id]) {
      // @ts-ignore
      this.Interceptors[id] = null
    }
  }
}
