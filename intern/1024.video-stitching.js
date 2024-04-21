/*
 * @lc app=leetcode id=1024 lang=javascript
 *
 * [1024] Video Stitching
 */

// @lc code=start
/**
 * @param {number[][]} clips
 * @param {number} time
 * @return {number}
 */
var videoStitching = function (clips, time) {
  /**
   * start 从小到大排序，如果 start 一样，end 从大到小排序
   */

  clips.sort(([start1, end1], [start2, end2]) => {
    if (start1 !== start2) {
      return start1 - start2;
    } else {
      return end2 - end1;
    }
  });

  const minStart = clips[0][0];

  if (minStart > 0) {
    return -1;
  }

  let maxEnd = -Infinity; // 已经被用上的切片的 end
  let clipCount = 0;
  for (let i = 0; i < clips.length; i++) {
    const [, end1] = clips[i];
    maxEnd = Math.max(maxEnd, end1);
    clipCount++;
    if (maxEnd >= time) {
      break;
    }

    // 后面还能接上的区间里最大的 end 及其所在的位置
    let maxEnd2 = -Infinity;
    let maxEnd2Index = -1;
    for (let j = i + 1; j < clips.length; j++) {
      const [start2, end2] = clips[j];
      if (end2 > end1) {
        // 我们想要后面的区间能和当前区间接上
        // 而且 end 越大越好
        if (start2 > end1) {
          // 已经接不上了
          break;
        }

        if (end2 > maxEnd2) {
          maxEnd2 = end2;
          maxEnd2Index = j;
        }
      }
    }

    // 后面的都接不上
    if (maxEnd2Index === -1) {
      break;
    }
    i = maxEnd2Index - 1;
  }

  if (maxEnd < time) {
    return -1;
  }
  return clipCount;
};
// @lc code=end
