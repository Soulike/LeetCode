/*
 * @lc app=leetcode id=1675 lang=javascript
 *
 * [1675] Minimize Deviation in Array
 */

// @lc code=start
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
 * @param {number[]} nums
 * @return {number}
 */
var minimumDeviation = function (nums) {
  const N = nums.length;
  let minNum = Infinity;

  for (let i = 0; i < N; i++) {
    if (isOdd(nums[i])) {
      nums[i] *= 2;
    }
    minNum = Math.min(minNum, nums[i]);
  }

  const maxHeap = new Heap((a, b) => b - a, nums);

  let minDiff = Infinity;
  let maxNum = maxHeap.getRoot();
  maxHeap.deleteRoot();
  minDiff = Math.min(minDiff, maxNum - minNum);

  while (isEven(maxNum)) {
    const newNum = maxNum / 2;
    minNum = Math.min(newNum, minNum);
    maxHeap.addOne(newNum);

    maxNum = maxHeap.getRoot();
    maxHeap.deleteRoot();
    minDiff = Math.min(minDiff, maxNum - minNum);
  }

  return minDiff;
};

/**
 * @param {number} number
 * @returns {boolean}
 */
function isEven(number) {
  return (number & 0b1) === 0;
}

/**
 * @param {number} number
 * @returns {boolean}
 */
function isOdd(number) {
  return !isEven(number);
}
// @lc code=end
