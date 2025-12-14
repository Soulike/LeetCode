/*
 * @lc app=leetcode id=2147 lang=cpp
 *
 * [2147] Number of Ways to Divide a Long Corridor
 */

#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  int numberOfWays(const std::string& corridor) {
    static constexpr char kSeat = 'S';
    static constexpr char kPlant = 'P';
    static constexpr int kInvalidIndex = -1;
    static constexpr int kMod = 1e9 + 7;

    std::vector<Segment> segments;

    int seat1 = kInvalidIndex;

    for (int i = 0; i < corridor.size(); i++) {
      if (corridor[i] == kPlant) {
        continue;
      }
      if (corridor[i] == kSeat) {
        if (seat1 == kInvalidIndex) {
          seat1 = i;
        } else {
          segments.emplace_back(seat1, i);
          seat1 = kInvalidIndex;
        }
      }
    }

    if (
        // Lasts an orphan seat
        seat1 != kInvalidIndex ||
        // Or No segment is found at all.
        segments.empty()) {
      return 0;
    }

    std::int64_t number_of_ways = 1;
    for (int i = 1; i < segments.size(); i++) {
      const auto& [begin1, end1] = segments[i - 1];
      const auto& [begin2, end2] = segments[i];
      number_of_ways *= begin2 - end1;
      number_of_ways %= kMod;
    }

    return number_of_ways;
  }

 private:
  struct Segment {
    int begin;
    int end;  // inclusive
  };
};
// @lc code=end

int main() {
  Solution sol;
  sol.numberOfWays(
      "SPPPPPPPSPPPSPSSSPPPPPPPPPPPPPPPPPSPPPPPPPPPPPPPPPPSPPPPPSPSPPPPPPSPSPPS"
      "PSPPPSPSPPSSPPPPPSPPSSPP");
}