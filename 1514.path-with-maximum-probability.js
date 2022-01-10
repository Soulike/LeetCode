/*
 * @lc app=leetcode id=1514 lang=javascript
 *
 * [1514] Path with Maximum Probability
 */

// @lc code=start
class Graph
{
    /**
     * @type {Map<`${number}-${number}`, number>}
     */
    #edgeToProb;
    /**
     * @type {Map<number, number[]>}
     */
    #tos;

    /**
     * @param {[number, number][]} edges
     * @param {number[]} probs
     */
    constructor(n, edges, probs)
    {
        this.#edgeToProb = new Map();
        this.#tos = new Map();
        for (let i = 0; i < n; i++)
        {
            this.#tos.set(i, []);
        }
        for (let i = 0; i < edges.length; i++)
        {
            const [a, b] = edges[i];
            const prob = probs[i];
            this.#edgeToProb.set(`${a}-${b}`, prob);
            this.#edgeToProb.set(`${b}-${a}`, prob);

            this.#tos.get(a).push(b);
            this.#tos.get(b).push(a);
        }
    }

    getProb(from, to)
    {
        return this.#edgeToProb.get(`${from}-${to}`) ?? 0;
    }

    getTos(from)
    {
        return this.#tos.get(from);
    }
}

class Heap
{
    treeNodes;
    compareFunction;

    /**
     * @param compareFunction - 比较函数。如果返回值小于 0，则 a 在 b 前面，大于 0 则相反
     */
    constructor(compareFunction, elements)
    {
        this.treeNodes = [];
        this.compareFunction = compareFunction;
        if (elements !== undefined)
        {
            this.add(...elements);
        }
    }

    add(...elements)
    {
        for (const element of elements)
        {
            this.addOne(element);
        }
    }

    /**
     * 给堆添加一个元素。
     * 先将元素放到堆末尾，再和父结点比较。如果不符合顺序，就交换它们，直到子结点与父结点符合顺序或没有父结点。
     */
    addOne(element)
    {
        let elementIndex = this.treeNodes.length;
        let parentIndex = Heap.getParentIndex(elementIndex);
        this.treeNodes.push(element);

        while (elementIndex > 0
            && this.compareFunction(this.treeNodes[elementIndex],
                this.treeNodes[parentIndex]) < 0)
        {
            Heap.swap(this.treeNodes, elementIndex, parentIndex);
            elementIndex = parentIndex;
            parentIndex = Heap.getParentIndex(elementIndex);
        }
    }

    /**
     * @throws {RangeError} 
     * */
    getRoot()
    {
        if (this.treeNodes.length === 0)
        {
            throw new RangeError('Heap has no element');
        }
        else
        {
            return this.treeNodes[0];
        }
    }

    /**
     * 删除堆顶。
     * 先将堆顶与最后一个元素交换，然后删除最后一个元素。
     * 然后，从堆顶开始，比较父结点与左右子结点。如果子结点的最小值与父结点不符合顺序要求，交换它们，直到符合顺序要求
     * @throws {RangeError}
     * */
    deleteRoot()
    {
        if (this.treeNodes.length === 0)
        {
            throw new RangeError('Heap has no element');
        }
        else
        {
            const lastIndex = this.treeNodes.length - 1;
            Heap.swap(this.treeNodes, 0, lastIndex);
            this.treeNodes.length--;

            let elementIndex = 0;
            let minChildIndex = this.getMinChildIndex(elementIndex);
            if (minChildIndex === -1)
            {
                return;
            }

            while (this.compareFunction(this.treeNodes[minChildIndex],
                this.treeNodes[elementIndex]) < 0)
            {
                Heap.swap(this.treeNodes, elementIndex, minChildIndex);
                elementIndex = minChildIndex;

                minChildIndex = this.getMinChildIndex(elementIndex);
                if (minChildIndex === -1)
                {
                    break;
                }
            }
        }
    }

    /**
     * 获取当前结点值靠前的子结点，如果不存在子结点，返回 -1
     */
    getMinChildIndex(elementIndex)
    {
        const LENGTH = this.treeNodes.length;
        let leftChildIndex = Heap.getLeftChildIndex(elementIndex);
        let rightChildIndex = Heap.getRightChildIndex(elementIndex);

        let minChildIndex;

        if (leftChildIndex < LENGTH && rightChildIndex < LENGTH)
        {
            minChildIndex = this.compareFunction(this.treeNodes[leftChildIndex],
                this.treeNodes[rightChildIndex]) < 0
                ? leftChildIndex
                : rightChildIndex;
        }
        else if (leftChildIndex < LENGTH)
        {
            minChildIndex = leftChildIndex;
        }
        else if (rightChildIndex < LENGTH)
        {
            minChildIndex = rightChildIndex;
        }
        else
        {
            minChildIndex = -1;
        }
        return minChildIndex;
    }

    getSize()
    {
        return this.treeNodes.length;
    }

    static getLeftChildIndex(rootIndex)
    {
        return 2 * rootIndex + 1;
    }

    static getRightChildIndex(rootIndex)
    {
        return 2 * rootIndex + 2;
    }

    static getParentIndex(childIndex)
    {
        if (childIndex % 2) // odd
        {
            return (childIndex - 1) / 2;
        }
        else    // even
        {
            return (childIndex - 2) / 2;
        }
    }

    static swap(array, index1, index2)
    {
        [
            array[index1],
            array[index2]
        ] = [
                array[index2],
                array[index1]
            ];
    }
}

/**
 * @param {number} n
 * @param {[number, number][]} edges
 * @param {number[]} succProb
 * @param {number} start
 * @param {number} end
 * @return {number}
 */
var maxProbability = function (n, edges, succProb, start, end)
{
    const graph = new Graph(n, edges, succProb);

    const maxProbs = new Array(n);
    maxProbs.fill(0);
    maxProbs[start] = 1;

    const heap = new Heap((a, b) => b[1] - a[1], []);
    heap.addOne([start, 1]);

    while (heap.getSize() > 0)
    {
        const [maxProbFrom, maxProb] = heap.getRoot();
        heap.deleteRoot();

        if (maxProbs[maxProbFrom] > maxProb)
        {
            continue;
        }

        if (maxProbFrom === end)
        {
            return maxProb;
        }

        const tos = graph.getTos(maxProbFrom);
        for (const to of tos)
        {
            const newProb = maxProbs[maxProbFrom] * graph.getProb(maxProbFrom, to);
            if (maxProbs[to] < newProb)
            {
                maxProbs[to] = newProb;
                heap.addOne([to, newProb]);
            }
        }
    }

    return 0;
};
// @lc code=end

console.log(maxProbability(3,
    [[0, 1]],
    [0.5],
    0,
    2));