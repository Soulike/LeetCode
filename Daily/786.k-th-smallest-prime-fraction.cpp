/*
 * @lc app=leetcode id=786 lang=cpp
 *
 * [786] K-th Smallest Prime Fraction
 */
#include <vector>

using std::vector;

// @lc code=start
class Solution {
 public:
  vector<int> kthSmallestPrimeFraction(vector<int>& arr, int k) {
    double left = 0, right = 1;
    int p = 0, q = 1;

    while (true) {
      int n = arr.size();
      int count = 0;
      p = 0;
      double mid = (left + right) / 2;

      for (int i = 0; i < n; i++) {
        int j = n - 1;
        while (j >= 0 && arr[i] > mid * arr[n - 1 - j]) {
          j--;
        }
        count += (j + 1);

        if (j >= 0 && p * arr[n - 1 - j] < q * arr[i]) {
          p = arr[i];
          q = arr[n - 1 - j];
        }
      }

      if (count < k) {
        left = mid;
      } else if (count > k) {
        right = mid;
      } else {
        return {p, q};
      }
    }
  }
};
// @lc code=end

int main() {
  Solution sol;
  vector<int> vec = {1, 2, 3, 5};
  sol.kthSmallestPrimeFraction(vec, 3);
}