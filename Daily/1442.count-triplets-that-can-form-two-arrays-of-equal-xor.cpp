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
    vector<int> prefixXor(N, 0);
    prefixXor[0] = arr[0];
    for (int i = 1; i < N; i++) {
      prefixXor[i] = prefixXor[i - 1] ^ arr[i];
    }

    int tripletCount = 0;

    for (int i = 0; i < N; i++) {
      for (int j = i + 1; j < N; j++) {
        for (int k = j; k < N; k++) {
          int a = prefixXor[j - 1] ^ (i - 1 >= 0 ? prefixXor[i - 1] : 0);
          int b = prefixXor[k] ^ prefixXor[j - 1];

          if (a == b) {
            tripletCount++;
          }
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