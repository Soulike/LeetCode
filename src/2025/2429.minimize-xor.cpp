/*
 * @lc app=leetcode id=2429 lang=cpp
 *
 * [2429] Minimize XOR
 */

#include <bitset>
#include <cinttypes>

// @lc code=start
class Solution {
 public:
  int minimizeXor(int num1, int num2) {
    const std::bitset<32> num1Bitset(num1);
    const std::bitset<32> num2Bitset(num2);

    uint_fast8_t setBitNumber = num2Bitset.count();

    std::bitset<32> minimizeXorBitset(0);
    for (int i = num2Bitset.size() - 1; i >= 0; i--) {
      if (setBitNumber == 0) {
        break;
      }

      if (num1Bitset[i]) {
        minimizeXorBitset[i] = true;
        setBitNumber--;
      }
    }

    if (setBitNumber > 0) {
      for (int i = 0; i < num1Bitset.size(); i++) {
        if (setBitNumber == 0) {
          break;
        }

        if (!num1Bitset[i]) {
          minimizeXorBitset[i] = true;
          setBitNumber--;
        }
      }
    }

    return static_cast<int>(minimizeXorBitset.to_ulong());
  }
};
// @lc code=end
