/*
 * @lc app=leetcode id=1631 lang=javascript
 *
 * [1631] Path With Minimum Effort
 */

// @lc code=start

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

class Graph
{
    /**
     * @type {Map<`${number}-${number}`, number>}
     */
    #edgeToWeight;
    /**
     * @type {Map<number, number[]>}
     */
    #tos;

    /**
     * @param {[number, number, number][]} weights
     */
    constructor(nodeCount, weights)
    {
        this.#edgeToWeight = new Map();
        this.#tos = new Map();
        for (let i = 0; i < nodeCount; i++)
        {
            this.#tos.set(i, []);
        }
        for (let i = 0; i < weights.length; i++)
        {
            const [from, to, diff] = weights[i];
            this.#edgeToWeight.set(`${from}-${to}`, diff);

            this.#tos.get(from).push(to);
        }
    }

    getWeight(from, to)
    {
        return this.#edgeToWeight.get(`${from}-${to}`) ?? Number.POSITIVE_INFINITY;
    }

    getTos(from)
    {
        return this.#tos.get(from);
    }
}

/**
 * @param {number[][]} heights
 * @return {number}
 */
var minimumEffortPath = function (heights)
{
    const ROW_COUNT = heights.length;
    const COL_COUNT = heights[0].length;
    const NODE_COUNT = ROW_COUNT * COL_COUNT;
    /** @type {[number,number,number][]} */
    const efforts = [];
    for (let i = 0; i < ROW_COUNT; i++)
    {
        for (let j = 0; j < COL_COUNT; j++)
        {
            // 上
            if (i >= 1)
            {
                efforts.push(
                    [getNodeIndex(i - 1, j, COL_COUNT),
                    getNodeIndex(i, j, COL_COUNT),
                    Math.abs(heights[i - 1][j] - heights[i][j])]);
            }
            // 下
            if (i <= ROW_COUNT - 2)
            {
                efforts.push(
                    [getNodeIndex(i + 1, j, COL_COUNT),
                    getNodeIndex(i, j, COL_COUNT),
                    Math.abs(heights[i + 1][j] - heights[i][j])]);
            }
            // 左
            if (j >= 1)
            {
                efforts.push(
                    [getNodeIndex(i, j - 1, COL_COUNT),
                    getNodeIndex(i, j, COL_COUNT),
                    Math.abs(heights[i][j - 1] - heights[i][j])]);
            }
            // 右
            if (j <= COL_COUNT - 2)
            {
                efforts.push(
                    [getNodeIndex(i, j + 1, COL_COUNT),
                    getNodeIndex(i, j, COL_COUNT),
                    Math.abs(heights[i][j + 1] - heights[i][j])]);
            }
        }
    }

    // 转化为图问题
    const graph = new Graph(NODE_COUNT, efforts);

    const dest = getNodeIndex(ROW_COUNT - 1, COL_COUNT - 1, COL_COUNT);

    // 从结点 0 到 i 的所有路径中，最小 effort 是多少
    const minEfforts = new Array(NODE_COUNT);
    minEfforts.fill(Number.POSITIVE_INFINITY);
    minEfforts[0] = 0;

    const heap = new Heap((a, b) => a[1] - b[1], [[0, 0]]);

    while (heap.getSize() > 0)
    {
        const [from, diff] = heap.getRoot();
        heap.deleteRoot();

        if (diff > minEfforts[from])
        {
            continue;
        }

        if (from === dest)
        {
            return minEfforts[dest];
        }

        const tos = graph.getTos(from);
        for (const to of tos)
        {
            const newDiff = Math.max(graph.getWeight(from, to), minEfforts[from]);
            if (newDiff < minEfforts[to])
            {
                minEfforts[to] = newDiff;
                heap.addOne([to, newDiff]);
            }
        }
    }
};

function getNodeIndex(row, col, COL_COUNT)
{
    return row * COL_COUNT + col;
}
// @lc code=end