/*
 * @lc app=leetcode id=2353 lang=javascript
 *
 * [2353] Design a Food Rating System
 */

// @lc code=start
/**
 * @typedef {string} Food
 * @typedef {string} Cuisine
 * @typedef {number} Rating
 */

class FoodRatings {
    /** @type {Map<Cuisine, Food[]>} */
    #cuisineToFoods;
    /** @type {Map<Food,Cuisine[]>} */
    #foodToCuisines;
    /** @type {Map<Food, Rating>} */
    #foodToRating;
    /** @type {Map<Cuisine, [Rating, Food]>} */
    #cuisineHighestRatingFoodCache;

    /**
     * @param {Food[]} foods
     * @param {Cuisine[]} cuisines
     * @param {Rating[]} ratings
     */
    constructor(foods, cuisines, ratings) {
        this.#cuisineToFoods = new Map();
        this.#foodToCuisines = new Map();
        this.#foodToRating = new Map();
        this.#cuisineHighestRatingFoodCache = new Map();

        const N = foods.length;
        for (let i = 0; i < N; i++) {
            const food = foods[i];
            const cuisine = cuisines[i];
            const rating = ratings[i];

            if (!this.#cuisineToFoods.has(cuisine)) {
                this.#cuisineToFoods.set(cuisine, []);
            }
            this.#cuisineToFoods.get(cuisine)?.push(food);

            if (!this.#foodToCuisines.has(food)) {
                this.#foodToCuisines.set(food, []);
            }
            this.#foodToCuisines.get(food)?.push(cuisine);

            this.#foodToRating.set(food, rating);
        }
    }

    /**
     * @param {Cuisine} food
     * @param {Rating} newRating
     * @return {void}
     */
    changeRating(food, newRating) {
        this.#foodToRating.set(food, newRating);

        const foodCuisines = this.#foodToCuisines.get(food) ?? [];

        for (const cuisine of foodCuisines) {
            if (!this.#cuisineHighestRatingFoodCache.has(cuisine)) {
                return;
            }

            const [highestRating, highestRatingFood] =
                this.#cuisineHighestRatingFoodCache.get(cuisine) ?? [0, ''];
            if (
                newRating > highestRating ||
                (newRating === highestRating && food < highestRatingFood)
            ) {
                this.#cuisineHighestRatingFoodCache.set(cuisine, [
                    newRating,
                    food,
                ]);
            } else if (
                highestRatingFood === food &&
                newRating < highestRating
            ) {
                this.#cuisineHighestRatingFoodCache.delete(cuisine);
            }
        }
    }

    /**
     * @param {Cuisine} cuisine
     * @return {Food}
     */
    highestRated(cuisine) {
        if (this.#cuisineHighestRatingFoodCache.has(cuisine)) {
            return this.#cuisineHighestRatingFoodCache.get(cuisine)[1];
        }

        const foods = this.#cuisineToFoods.get(cuisine) ?? [];

        let highestRatedFoodIndex = -1;
        let highestRating = -1;

        for (let i = 0; i < foods.length; i++) {
            const food = foods[i];
            const rating = this.#foodToRating.get(food) ?? 0;
            if (rating > highestRating) {
                highestRatedFoodIndex = i;
                highestRating = rating;
            } else if (
                rating === highestRating &&
                food < foods[highestRatedFoodIndex]
            ) {
                highestRatedFoodIndex = i;
            }
        }

        this.#cuisineHighestRatingFoodCache.set(cuisine, [
            highestRating,
            foods[highestRatedFoodIndex],
        ]);

        return foods[highestRatedFoodIndex];
    }
}

/**
 * Your FoodRatings object will be instantiated and called as such:
 * var obj = new FoodRatings(foods, cuisines, ratings)
 * obj.changeRating(food,newRating)
 * var param_2 = obj.highestRated(cuisine)
 */
// @lc code=end

const foodRatings = new FoodRatings(
    ['czopaaeyl', 'lxoozsbh', 'kbaxapl'],
    ['dmnuqeatj', 'dmnuqeatj', 'dmnuqeatj'],
    [11, 2, 15],
);

foodRatings.changeRating('czopaaeyl', 12);
foodRatings.highestRated('dmnuqeatj');
foodRatings.changeRating('kbaxapl', 8);
foodRatings.changeRating('lxoozsbh', 5);
foodRatings.highestRated('dmnuqeatj');
