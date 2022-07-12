/**
 * Design a Fence API, which should satisfy the following requirements:
 * 1. Every Fence object has a boolean result, you can call its instance method check() to get the result.
 * 2. Fence also has methods like Fence.and(), Fence.or(), Fence.not() to let you combine multi fences into one new Fence
 *    and this new Fence just like a logical expression of the multi fences.
 * 3. You couldn't directly check the result in above 3 methods (and, or, not)
 *
 * API definition:
 * public Fence(boolean result); // let you create a fence, and its' check result is boolean result
 
 * Fence fence = Fence.and(Fence... fences); // let you create a and group fence

 * Fence fence = Fence.or(Fence... fences); // let you create a or group fence
 * Fence fence = Fence.not(Fence fence); // let you create a not fence
 
 * Boolean result = fence.check(); // check the result of a fence object
 *
 * E.g.  
 *  Fence fence1 = new Fence(true)
 *  Fence fence2 = new Fence(false)
 *  Fence fence3 = new Fence(false)
 *  Fence fence4 = new Fence(true)
 *  Fence fence5 = new Fence(false)
 *  Fence fence6 = new Fence(false)
 *
 *  Fence groupFence1 = Fence.and(fence1, fence2, fence3);
 *  Fence groupFence2 = Fence.or(fence4, Fence.not(fence5));
 
 *
 *  Fence finalFence = Fence.or(groupFence1, groupFence2, fence6);
 
 
 *  boolean value = finalFence.check();
 *
 *  finalFence just like a logical expression:
 *  ( (fence1 && fence2 && fence3) || (fence4 || !fence5) || fence6 )
 
 *  when we call finalFence.check() is just like to calculate the result of below expresion: 
 *  ( (fence1.check() && fence2.check() && fence3.check()) || (fence4.check() || !fence5.check()) || fence6.check() )
 *
 *  And of course, we could also call check in a simple fence directly too, like :
 *  Fence fence = new Fence(true)
 *  fence.check();
 */

class Fence {
    #bool: boolean;
    #queue: Fence[];
    #type: 'and' | 'or' | 'not' | null;

    constructor(bool: boolean) {
        this.#bool = bool;
        this.#type = null;
        this.#queue = [];
    }

    check(): boolean {
        if (this.#type === null) {
            return this.#bool;
        } else if (this.#type === 'not') {
            return !this.#queue[0].check();
        } else if (this.#type === 'and') {
            return this.#queue.reduce(
                (prev: boolean, curr: Fence) => prev && curr.check(),
                true,
            );
        } // this.#type === 'or'
        else {
            return this.#queue.reduce(
                (prev: boolean, curr: Fence) => prev || curr.check(),
                false,
            );
        }
    }

    static and(...fences: Fence[]) {
        const newFence = new Fence(true);
        newFence.#type = 'and';

        for (const fence of fences) {
            newFence.#queue.push(fence);
        }

        return newFence;
    }

    static or(...fences: Fence[]) {
        const newFence = new Fence(true);
        newFence.#type = 'or';

        for (const fence of fences) {
            newFence.#queue.push(fence);
        }

        return newFence;
    }

    static not(fence: Fence) {
        const newFence = new Fence(true);
        newFence.#type = 'not';

        newFence.#queue.push(fence);

        return newFence;
    }
}

const fence1 = new Fence(true);
const fence2 = new Fence(false);
const fence3 = new Fence(false);
const fence4 = new Fence(true);
const fence5 = new Fence(false);
const fence6 = new Fence(false);

const groupFence1 = Fence.and(fence1, fence2, fence3);
const groupFence2 = Fence.or(fence4, Fence.not(fence5));

console.log(groupFence1.check());

console.log(groupFence2.check());

const finalFence = Fence.or(groupFence1, groupFence2, fence6);

const value = finalFence.check();

console.log(value);
