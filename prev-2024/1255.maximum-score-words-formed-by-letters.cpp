/*
 * @lc app=leetcode id=1255 lang=cpp
 *
 * [1255] Maximum Score Words Formed by Letters
 */

#include <string>
#include <unordered_map>
#include <unordered_set>
#include <vector>

using std::string;
using std::unordered_map;
using std::unordered_set;
using std::vector;

// @lc code=start
class Solution {
 public:
  int maxScoreWords(const vector<string>& words,
                    vector<char>& letters,
                    const vector<int>& letterToScore) {
    for (const char& letter : letters) {
      currentLetterToFreq[letter]++;
    }

    backtrack(words, letterToScore, 0);

    return maxScore;
  }

 private:
  vector<string> currentWords;
  unordered_map<char, int> currentLetterToFreq;
  int maxScore = 0;

  void backtrack(const vector<string>& words,
                 const vector<int>& letterToScore,
                 int startIndex) {
    int currentScore = calculateScore(currentWords, letterToScore);
    if (currentScore > maxScore) {
      maxScore = currentScore;
    }

    for (int i = startIndex; i < words.size(); i++) {
      const string& word = words[i];
      if (canUseWord(word)) {
        deductWordLetterFreq(word);
        currentWords.push_back(word);

        backtrack(words, letterToScore, i + 1);

        currentWords.pop_back();
        appendWordLetterFreq(word);
      }
    }
  }

  int calculateScore(const vector<string>& words,
                     const vector<int>& letterToScore) {
    int scoreSum = 0;
    for (const string& word : words) {
      for (const char& letter : word) {
        scoreSum += letterToScore[letter - 'a'];
      }
    }

    return scoreSum;
  }

  bool canUseWord(const string& word) {
    auto currentLetterToFreqCopy = currentLetterToFreq;
    for (const char& letter : word) {
      if (currentLetterToFreqCopy[letter] <= 0) {
        return false;
      }
      currentLetterToFreqCopy[letter]--;
    }
    return true;
  }

  void deductWordLetterFreq(const string& word) {
    for (const char& letter : word) {
      currentLetterToFreq[letter]--;
    }
  }

  void appendWordLetterFreq(const string& word) {
    for (const char& letter : word) {
      currentLetterToFreq[letter]++;
    }
  }
};
// @lc code=end

int main() {
  Solution sol;
  vector<string> words = {"e", "bac", "baeba", "eb", "bbbbd", "cad", "c", "c"};
  vector<char> letters = {'a', 'a', 'a', 'a', 'a', 'a', 'a', 'b', 'b', 'b',
                          'b', 'b', 'b', 'c', 'c', 'c', 'c', 'c', 'c', 'd',
                          'd', 'd', 'd', 'd', 'd', 'd', 'e', 'e', 'e', 'e'};
  vector<int> score = {8, 4, 6, 8, 5, 0, 0, 0, 0, 0, 0, 0, 0,
                       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
  sol.maxScoreWords(words, letters, score);
}