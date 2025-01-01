/*
 * @lc app=leetcode id=220 lang=javascript
 *
 * [220] Contains Duplicate III
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} t
 * @return {boolean}
 */
var containsNearbyAlmostDuplicate = function (nums, k, t) {
  const buckets = {};

  let left = 0;
  let right = k;

  for (let i = 0; i <= k && i < nums.length; i++) {
    const bucketIndex = getBucketIndex(nums[i], t + 1);
    if (
      bucketIndex in buckets ||
      (bucketIndex - 1 in buckets &&
        Math.abs(buckets[bucketIndex - 1] - nums[i]) <= t) ||
      (bucketIndex + 1 in buckets &&
        Math.abs(buckets[bucketIndex + 1] - nums[i]) <= t)
    ) {
      return true;
    }
    buckets[bucketIndex] = nums[i];
  }

  while (right <= nums.length - 1) {
    const leftBucketIndex = getBucketIndex(nums[left], t + 1);
    delete buckets[leftBucketIndex];

    left++;
    right++;

    const rightBucketIndex = getBucketIndex(nums[right], t + 1);
    if (
      rightBucketIndex in buckets ||
      (rightBucketIndex - 1 in buckets &&
        Math.abs(buckets[rightBucketIndex - 1] - nums[right]) <= t) ||
      (rightBucketIndex + 1 in buckets &&
        Math.abs(buckets[rightBucketIndex + 1] - nums[right]) <= t)
    ) {
      return true;
    }
    buckets[rightBucketIndex] = nums[right];
  }

  return false;
};

function getBucketIndex(num, bucketSize) {
  return Math.floor(num / bucketSize);
}
// @lc code=end
