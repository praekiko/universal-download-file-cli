class StreamMock {
  constructor() {
    this.events = {}
  }

  on(event, func) {
    this.events[event] = func
    return this
  }

  pipe(file) {
    return this
  }

  emit(event, err) {
    this.events[event](err)
  }
}

export default StreamMock
