/*
 * @lc app=leetcode id=1514 lang=javascript
 *
 * [1514] Path with Maximum Probability
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} succProb
 * @param {number} start
 * @param {number} end
 * @return {number}
 */
var maxProbability = function (n, edges, succProb, start, end) {
  /** @type {Neighbors[]} */
  const graph = new Array(n);
  for (let i = 0; i < n; i++) {
    graph[i] = [];
  }

  for (let i = 0; i < edges.length; i++) {
    const [a, b] = edges[i];
    graph[a].push({index: b, weight: 1 - succProb[i]});
    graph[b].push({index: a, weight: 1 - succProb[i]});
  }

  const result = dijkstra(start, end, graph, (a, b) => 1 - (1 - a) * (1 - b));

  if (result === Infinity) {
    return 0;
  } else {
    return 1 - result;
  }
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

  const toStartWeight = calculateWeight(0, 0);

  weightFromStart[start] = toStartWeight;

  const startNode = new Node(start, toStartWeight);

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

console.log(
  maxProbability(
    3,
    [
      [0, 1],
      [1, 2],
      [0, 2],
    ],
    [0.5, 0.5, 0.3],
    0,
    2,
  ),
);
