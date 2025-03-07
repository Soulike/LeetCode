/*
 * @lc app=leetcode id=2523 lang=cpp
 *
 * [2523] Closest Prime Numbers in Range
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> closestPrimes(int left, int right) {
    int prime1 = -1;
    int prime2 = -1;
    int minPrimeDiff = INT_MAX;
    std::array<int, 2> primePairs = {-1, -1};

    for (int i = std::max(left, 2); i <= right; i++) {
      if (isPrime(i)) [[unlikely]] {
        if (prime1 == -1) [[unlikely]] {
          prime1 = i;
          continue;
        }
        if (prime2 == -1) [[unlikely]] {
          prime2 = i;
          minPrimeDiff = prime2 - prime1;
          primePairs = {prime1, prime2};
          continue;
        }

        prime1 = prime2;
        prime2 = i;
        if (prime2 - prime1 < minPrimeDiff) {
          primePairs = {prime1, prime2};
          minPrimeDiff = prime2 - prime1;
        }
      }
    }

    return {primePairs.cbegin(), primePairs.cend()};
  }

 private:
  static bool isPrime(const int num) {
    for (int i = 2; i <= std::sqrt(num); i++) {
      if (num % i == 0) [[likely]] {
        return false;
      }
    }

    return true;
  }
};
// @lc code=end
