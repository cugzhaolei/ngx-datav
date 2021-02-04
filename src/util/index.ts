export function randomExtend(minNum: number, maxNum: number) {
  if (arguments.length === 1) {
    return parseInt((Math.random() * minNum + 1).toString(), 10)
  } else {
    return parseInt((Math.random() * (maxNum - minNum + 1) + minNum).toString(), 10)
  }
}

/**
 * 防抖(ts)
 */
class Debounced {
  /**
   * @param func 需要包装的函数
   * @param delay 延迟时间，单位ms
   * @param immediate 是否默认执行一次(第一次不延迟)
   */
  public use = (func: Function, delay: number, immediate: boolean = false): Function => {
    let timer: any | undefined
    return ( ...args: any) => {
      if (immediate) {
        func.apply(this, args) // 确保引用函数的指向正确，并且函数的参数也不变
        immediate = false
        return
      }
      clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  }
}

/**
 * 节流(ts)
 */
export class Throttle {
  private timer: any | undefined
  private stop: boolean = false
  private death: boolean = false
  /**
   * @param func 需要包装的函数
   * @param delay 延迟时间，单位ms
   * @param immediate 是否默认执行一次(第一次不延迟)
   */
  public use (func: Function, delay: number, immediate: boolean = false): Function {
    let flag = true
    const self = this
    return (...args: any) => {
      if (this.death) {
        func.apply(this, args)
        return
      }
      if (this.stop) {
        func.apply(this, args)
        return
      }
      if (immediate) {
        func.apply(this, args)
        immediate = false
        return
      }
      if (!flag) {
        return
      }
      flag = false
      self.timer = setTimeout(() => {
        func.apply(this, args)
        flag = true
      }, delay)
    }
  }

  // 销毁
  public destroy() {
    this.death = true
    this.stop = true
    if (!!this.timer) {
      clearTimeout(this.timer)
      this.timer = undefined
    }
  }
  // 开启
  public open() {
    if (!this.death) {
      this.stop = false
    }
  }
  // 关闭
  public close() {
    this.stop = true
  }
}


export function observerDomResize(dom: Node, callback: MutationCallback) {
  const MutationObserver = window.MutationObserver ; // || window?.WebKitMutationObserver || window?.MozMutationObserver

  const observer = new MutationObserver(callback)

  observer.observe(dom, { attributes: true, attributeFilter: ['style'], attributeOldValue: true })

  return observer
}

export function getPointDistance(pointOne: number[], pointTwo: number[]) {
  const minusX = Math.abs(pointOne[0] - pointTwo[0])

  const minusY = Math.abs(pointOne[1] - pointTwo[1])

  return Math.sqrt(minusX * minusX + minusY * minusY)
}

export function uuid(hasHyphen: any) {
  return (hasHyphen ? 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' : 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx').replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0
    const v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// throttle debounce 函数的使用方法
//   private count: number = 1
//   private debouncedUse: Function = new Debounced().use(this.request, 1000)
//   private throttle = new Throttle()
//   private throttleUse: Function = this.throttle.use(this.request, 1000)

//   private request(params: any) {
//     console.log('this的指向', this);
//     console.log('参数', params);
//     console.log(this.count++)
//   }
//   // 防抖调用
//   private handelClickByDebounced() {
//     this.debouncedUse(123)
//   }
//   // 节流调用
//   private handelClickByThrottle() {
//     this.throttleUse('截流函数')
//   }
//   // 停止 | 开启节流函数
//   private changeStopThrottle(action: boolean) {
//     action ? this.throttle.open() : this.throttle.close()
//   }
//   // 销毁节流函数
//   private destroyThrottle() {
//     this.throttle.destroy()
//   }
