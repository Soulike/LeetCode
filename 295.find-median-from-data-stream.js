/*
 * @lc app=leetcode id=295 lang=javascript
 *
 * [295] Find Median from Data Stream
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

class MedianFinder
{
    // 如果是偶数个数字，两个堆应该一样大。
    // 如果是奇数个数字，maxHeap 应该多一个
    minHeap;    // 装最大的一半
    maxHeap;    // 装最小的一半

    constructor()
    {
        this.minHeap = new Heap((a, b) => a - b, []);
        this.maxHeap = new Heap((a, b) => b - a, []);
    }
    /**
     * @param {number} num
     * @return {void}
     */
    addNum(num)
    {
        if (this.maxHeap.getSize() === 0)
        {
            this.maxHeap.add(num);
        }
        else if (this.minHeap.getSize() === 0)
        {
            // 小的那一半最大的
            const maxHeapRoot = this.maxHeap.getRoot();

            if (num < maxHeapRoot)
            {
                this.maxHeap.deleteRoot();
                this.maxHeap.add(num);
                this.minHeap.add(maxHeapRoot);
            }
            else
            {
                this.minHeap.add(num);
            }
        }
        else
        {
            // 小的那一半最大的
            const maxHeapRoot = this.maxHeap.getRoot();
            // 大的那一半最小的
            const minHeapRoot = this.minHeap.getRoot();

            if (num > minHeapRoot)
            {
                this.minHeap.add(num);
            }
            else if (num < maxHeapRoot)
            {
                this.maxHeap.add(num);
            }
            else if (num <= minHeapRoot && num >= maxHeapRoot)
            {
                this.maxHeap.add(num);
            }

            // 调整平衡
            const totalSize = this.minHeap.getSize() + this.maxHeap.getSize();

            if (totalSize % 2 === 0)
            {
                while (this.minHeap.getSize() > this.maxHeap.getSize())
                {
                    const top = this.minHeap.getRoot();
                    this.minHeap.deleteRoot();
                    this.maxHeap.add(top);
                }

                while (this.maxHeap.getSize() > this.minHeap.getSize())
                {
                    const top = this.maxHeap.getRoot();
                    this.maxHeap.deleteRoot();
                    this.minHeap.add(top);
                }
            }
            else
            {
                while (this.minHeap.getSize() > this.maxHeap.getSize() - 1)
                {
                    const top = this.minHeap.getRoot();
                    this.minHeap.deleteRoot();
                    this.maxHeap.add(top);
                }

                while (this.maxHeap.getSize() - 1 > this.minHeap.getSize())
                {
                    const top = this.maxHeap.getRoot();
                    this.maxHeap.deleteRoot();
                    this.minHeap.add(top);
                }
            }
        }
    }
    /**
     * @return {number}
     */
    findMedian()
    {
        if (this.maxHeap.getSize() > this.minHeap.getSize())
        {
            return this.maxHeap.getRoot();
        }
        else
        {
            return (this.maxHeap.getRoot() + this.minHeap.getRoot()) / 2;
        }
    }
}



/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
// @lc code=end