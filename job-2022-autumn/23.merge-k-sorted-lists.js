/*
 * @lc app=leetcode id=23 lang=javascript
 *
 * [23] Merge k Sorted Lists
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @template T
 */
class Heap {
  /** @type {T[]} */
  #treeNodes;
  /** @type {(a:T, b:T) => number} */
  #compareFunction;

  /**
   * @param {(a:T, b:T) => number} compareFunction
   * @param {T[]} elements
   */
  constructor(compareFunction, elements = []) {
    this.#treeNodes = [...elements];
    this.#compareFunction = compareFunction;
    this.#makeHeap();
  }

  #makeHeap() {
    const n = this.#treeNodes.length;
    for (let i = n - 1; i >= 1; i--) {
      const parentIndex = Heap.#getParentIndex(i);
      if (
        this.#compareFunction(
          this.#treeNodes[parentIndex],
          this.#treeNodes[i],
        ) > 0
      ) {
        [this.#treeNodes[parentIndex], this.#treeNodes[i]] = [
          this.#treeNodes[i],
          this.#treeNodes[parentIndex],
        ];
      }
    }
  }

  /**
   * @param  {T[]} elements
   * @returns {void}
   */
  add(...elements) {
    for (const element of elements) {
      this.addOne(element);
    }
  }

  /**
   * @param {T} element
   * @returns {void}
   */
  addOne(element) {
    let elementIndex = this.#treeNodes.length;
    let parentIndex = Heap.#getParentIndex(elementIndex);
    this.#treeNodes.push(element);

    while (
      elementIndex > 0 &&
      this.#compareFunction(
        this.#treeNodes[elementIndex],
        this.#treeNodes[parentIndex],
      ) < 0
    ) {
      Heap.#swap(this.#treeNodes, elementIndex, parentIndex);
      elementIndex = parentIndex;
      parentIndex = Heap.#getParentIndex(elementIndex);
    }
  }

  /**
   * @throws {RangeError}
   * @returns {T}
   * */
  getRoot() {
    if (this.#treeNodes.length === 0) {
      throw new RangeError('Heap has no element');
    } else {
      return this.#treeNodes[0];
    }
  }

  /**
   * @throws {RangeError}
   * @returns {void}
   * */
  deleteRoot() {
    if (this.#treeNodes.length === 0) {
      throw new RangeError('Heap has no element');
    } else {
      const lastIndex = this.#treeNodes.length - 1;
      Heap.#swap(this.#treeNodes, 0, lastIndex);
      this.#treeNodes.length--;

      let elementIndex = 0;
      let minChildIndex = this.#getMinChildIndex(elementIndex);
      if (minChildIndex === -1) {
        return;
      }

      while (
        this.#compareFunction(
          this.#treeNodes[minChildIndex],
          this.#treeNodes[elementIndex],
        ) < 0
      ) {
        Heap.#swap(this.#treeNodes, elementIndex, minChildIndex);
        elementIndex = minChildIndex;

        minChildIndex = this.#getMinChildIndex(elementIndex);
        if (minChildIndex === -1) {
          break;
        }
      }
    }
  }

  /**
   * Get the smaller child
   * @param {number} elementIndex
   * @returns {number} -1 if no child
   */
  #getMinChildIndex(elementIndex) {
    const LENGTH = this.#treeNodes.length;
    let leftChildIndex = Heap.#getLeftChildIndex(elementIndex);
    let rightChildIndex = Heap.#getRightChildIndex(elementIndex);

    let minChildIndex;

    if (leftChildIndex < LENGTH && rightChildIndex < LENGTH) {
      minChildIndex =
        this.#compareFunction(
          this.#treeNodes[leftChildIndex],
          this.#treeNodes[rightChildIndex],
        ) < 0
          ? leftChildIndex
          : rightChildIndex;
    } else if (leftChildIndex < LENGTH) {
      minChildIndex = leftChildIndex;
    } else if (rightChildIndex < LENGTH) {
      minChildIndex = rightChildIndex;
    } else {
      minChildIndex = -1;
    }
    return minChildIndex;
  }

  /**
   * @returns {number}
   */
  getSize() {
    return this.#treeNodes.length;
  }

  /**
   * @param {number} rootIndex
   * @returns {number}
   */
  static #getLeftChildIndex(rootIndex) {
    return 2 * rootIndex + 1;
  }

  /**
   * @param {number} rootIndex
   * @returns {number}
   */
  static #getRightChildIndex(rootIndex) {
    return 2 * rootIndex + 2;
  }

  /**
   * @param {number} childIndex
   * @returns {number}
   */
  static #getParentIndex(childIndex) {
    if (childIndex % 2) {
      // odd
      return (childIndex - 1) / 2;
    } // even
    else {
      return (childIndex - 2) / 2;
    }
  }

  /**
   * @param {unknown[]} array
   * @param {number} index1
   * @param {number} index2
   * @returns {void}
   */
  static #swap(array, index1, index2) {
    [array[index1], array[index2]] = [array[index2], array[index1]];
  }
}

/**
 * @param {ListNode[]} lists
 * @return {ListNode | null}
 */
var mergeKLists = function (lists) {
  /** @type {Heap<ListNode>} */
  const minHeap = new Heap((a, b) => a.val - b.val);

  for (const node of lists) {
    if (node !== null) {
      minHeap.addOne(node);
    }
  }

  const fakeHead = new ListNode(-1, null);
  let tail = fakeHead;

  while (minHeap.getSize() > 0) {
    const node = minHeap.getRoot();
    minHeap.deleteRoot();
    if (node.next !== null) {
      minHeap.addOne(node.next);
    }

    tail.next = node;
    tail = node;
  }

  return fakeHead.next;
};
// @lc code=end
