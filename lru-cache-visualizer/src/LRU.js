class LRU {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(k) {
    if (this.cache.has(k)) {
      const val = this.cache.get(k);
      this.put(k, val);
      return val;
    }
    return -1;
  }

  put(k, v) {
    if (this.cache.has(k)) {
      this.cache.delete(k);
    }

    if (this.cache.size === this.capacity) {
      const keys = [...this.cache.keys()];
      const lruKey = keys[0];
      this.cache.delete(lruKey);
    }

    this.cache.set(k, v);
  }

  getEntries() {
    if (this.cache.size === 0) {
      return [];
    }

    return [...this.cache.entries()];
  }
}

export default LRU;
