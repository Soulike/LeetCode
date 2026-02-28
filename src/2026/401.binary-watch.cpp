/*
 * @lc app=leetcode id=401 lang=cpp
 *
 * [401] Binary Watch
 */

#include <algorithm>
#include <bitset>
#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<std::string> readBinaryWatch(const int turned_on_bit_count) {
    std::vector<std::string> results;
    for (int hour_bits = 0; hour_bits <= kHourMaxBits; hour_bits++) {
      const int minute_bits = turned_on_bit_count - hour_bits;
      if (minute_bits < 0) {
        break;
      }
      if (minute_bits > kMinuteMaxBits) {
        continue;
      }
      const std::vector<int> hours = ConvertBitsToHours(hour_bits);
      const std::vector<int> minutes = ConvertBitsToMinutes(minute_bits);
      for (const int hour : hours) {
        for (const int minute : minutes) {
          results.push_back(FormatTimeString(hour, minute));
        }
      }
    }

    return results;
  }

 private:
  static constexpr int kHourMaxBits = 4;
  static constexpr int kMinuteMaxBits = 6;

  static std::string FormatTimeString(const int hour, const int minute) {
    const std::string hour_str = std::to_string(hour);
    const std::string minute_str =
        minute < 10 ? "0" + std::to_string(minute) : std::to_string(minute);
    return hour_str + ":" + minute_str;
  }

  static std::vector<int> ConvertBitsToHours(const int hour_bit_count) {
    const std::vector<int> candidates =
        ConvertBitsToPossibleNumbers(hour_bit_count, kHourMaxBits, 0, 11);
    return candidates;
  }

  static std::vector<int> ConvertBitsToMinutes(const int minute_bit_count) {
    const std::vector<int> candidates =
        ConvertBitsToPossibleNumbers(minute_bit_count, kMinuteMaxBits, 0, 59);
    return candidates;
  }

  static std::vector<int> ConvertBitsToPossibleNumbers(const int bit_count,
                                                       const int total_bits,
                                                       const int min,
                                                       const int max) {
    const int max_number = std::min(max, (1 << total_bits) - 1);
    std::vector<int> numbers;
    for (int i = 0; i <= max_number; i++) {
      const std::bitset<32> bitset(i);
      if (i >= min && bitset.count() == bit_count) {
        numbers.push_back(i);
      }
    }

    return numbers;
  }
};
// @lc code=end
