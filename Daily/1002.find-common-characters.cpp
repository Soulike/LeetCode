/*
 * @lc app=leetcode id=1002 lang=cpp
 *
 * [1002] Find Common Characters
 */
#include <string>
#include <unordered_map>
#include <vector>

using std::string;
using std::unordered_map;
using std::vector;

// @lc code=start
class Solution {
 public:
  vector<string> commonChars(const vector<string>& words) {
    const int N = words.size();
    vector<unordered_map<char, int>> wordsLetterToFreq(2);
    for (const auto c : words[0]) {
      wordsLetterToFreq[0][c]++;
    }
    for (int i = 1; i < N; i++) {
      wordsLetterToFreq[i % 2].clear();
      for (const auto c : words[i]) {
        if (wordsLetterToFreq[i % 2][c] < wordsLetterToFreq[(i - 1) % 2][c])
          wordsLetterToFreq[i % 2][c]++;
      }
    }

    const auto& commonLetterToFreq = wordsLetterToFreq[(N - 1) % 2];
    vector<string> result;
    for (const auto& letterToFreq : commonLetterToFreq) {
      const auto letter = letterToFreq.first;
      const auto freq = letterToFreq.second;
      for (int i = 0; i < freq; i++) {
        result.push_back(string(1, letter));
      }
    }

    return result;
  }
};
// @lc code=end
