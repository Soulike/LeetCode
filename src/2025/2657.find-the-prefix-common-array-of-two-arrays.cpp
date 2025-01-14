/*
 * @lc app=leetcode id=2657 lang=cpp
 *
 * [2657] Find the Prefix Common Array of Two Arrays
 */

#include <cinttypes>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> findThePrefixCommonArray(std::vector<int>& A,
                                            std::vector<int>& B) {
    BitMap presentNumbersBitMap = 0b0;
    const BitMask kEmptyBitMask = 0b0;
    const int N = static_cast<int>(A.size());

    std::vector<int> prefixCommon(N, 0);

    if (A[0] == B[0]) {
      prefixCommon[0] = 1;
    }
    presentNumbersBitMap |= (getNumberBitMask(A[0]) | getNumberBitMask(B[0]));

    for (int i = 1; i < N; i++) {
      const BitMask aBitMask = getNumberBitMask(A[i]);
      const BitMask bBitMask = getNumberBitMask(B[i]);

      if (A[i] == B[i]) {
        prefixCommon[i] = prefixCommon[i - 1] + 1;
      } else {
        prefixCommon[i] = prefixCommon[i - 1];
        if ((presentNumbersBitMap & aBitMask) != kEmptyBitMask) {
          prefixCommon[i]++;
        }
        if ((presentNumbersBitMap & bBitMask) != kEmptyBitMask) {
          prefixCommon[i]++;
        }
      }
      presentNumbersBitMap |= (aBitMask | bBitMask);
    }

    return prefixCommon;
  }

 private:
  using BitMap = std::uint64_t;
  using BitMask = BitMap;

  template <typename T>
  static BitMask getNumberBitMask(T number) {
    BitMask base = 0b1;
    return base << number;
  }
};
// @lc code=end

int main() {
  std::vector<int> a = {1, 3, 2, 4};
  std::vector<int> b = {3, 1, 2, 4};
  Solution sol;
  sol.findThePrefixCommonArray(a, b);
}
