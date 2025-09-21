/*
 * @lc app=leetcode id=1912 lang=cpp
 *
 * [1912] Design Movie Rental System
 */

#include <format>
#include <set>
#include <unordered_map>
#include <vector>

// @lc code=start
class MovieRentingSystem {
  using Movie = int;
  using Shop = int;
  using Price = int;
  using MovieCopyIndex = size_t;

  struct MovieCopy {
    Movie movie;
    Shop shop;
    Price price;

    MovieCopy(const Movie movie, const Shop shop, const Price price)
        : movie(movie), shop(shop), price(price) {}

    MovieCopy(const MovieCopy& other) = delete;
    MovieCopy& operator=(const MovieCopy& other) = delete;

    MovieCopy(MovieCopy&& other) noexcept = default;
    MovieCopy& operator=(MovieCopy&& other) noexcept = default;
  };

 public:
  MovieRentingSystem(const int n, const std::vector<std::vector<int>>& entries)
      : movie_copy_index_comp_(this),
        rented_movie_copy_indexes_(movie_copy_index_comp_) {
    shop_movie_to_movie_copy_index_.reserve(n);
    movie_copies_.reserve(entries.size());

    for (const auto& entry : entries) {
      const Shop shop = entry[0];
      const Movie movie = entry[1];
      const Price price = entry[2];
      movie_copies_.emplace_back(movie, shop, price);
    }

    for (MovieCopyIndex i = 0; i < movie_copies_.size(); ++i) {
      const Shop shop = movie_copies_[i].shop;
      const Movie movie = movie_copies_[i].movie;

      shop_movie_to_movie_copy_index_[shop][movie] = i;

      if (!movie_to_unrented_movie_copy_indexes_.contains(movie)) {
        movie_to_unrented_movie_copy_indexes_.emplace(
            movie, std::set<MovieCopyIndex, MovieCopyIndexComp>(
                       movie_copy_index_comp_));
      }
      movie_to_unrented_movie_copy_indexes_.at(movie).insert(i);
    }
  }

  std::vector<Shop> search(const int movie) {
    std::vector<Shop> result;

    if (!movie_to_unrented_movie_copy_indexes_.contains(movie)) {
      return result;
    }

    const auto& movie_copy_indexes =
        movie_to_unrented_movie_copy_indexes_.at(movie);

    for (const MovieCopyIndex index : movie_copy_indexes) {
      result.push_back(movie_copies_[index].shop);
      if (result.size() == 5) {
        break;
      }
    }

    return result;
  }

  void rent(const Shop shop, const Movie movie) {
    const MovieCopyIndex target_movie_copy_index =
        shop_movie_to_movie_copy_index_.at(shop).at(movie);
    movie_to_unrented_movie_copy_indexes_.at(movie).erase(
        target_movie_copy_index);

    rented_movie_copy_indexes_.insert(target_movie_copy_index);
  }

  void drop(const Shop shop, const Movie movie) {
    const MovieCopyIndex target_index =
        shop_movie_to_movie_copy_index_.at(shop).at(movie);
    rented_movie_copy_indexes_.erase(target_index);

    if (!movie_to_unrented_movie_copy_indexes_.contains(movie)) {
      movie_to_unrented_movie_copy_indexes_.emplace(
          movie,
          std::set<MovieCopyIndex, MovieCopyIndexComp>(movie_copy_index_comp_));
    }
    movie_to_unrented_movie_copy_indexes_.at(movie).insert(target_index);
  }

  [[nodiscard]] std::vector<std::vector<int>> report() const {
    std::vector<std::vector<int>> result;

    for (const MovieCopyIndex index : rented_movie_copy_indexes_) {
      result.push_back({movie_copies_[index].shop, movie_copies_[index].movie});
      if (result.size() == 5) {
        break;
      }
    }

    return result;
  }

 private:
  struct MovieCopyIndexComp {
   public:
    explicit MovieCopyIndexComp(const MovieRentingSystem* movie_renting_system)
        : movie_renting_system_(movie_renting_system) {}

    bool operator()(const MovieCopyIndex index1,
                    const MovieCopyIndex index2) const {
      const auto& movie_copies = movie_renting_system_->movie_copies_;
      const MovieCopy& movie_copy1 = movie_copies[index1];
      const MovieCopy& movie_copy2 = movie_copies[index2];
      if (movie_copy1.price != movie_copy2.price) {
        return movie_copy1.price < movie_copy2.price;
      }
      if (movie_copy1.shop != movie_copy2.shop) {
        return movie_copy1.shop < movie_copy2.shop;
      }
      return movie_copy1.movie < movie_copy2.movie;
    }

   private:
    const MovieRentingSystem* movie_renting_system_;
  };

  MovieCopyIndexComp movie_copy_index_comp_;

  // Core data storage: all movie copies indexed by MovieCopyIndex
  std::vector<MovieCopy> movie_copies_;

  // Fast lookup: (shop, movie) -> MovieCopyIndex for O(1) rent/drop operations
  std::unordered_map<Shop, std::unordered_map<Movie, MovieCopyIndex>>
      shop_movie_to_movie_copy_index_;

  // Unrented movie copies organized by movie (sorted by price, shop, movie) -
  // used for search()
  std::unordered_map<Movie, std::set<MovieCopyIndex, MovieCopyIndexComp>>
      movie_to_unrented_movie_copy_indexes_;

  // All rented movie copies globally (sorted by price, shop, movie) - used for
  // report()
  std::set<MovieCopyIndex, MovieCopyIndexComp> rented_movie_copy_indexes_;
};

/**
 * Your MovieRentingSystem object will be instantiated and called as such:
 * MovieRentingSystem* obj = new MovieRentingSystem(n, entries);
 * vector<int> param_1 = obj->search(movie);
 * obj->rent(shop,movie);
 * obj->drop(shop,movie);
 * vector<vector<int>> param_4 = obj->report();
 */
// @lc code=end
