var splitArray = (arr, size) => {
  var arr2 = arr.slice(0);
  var arrays = [];

  while (arr2.length > 0) {
    arrays.push(arr2.splice(0, size));
  }

  return arrays;
};

export class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(event, listener) {
    if (typeof this.events[event] !== "object") {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }
  removeListener(event, listener) {
    var idx;
    if (typeof this.events[event] === "object") {
      idx = (this.events[event] || []).indexOf(listener);
      if (idx > -1) {
        this.events[event].splice(idx, 1);
      }
    }
  }
  emit(event, ...args) {
    var i, listeners, length;
    if (typeof this.events[event] === "object") {
      listeners = this.events[event].slice();
      length = listeners.length;
      if (length > 100) {
        splitArray(listeners, 50).forEach((subListeners) => {
          setTimeout(() => {
            for (i = 0; i < subListeners.length; i++) {
              Reflect.apply(subListeners[i], this, args);
            }
          }, 0);
        });
      } else {
        setTimeout(() => {
          for (i = 0; i < length; i++) {
            Reflect.apply(listeners[i], this, args);
          }
        }, 0);
      }
    }
  }
  once(event, listener, ...args) {
    this.on(event, function g() {
      this.removeListener(event, g);
      Reflect.apply(listener, this, args);
    });
  }
}

export function modifyColumnId(columnId) {
  return `step${columnId
    .split(" ")
    .join("")
    .replace(/[^a-zA-Z0-9_-]/gi, "_")}step`;
}
