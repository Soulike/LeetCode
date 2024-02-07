/*
 * @lc app=leetcode id=451 lang=cpp
 *
 * [451] Sort Characters By Frequency
 */
#include <string>
#include <map>
#include <vector>
#include <algorithm>

using std::map;
using std::pair;
using std::string;
using std::vector;
// @lc code=start
bool letterToFreqsComp(pair<char, int> a, pair<char, int> b)
{
    return a.second > b.second;
}

class Solution
{
public:
    string frequencySort(string s)
    {
        map<char, int> letterToFreqs;
        for (char c : s)
        {
            letterToFreqs[c]++;
        }
        vector<pair<char, int>> letterToFreqsArr(letterToFreqs.begin(), letterToFreqs.end());
        std::sort(letterToFreqsArr.begin(), letterToFreqsArr.end(), letterToFreqsComp);

        string result;

        for (auto pair : letterToFreqsArr)
        {
            char letter = pair.first;
            int freq = pair.second;
            for (int i = 0; i < freq; i++)
            {
                result += letter;
            }
        }

        return result;
    }
};
// @lc code=end
