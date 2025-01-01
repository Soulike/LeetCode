/*
 * @lc app=leetcode id=743 lang=javascript
 *
 * [743] Network Delay Time
 */

// @lc code=start
class Graph {
  /**
   * @type {Map<`${number}-${number}`, number>}
   */
  #edgeToDelay;
  /**
   * @type {Map<number, number[]>}
   */
  #tos;

  /**
   * @param {[number, number, number][]} times
   */
  constructor(n, times) {
    this.#edgeToDelay = new Map();
    this.#tos = new Map();
    for (let i = 1; i <= n; i++) {
      this.#tos.set(i, []);
    }
    for (let i = 0; i < times.length; i++) {
      const [from, to, delay] = times[i];
      this.#edgeToDelay.set(`${from}-${to}`, delay);

      this.#tos.get(from).push(to);
    }
  }

  getDelay(from, to) {
    return this.#edgeToDelay.get(`${from}-${to}`) ?? Number.POSITIVE_INFINITY;
  }

  getTos(from) {
    return this.#tos.get(from);
  }
}

class Heap {
  treeNodes;
  compareFunction;

  /**
   * @param compareFunction - 比较函数。如果返回值小于 0，则 a 在 b 前面，大于 0 则相反
   */
  constructor(compareFunction, elements) {
    this.treeNodes = [];
    this.compareFunction = compareFunction;
    if (elements !== undefined) {
      this.add(...elements);
    }
  }

  add(...elements) {
    for (const element of elements) {
      this.addOne(element);
    }
  }

  /**
   * 给堆添加一个元素。
   * 先将元素放到堆末尾，再和父结点比较。如果不符合顺序，就交换它们，直到子结点与父结点符合顺序或没有父结点。
   */
  addOne(element) {
    let elementIndex = this.treeNodes.length;
    let parentIndex = Heap.getParentIndex(elementIndex);
    this.treeNodes.push(element);

    while (
      elementIndex > 0 &&
      this.compareFunction(
        this.treeNodes[elementIndex],
        this.treeNodes[parentIndex],
      ) < 0
    ) {
      Heap.swap(this.treeNodes, elementIndex, parentIndex);
      elementIndex = parentIndex;
      parentIndex = Heap.getParentIndex(elementIndex);
    }
  }

  /**
   * @throws {RangeError}
   * */
  getRoot() {
    if (this.treeNodes.length === 0) {
      throw new RangeError('Heap has no element');
    } else {
      return this.treeNodes[0];
    }
  }

  /**
   * 删除堆顶。
   * 先将堆顶与最后一个元素交换，然后删除最后一个元素。
   * 然后，从堆顶开始，比较父结点与左右子结点。如果子结点的最小值与父结点不符合顺序要求，交换它们，直到符合顺序要求
   * @throws {RangeError}
   * */
  deleteRoot() {
    if (this.treeNodes.length === 0) {
      throw new RangeError('Heap has no element');
    } else {
      const lastIndex = this.treeNodes.length - 1;
      Heap.swap(this.treeNodes, 0, lastIndex);
      this.treeNodes.length--;

      let elementIndex = 0;
      let minChildIndex = this.getMinChildIndex(elementIndex);
      if (minChildIndex === -1) {
        return;
      }

      while (
        this.compareFunction(
          this.treeNodes[minChildIndex],
          this.treeNodes[elementIndex],
        ) < 0
      ) {
        Heap.swap(this.treeNodes, elementIndex, minChildIndex);
        elementIndex = minChildIndex;

        minChildIndex = this.getMinChildIndex(elementIndex);
        if (minChildIndex === -1) {
          break;
        }
      }
    }
  }

  /**
   * 获取当前结点值靠前的子结点，如果不存在子结点，返回 -1
   */
  getMinChildIndex(elementIndex) {
    const LENGTH = this.treeNodes.length;
    let leftChildIndex = Heap.getLeftChildIndex(elementIndex);
    let rightChildIndex = Heap.getRightChildIndex(elementIndex);

    let minChildIndex;

    if (leftChildIndex < LENGTH && rightChildIndex < LENGTH) {
      minChildIndex =
        this.compareFunction(
          this.treeNodes[leftChildIndex],
          this.treeNodes[rightChildIndex],
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

  getSize() {
    return this.treeNodes.length;
  }

  static getLeftChildIndex(rootIndex) {
    return 2 * rootIndex + 1;
  }

  static getRightChildIndex(rootIndex) {
    return 2 * rootIndex + 2;
  }

  static getParentIndex(childIndex) {
    if (childIndex % 2) {
      // odd
      return (childIndex - 1) / 2;
    } // even
    else {
      return (childIndex - 2) / 2;
    }
  }

  static swap(array, index1, index2) {
    [array[index1], array[index2]] = [array[index2], array[index1]];
  }
}

/**
 * @param {[number,number,number][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function (times, n, k) {
  const graph = new Graph(n, times);
  const minDelays = new Array(n + 1);
  minDelays.fill(Number.POSITIVE_INFINITY);
  minDelays[k] = 0;
  minDelays[0] = -1; // 不存在的结点

  const heap = new Heap((a, b) => a[1] - b[1], [[k, 0]]);

  while (heap.getSize() > 0) {
    // 得到已处理结点中延迟最小的
    const [from, fromDelay] = heap.getRoot();
    heap.deleteRoot();

    // 延迟被更新过，放弃
    if (fromDelay > minDelays[from]) {
      continue;
    }

    // 更新邻接结点的延迟
    const tos = graph.getTos(from);
    for (const to of tos) {
      const newDelay = fromDelay + graph.getDelay(from, to);
      // 发生更新，把被更新结点推进堆中
      if (newDelay < minDelays[to]) {
        minDelays[to] = newDelay;
        heap.addOne([to, newDelay]);
      }
    }
  }

  const maxDelay = Math.max(...minDelays);
  return maxDelay === Number.POSITIVE_INFINITY ? -1 : maxDelay;
};
// @lc code=end
