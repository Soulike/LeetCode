/*
 * @lc app=leetcode id=1442 lang=cpp
 *
 * [1442] Count Triplets That Can Form Two Arrays of Equal XOR
 */

#include <vector>

using std::vector;

// @lc code=start
class Solution {
 public:
  int countTriplets(vector<int>& arr) {
    const int N = arr.size();
    int tripletCount = 0;
    for (int i = 0; i < N; i++) {
      int currentXor = 0;
      for (int k = i; k < N; k++) {
        currentXor ^= arr[k];
        if (currentXor == 0) {
          tripletCount += k - i;
        }
      }
    }

    return tripletCount;
  }
};
// @lc code=end

int main() {
  Solution sol;
  vector<int> vec = {2, 3, 1, 6, 7};
  sol.countTriplets(vec);
}