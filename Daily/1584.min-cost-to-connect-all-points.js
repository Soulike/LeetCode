/*
 * @lc app=leetcode id=1584 lang=javascript
 *
 * [1584] Min Cost to Connect All Points
 */

// @lc code=start
class UnionFindSet {
    /** @type {number[]} */
    #parent;
    /** @type {number} */
    #groupCount;

    /**
     * @param {number} size
     */
    constructor(size) {
        this.#parent = new Array(size);
        for (let i = 0; i < size; i++) {
            this.#parent[i] = i;
        }
        this.#groupCount = size;
    }

    getGroupCount() {
        return this.#groupCount;
    }

    /**
     * @param {number} element1
     * @param {number} element2
     * @returns {void}
     */
    union(element1, element2) {
        const root1 = this.#find(element1);
        const root2 = this.#find(element2);
        if (root1 !== root2) {
            this.#groupCount--;
        }
        this.#parent[root2] = root1;
    }

    /**
     * @param {number} element
     * @returns {number}
     */
    #find(element) {
        let currentElement = element;
        while (this.#parent[currentElement] !== currentElement) {
            currentElement = this.#parent[currentElement];
            this.#parent[currentElement] = this.#find(
                this.#parent[currentElement],
            );
        }
        return currentElement;
    }

    /**
     * @param {number} element1
     * @param {number} element2
     * @returns {boolean}
     */
    isConnected(element1, element2) {
        return this.#find(element1) === this.#find(element2);
    }
}

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

/** @typedef {[x: number, y: number]} Point */

/**
 * @param {Point[]} points
 * @return {number}
 */
var minCostConnectPoints = function (points) {
    /** @type {[...Point, distance: number][]} */
    const heapInit = [];
    /** @type {Heap<[...Point, distance: number]>} */
    const distanceHeap = new Heap(
        ([, , manhattanDistance1], [, , manhattanDistance2]) =>
            manhattanDistance1 - manhattanDistance2,
        heapInit,
    );

    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const manhattanDistance = getManhattanDistance(
                points[i],
                points[j],
            );
            distanceHeap.addOne([i, j, manhattanDistance]);
        }
    }

    let cost = 0;

    const ufSet = new UnionFindSet(points.length);

    while (distanceHeap.getSize() > 0) {
        const [x, y, manhattanDistance] = distanceHeap.getRoot();
        distanceHeap.deleteRoot();
        if (ufSet.isConnected(x, y)) continue;

        cost += manhattanDistance;
        ufSet.union(x, y);

        if (ufSet.getGroupCount() === 1) break;
    }

    return cost;
};

/**
 * @param {[x: number, y: number]} point1
 * @param {[x: number, y: number]} point2
 * @returns {number}
 */
function getManhattanDistance(point1, point2) {
    return Math.abs(point1[0] - point2[0]) + Math.abs(point1[1] - point2[1]);
}
// @lc code=end

minCostConnectPoints([
    [2, -3],
    [-17, -8],
    [13, 8],
    [-17, -15],
]);
