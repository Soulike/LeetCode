/*
 * @lc app=leetcode id=743 lang=javascript
 *
 * [743] Network Delay Time
 */

// @lc code=start
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
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function (times, n, k) {
  /** @type {[to: number, dist: number][][]} */
  const graph = new Array(n + 1);
  for (let i = 0; i <= n; i++) {
    graph[i] = [];
  }

  for (const [from, to, dist] of times) {
    graph[from].push([to, dist]);
  }

  const minDelays = dijkstra(k, graph);

  let maxInMinDelays = 0;

  for (let i = 1; i <= n; i++) {
    if (minDelays[i] === Infinity) {
      return -1;
    }
    maxInMinDelays = Math.max(maxInMinDelays, minDelays[i]);
  }

  return maxInMinDelays;
};

class State {
  index;
  distFromStart;

  /**
   * @param {number} index
   * @param {number} distFromStart
   */
  constructor(index, distFromStart) {
    this.index = index;
    this.distFromStart = distFromStart;
  }
}

/**
 *
 * @param {number} start
 * @param {[to: number, dist: number][][]} graph
 * @returns {number[]}
 */
function dijkstra(start, graph) {
  const n = graph.length;
  /** @type {number[]} */
  const distFromStart = new Array(n);
  distFromStart.fill(Infinity);
  distFromStart[start] = 0;

  const startState = new State(start, 0);

  const minHeap = new Heap(
    (a, b) => a.distFromStart - b.distFromStart,
    [startState],
  );

  while (minHeap.getSize() > 0) {
    const {index, distFromStart: rootDistFromStart} = minHeap.getRoot();
    minHeap.deleteRoot();

    if (rootDistFromStart > distFromStart[index]) {
      continue;
    }

    const edges = graph[index];

    for (const [to, dist] of edges) {
      if (rootDistFromStart + dist < distFromStart[to]) {
        distFromStart[to] = rootDistFromStart + dist;
        minHeap.addOne(new State(to, distFromStart[to]));
      }
    }
  }

  return distFromStart;
}
// @lc code=end
