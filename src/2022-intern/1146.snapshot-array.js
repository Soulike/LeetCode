/*
 * @lc app=leetcode id=1146 lang=javascript
 *
 * [1146] Snapshot Array
 */

// @lc code=start

class SnapshotArray {
  /** @type {Map<number, Map<number, number>>} */
  #store;
  /** @type {number} */
  #lastSnapId;

  static noSnappedId = -1;

  /**
   * @param {number} length
   */
  constructor(length) {
    this.#store = new Map();
    this.#lastSnapId = -1;
  }

  /**
   * @param {number} index
   * @param {number} val
   * @return {void}
   */
  set(index, val) {
    let snapIdToValues = this.#store.get(index);
    if (snapIdToValues === undefined) {
      snapIdToValues = new Map();
      this.#store.set(index, snapIdToValues);
    }
    snapIdToValues.set(SnapshotArray.noSnappedId, val);
  }

  /**
   * @return {number}
   */
  snap() {
    const snapId = ++this.#lastSnapId;
    for (const [, snapIdToValues] of this.#store) {
      if (snapIdToValues !== undefined) {
        const lastValue = snapIdToValues.get(SnapshotArray.noSnappedId);
        snapIdToValues.set(snapId, lastValue);
      }
    }
    return snapId;
  }

  /**
   * @param {number} index
   * @param {number} snap_id
   * @return {number}
   */
  get(index, snap_id) {
    const snapIdToValues = this.#store.get(index);
    if (snapIdToValues === undefined) {
      return 0;
    } else {
      // 在某一次 snapshot 的时候还没有被设置过值，于是是 0
      return snapIdToValues.get(snap_id) ?? 0;
    }
  }
}

/**
 * Your SnapshotArray object will be instantiated and called as such:
 * var obj = new SnapshotArray(length)
 * obj.set(index,val)
 * var param_2 = obj.snap()
 * var param_3 = obj.get(index,snap_id)
 */
// @lc code=end
