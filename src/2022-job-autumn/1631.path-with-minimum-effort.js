/*
 * @lc app=leetcode id=1631 lang=javascript
 *
 * [1631] Path With Minimum Effort
 */

// @lc code=start
/**
 * @param {number[][]} heights
 * @return {number}
 */
var minimumEffortPath = function (heights) {
  const m = heights.length;
  const n = heights[0].length;

  /**@type {{index: number, weight: number}[][]} */
  const graph = [];

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      /** @type {{index: number, weight: number}[]} */
      const neighbors = [];
      const upIndex = graph.length - n;
      const downIndex = graph.length + n;
      const leftIndex = graph.length - 1;
      const rightIndex = graph.length + 1;

      if (i - 1 >= 0) {
        neighbors.push({
          index: upIndex,
          weight: Math.abs(heights[i][j] - heights[i - 1][j]),
        });
      }
      if (i + 1 <= m - 1) {
        neighbors.push({
          index: downIndex,
          weight: Math.abs(heights[i][j] - heights[i + 1][j]),
        });
      }

      if (j - 1 >= 0) {
        neighbors.push({
          index: leftIndex,
          weight: Math.abs(heights[i][j] - heights[i][j - 1]),
        });
      }

      if (j + 1 <= n - 1) {
        neighbors.push({
          index: rightIndex,
          weight: Math.abs(heights[i][j] - heights[i][j + 1]),
        });
      }

      graph.push(neighbors);
    }
  }

  const result = dijkstra(0, m * n - 1, graph, (a, b) => Math.max(a, b));

  return result;
};

/**
 * @param {number} start
 * @param {number} end
 * @param {Neighbors[]} graph
 * @param {(weight1: number, weight2: number) => number} calculateWeight
 * @returns {number}
 */
function dijkstra(start, end, graph, calculateWeight) {
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

  class Node {
    index;
    weightFromStart;

    /**
     * @param {number} index
     * @param {number} weightFromStart
     */
    constructor(index, weightFromStart) {
      this.index = index;
      this.weightFromStart = weightFromStart;
    }
  }

  /** @type {number[]} */
  const weightFromStart = new Array(graph.length);
  weightFromStart.fill(Infinity);
  weightFromStart[start] = 0;

  const startNode = new Node(start, 0);

  const minHeap = new Heap(
    (a, b) => a.weightFromStart - b.weightFromStart,
    [startNode],
  );

  while (minHeap.getSize() > 0) {
    const node = minHeap.getRoot();
    minHeap.deleteRoot();

    if (node.index === end) {
      return node.weightFromStart;
    }

    if (weightFromStart[node.index] < node.weightFromStart) {
      continue;
    }

    const neighbors = graph[node.index];

    for (const neighbor of neighbors) {
      const newWeightBypassNode = calculateWeight(
        node.weightFromStart,
        neighbor.weight,
      );

      if (newWeightBypassNode < weightFromStart[neighbor.index]) {
        weightFromStart[neighbor.index] = newWeightBypassNode;

        minHeap.addOne(
          new Node(neighbor.index, weightFromStart[neighbor.index]),
        );
      }
    }
  }

  return Infinity;
}
// @lc code=end
