/*
 * @lc app=leetcode id=378 lang=cpp
 *
 * [378] Kth Smallest Element in a Sorted Matrix
 */
#include <vector>

using std::vector;

// @lc code=start
class Solution {
 public:
  int kthSmallest(vector<vector<int>>& matrix, int k) {
    const int M = matrix.size();
    const int N = matrix[0].size();

    int left = matrix[0][0];
    int right = matrix[M - 1][N - 1];
    int result = -1;

    // find smallest element has at least k smaller elements
    // https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/solutions/1322101/c-java-python-maxheap-minheap-binary-search-picture-explain-clean-concise/
    while (left <= right) {
      const int mid = (right - left) / 2 + left;
      if (countLessEqual(matrix, mid) >= k) {
        if (countLessEqual(matrix, mid - 1) < k) {
          result = mid;
          break;
        } else {
          right = mid - 1;
        }
      } else {
        left = mid + 1;
      }
    }

    return result;
  }

  int countLessEqual(vector<vector<int>>& matrix, const int num) const {
    const int M = matrix.size();
    const int N = matrix[0].size();
    int lessThanNumElementCount = 0;
    for (int i = 0; i < M && matrix[i][0] <= num; i++) {
      if (matrix[i][N - 1] <= num) {
        lessThanNumElementCount += N;
      } else {
        for (int j = 0; j < N; j++) {
          if (matrix[i][j] <= num) {
            lessThanNumElementCount++;
          } else {
            break;
          }
        }
      }
    }
    return lessThanNumElementCount;
  }
};
// @lc code=end

int main() {
  Solution sol;
  vector<vector<int>> vec = {{1, 2}, {1, 3}};
  sol.kthSmallest(vec, 2);
}