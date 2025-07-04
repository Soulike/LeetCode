/*
 * @lc app=leetcode id=3307 lang=cpp
 *
 * [3307] Find the K-th Character in String Game II
 */

#include <cinttypes>
#include <vector>

// @lc code=start
class Solution {
 public:
  char kthCharacter(const long long k, const std::vector<int>& operations) {
    if (k == 1) {
      return 'a';
    }
    size_t string_size = 1;  // size of "a"

    // After which operation, the k-th letter appears.
    std::uint64_t kth_letter_operation_index = -1;
    while (string_size < k) {
      kth_letter_operation_index++;
      string_size *= 2;
    }

    // In reversed order, from which letter index we create the letter in
    // operations finally becomes the k-th letter.
    std::vector<std::uint64_t> reversed_letter_source_indexes;
    reversed_letter_source_indexes.push_back(k - 1);
    string_size /= 2;

    while (reversed_letter_source_indexes.size() <
           kth_letter_operation_index + 1) {
      reversed_letter_source_indexes.push_back(
          reversed_letter_source_indexes.back() % string_size);
      string_size /= 2;
    }

    std::uint8_t current_letter_code = 0;  // value of 'a' - 'a';

    // Iterate operations and begin calculating k-th letter from 'a'
    for (std::int64_t operation_index = 0;
         operation_index <= kth_letter_operation_index; operation_index++) {
      const std::uint64_t current_letter_source_index =
          reversed_letter_source_indexes[reversed_letter_source_indexes.size() -
                                         operation_index - 1];
      const std::uint64_t current_string_size = static_cast<std::uint64_t>(1)
                                                << (operation_index + 1);
      if (current_string_size / 2 - 1 >= current_letter_source_index) {
        // From first half, letter is not changed in the current operation, do
        // nothing
      } else {
        // From second half, check operation
        if (operations[operation_index] == kOperationDuplicate) {
          // Same letter duplication, do nothing
        } else {
          // Change letter in the current operation.
          current_letter_code = (current_letter_code + 1) % 26;
        }
      }
    }

    return static_cast<char>(current_letter_code + 'a');
  }

 private:
  static constexpr int kOperationDuplicate = 0;
  static constexpr int kOperationChange = 1;
};
// @lc code=end

int main() {
  Solution sol;
  sol.kthCharacter(1, {0});
}
