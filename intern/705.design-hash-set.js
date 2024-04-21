/*
 * @lc app=leetcode id=705 lang=javascript
 *
 * [705] Design HashSet
 */

// @lc code=start
class LinkedListNode {
  /** @type {number} */
  value;
  /** @type {LinkedListNode|null} */
  next;

  /** @param {number} value */
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class MyHashSet {
  /** @type {LinkedListNode[]} */
  #container;
  static #MOD = 1009;

  constructor() {
    this.#container = new Array(MyHashSet.#MOD);

    for (let i = 0; i < MyHashSet.#MOD; i++) {
      this.#container[i] = new LinkedListNode(Infinity);
    }
  }

  /**
   * @param {number} key
   * @return {void}
   */
  add(key) {
    if (!this.contains(key)) {
      const head = this.#container[key % MyHashSet.#MOD];
      const next = head.next;

      const newNode = new LinkedListNode(key);
      head.next = newNode;
      newNode.next = next;
    }
  }

  /**
   * @param {number} key
   * @return {void}
   */
  remove(key) {
    const removedNodeInfo = this.#getKeyNode(key);
    if (removedNodeInfo !== null) {
      const [prevNode, removedNode] = removedNodeInfo;
      const next = removedNode.next;

      prevNode.next = next;
    }
  }

  /**
   * @param {number} key
   * @return {boolean}
   */
  contains(key) {
    return this.#getKeyNode(key) !== null;
  }

  /**
   * @param {number} key
   * @return {[LinkedListNode,LinkedListNode]|null} - [prev, wantedNode]
   */
  #getKeyNode(key) {
    const head = this.#container[key % MyHashSet.#MOD];

    let prevNode = head;
    /** @type {LinkedListNode|null} */
    let currentNode = head.next;
    while (currentNode !== null) {
      if (currentNode.value === key) {
        return [prevNode, currentNode];
      } else {
        prevNode = currentNode;
        currentNode = currentNode.next;
      }
    }

    return null;
  }
}

/**
 * Your MyHashSet object will be instantiated and called as such:
 * var obj = new MyHashSet()
 * obj.add(key)
 * obj.remove(key)
 * var param_3 = obj.contains(key)
 */
// @lc code=end
