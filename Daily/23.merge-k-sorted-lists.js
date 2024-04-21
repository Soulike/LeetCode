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
  constructor(compareFunction, elements) {
    this.#treeNodes = [];
    this.#compareFunction = compareFunction;
    if (elements !== undefined) {
      this.add(...elements);
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
  /**
   * @param {number} left
   * @param {number} right
   * @returns {ListNode|null}
   */
  const mergeLists = (left, right) => {
    if (left === right) return lists[left];

    const mid = left + Math.floor((right - left) / 2);

    const list1 = mergeLists(left, mid);
    const list2 = mergeLists(mid + 1, right);

    return merge2Lists(list1, list2);
  };

  if (lists.length === 0) return null;

  return mergeLists(0, lists.length - 1);
};

/**
 *
 * @param {ListNode|null} list1
 * @param {ListNode|null} list2
 */
function merge2Lists(list1, list2) {
  if (list1 === null || list2 === null || list1 === list2) {
    return list1 === null ? list2 : list1;
  }

  let newListFakeHead = new ListNode(-1, null);
  let newListTail = newListFakeHead;

  /** @type {ListNode|null} */
  let list1Node = list1;
  /** @type {ListNode|null} */
  let list2Node = list2;

  while (list1Node !== null && list2Node !== null) {
    if (list1Node.val < list2Node.val) {
      newListTail.next = list1Node;
      list1Node = list1Node.next;
    } else {
      newListTail.next = list2Node;
      list2Node = list2Node.next;
    }
    newListTail = newListTail.next;
    newListTail.next = null;
  }

  if (list1Node === null) {
    newListTail.next = list2Node;
  } else {
    newListTail.next = list1Node;
  }

  return newListFakeHead.next;
}
// @lc code=end
