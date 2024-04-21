/*
 * @lc app=leetcode id=912 lang=typescript
 *
 * [912] Sort an Array
 */

// @lc code=start

class Heap<T> {
  private treeNodes: T[];
  private compareFunction: (a: T, b: T) => number;

  /**
   * @param compareFunction - 比较函数。如果 a - b <= 0 则无需交换，反之则需要交换
   */
  constructor(compareFunction: (a: T, b: T) => number, elements?: Iterable<T>) {
    this.treeNodes = [];
    this.compareFunction = compareFunction;
    if (elements !== undefined) {
      this.add(...elements);
    }
  }

  public add(...elements: T[]): void {
    for (const element of elements) {
      this.addOne(element);
    }
  }

  /**
   * 给堆添加一个元素。
   * 先将元素放到堆末尾，再和父结点比较。如果不符合顺序，就交换它们，直到子结点与父结点符合顺序或没有父结点。
   */
  private addOne(element: T): void {
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
  public getRoot(): T | never {
    if (this.treeNodes.length === 0) {
      throw new RangeError('Heap has no element');
    } else {
      return this.treeNodes[0];
    }
  }

  /**
   * 删除堆顶。
   * 先将堆顶与最后一个元素交换，然后删除最后一个元素。
   * 然后，从堆顶开始，比较父结点与左右子结点的最小值。如果子结点的最小值与父结点不符合顺序要求，交换它们，直到符合顺序要求
   * @throws {RangeError}
   * */
  public deleteRoot(): void | never {
    if (this.treeNodes.length === 0) {
      throw new RangeError('Heap has no element');
    } else {
      const lastIndex = this.treeNodes.length - 1;
      Heap.swap(this.treeNodes, 0, lastIndex);
      this.treeNodes.length--;
      const LENGTH = this.treeNodes.length;

      let elementIndex = 0;
      let leftChildIndex = Heap.getLeftChildIndex(elementIndex);
      let rightChildIndex = Heap.getRightChildIndex(elementIndex);

      let minChildIndex =
        this.treeNodes[leftChildIndex] > this.treeNodes[rightChildIndex]
          ? rightChildIndex
          : leftChildIndex;

      while (
        this.compareFunction(
          this.treeNodes[minChildIndex],
          this.treeNodes[elementIndex],
        ) < 0
      ) {
        Heap.swap(this.treeNodes, elementIndex, minChildIndex);
        elementIndex = minChildIndex;

        leftChildIndex = Heap.getLeftChildIndex(elementIndex);
        rightChildIndex = Heap.getRightChildIndex(elementIndex);

        if (leftChildIndex < LENGTH && rightChildIndex < LENGTH) {
          minChildIndex =
            this.treeNodes[leftChildIndex] > this.treeNodes[rightChildIndex]
              ? rightChildIndex
              : leftChildIndex;
        } else if (leftChildIndex < LENGTH) {
          minChildIndex = leftChildIndex;
        } else if (rightChildIndex < LENGTH) {
          minChildIndex = rightChildIndex;
        } else {
          break;
        }
      }
    }
  }

  private static getLeftChildIndex(rootIndex: number): number {
    return 2 * rootIndex + 1;
  }

  private static getRightChildIndex(rootIndex: number): number {
    return 2 * rootIndex + 2;
  }

  private static getParentIndex(childIndex: number): number {
    if (childIndex % 2) {
      // odd
      return (childIndex - 1) / 2;
    } // even
    else {
      return (childIndex - 2) / 2;
    }
  }

  private static swap(array: any[], index1: number, index2: number): void {
    [array[index1], array[index2]] = [array[index2], array[index1]];
  }
}

/**
 * @param compareFunction - 比较函数。如果 a - b <= 0 则无需交换，反之则需要交换
 */
function heapSort<T>(
  array: T[],
  compareFunction: (a: T, b: T) => number,
): void {
  const heap = new Heap(compareFunction, array);
  const LENGTH = array.length;
  for (let i = 0; i < LENGTH; i++) {
    array[i] = heap.getRoot();
    heap.deleteRoot();
  }
}

function sortArray(nums: number[]): number[] {
  heapSort(nums, (a, b) => a - b);
  return nums;
}

// @lc code=end
