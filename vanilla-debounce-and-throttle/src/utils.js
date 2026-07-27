// debounce means wait for events to relax for delay ms and then fire
// immediate = false => relax for delay ms and then fire
// immediate = true => fire and then relax for delay ms

export function debounce(fn, delay, immediate = false) {
  let lastTimeoutId;
  let active = false;
  function debouncedFn(...args) {
    if (immediate && !active) {
      fn(...args);
      active = true;
    }
    clearTimeout(lastTimeoutId);
    lastTimeoutId = setTimeout(() => {
      active = false;
      if (!immediate) fn(...args);
    }, delay);
  }
  return debouncedFn;
}

// throttle means waiting for a cooldown and then firing
// no trailing: fire only the first event in that window
// trailing: also fire the last event in that window (in addition to the first)
export function throttle(fn, delay, trailing = false) {
  let active = false;
  let recentArgs;

  function throttledFn(...args) {
    recentArgs = args;
    // window starts being active
    if (active) return;
    fn(...args);
    active = true;

    setTimeout(() => {
        // window stops being active
        active = false;
        if (trailing) {
            fn(...recentArgs)
        }
    }, delay)

  }
  return throttledFn;
}
