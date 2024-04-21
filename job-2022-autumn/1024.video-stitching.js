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
  clips.sort(([start1, end1], [start2, end2]) => {
    if (start1 !== start2) {
      return start1 - start2;
    } else {
      return end2 - end1;
    }
  });

  if (clips[0][0] > 0) {
    return -1;
  }

  const START = 0;
  const END = 1;

  let count = 1;
  let lastClipIndex = 0;

  for (let i = 0; i < clips.length; i++) {
    if (clips[i][END] >= time) {
      break;
    }
    // 寻找 end 最大的相交区间
    let nextClipIndex = -1;

    for (let j = i + 1; j < clips.length; j++) {
      // 开始大于结束，已经接不起来了
      if (clips[j][START] > clips[i][END]) {
        break;
      }
      // 结束在下一个区间中间
      else if (clips[j][END] > clips[i][END]) {
        if (nextClipIndex === -1 || clips[nextClipIndex][END] < clips[j][END]) {
          // 找到了 end 更大的区间
          nextClipIndex = j;
        }
      }
    }

    if (nextClipIndex !== -1) {
      count++;
      lastClipIndex = nextClipIndex;
      i = nextClipIndex - 1;
    } else {
      break;
    }
  }

  if (clips[lastClipIndex][1] < time) {
    return -1;
  }
  return count;
};
// @lc code=end
