/*
 * @lc app=leetcode id=1834 lang=javascript
 *
 * [1834] Single-Threaded CPU
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
 * @param {number[][]} tasks
 * @return {number[]}
 */
var getOrder = function (tasks) {
    const TASK_NUMBER = tasks.length;
    const ENQUEUE_TIME = 0;
    const PROCESSING_TIME = 1;
    const INDEX = 2;

    for (let i = 0; i < TASK_NUMBER; i++) {
        tasks[i].push(i);
    }
    tasks.sort(([eTime1], [eTime2]) => eTime1 - eTime2);

    /**
     * Currently available tasks, sorted by processingTimes and indexes
     * @type {Heap<number[]>}
     *  */
    const heap = new Heap(([, pTime1, index1], [, pTime2, index2]) => {
        if (pTime1 !== pTime2) {
            return pTime1 - pTime2;
        } else {
            return index1 - index2;
        }
    }, []);

    /** @type {number[]} */
    const sequence = [];
    let currentTime = 0;
    let heapedTaskIndex = -1;
    while (heapedTaskIndex < TASK_NUMBER - 1 || heap.getSize() > 0) {
        // Every time a task is processed, add tasks whose enqueueTime <= currentTime as available tasks
        if (heapedTaskIndex < TASK_NUMBER - 1) {
            let task = tasks[heapedTaskIndex + 1];
            while (task[ENQUEUE_TIME] <= currentTime) {
                heap.addOne(task);
                heapedTaskIndex++;
                if (heapedTaskIndex === TASK_NUMBER - 1) {
                    break;
                }
                task = tasks[heapedTaskIndex + 1];
            }
        }

        if (heap.getSize() > 0) {
            // process the first task in heap
            const task = heap.getRoot();
            heap.deleteRoot();
            sequence.push(task[INDEX]);
            currentTime += task[PROCESSING_TIME];
        } else {
            // CPU keeps idle for a while, pick the next task
            const task = tasks[heapedTaskIndex + 1];
            heapedTaskIndex++;
            currentTime = task[ENQUEUE_TIME];
            heap.addOne(task);
        }
    }

    return sequence;
};
// @lc code=end

getOrder([
    [7, 10],
    [7, 12],
    [7, 5],
    [7, 4],
    [7, 2],
]);
