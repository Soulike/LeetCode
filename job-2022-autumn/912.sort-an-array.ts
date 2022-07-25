/*
 * @lc app=leetcode id=912 lang=typescript
 *
 * [912] Sort an Array
 */

// @lc code=start
function sortArray(nums: number[]): number[] {
    mergeSort(nums, (a, b) => a - b);

    return nums;
}

function mergeSort<T>(array: T[], predicate: (a: T, b: T) => number): void {
    mergeSortHelper(array, 0, array.length - 1, predicate);
}

function mergeSortHelper<T>(
    array: T[],
    start: number,
    end: number,
    predicate: (a: T, b: T) => number,
): void {
    if (start === end) return;

    const mid = start + Math.floor((end - start) / 2);

    mergeSortHelper(array, start, mid, predicate);
    mergeSortHelper(array, mid + 1, end, predicate);

    mergeArrays(array, start, mid, end, predicate);
}

/**
 * [start, mid] + (mid, end] => [start, end]
 */
function mergeArrays<T>(
    array: T[],
    start: number,
    mid: number,
    end: number,
    predicate: (a: T, b: T) => number,
): void {
    if (start === end) return;

    const leftArray = array.slice(start, mid + 1);
    const rightArray = array.slice(mid + 1, end + 1);
    let leftIndex = 0;
    let rightIndex = 0;

    for (let i = start; i <= end; i++) {
        if (leftIndex === leftArray.length) {
            array[i] = rightArray[rightIndex];
            rightIndex++;
        } else if (rightIndex === rightArray.length) {
            array[i] = leftArray[leftIndex];
            leftIndex++;
        } else if (
            predicate(leftArray[leftIndex], rightArray[rightIndex]) > 0
        ) {
            array[i] = rightArray[rightIndex];
            rightIndex++;
        } else if (
            predicate(leftArray[leftIndex], rightArray[rightIndex]) <= 0
        ) {
            array[i] = leftArray[leftIndex];
            leftIndex++;
        }
    }
}
// @lc code=end
