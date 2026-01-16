/** Problem
Given a rows x cols binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.
Example 1:
Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
Output: 6
Explanation: The maximal rectangle is shown in the above picture.
Example 2:
Input: matrix = [["0"]]
Output: 0
Example 3:
Input: matrix = [["1"]]
Output: 1
**/

class Solution {
    private largestRectangleArea(heights: number[]): number {
        const n = heights.length;
        const stack: number[] = [];
        let maxi = 0;

        for (let i = 0; i < n; i++) {
            while (stack.length > 0 && heights[stack[stack.length - 1]] > heights[i]) {
                const ele = stack.pop()!;
                const nse = i;
                const pse = stack.length === 0 ? -1 : stack[stack.length - 1];
                maxi = Math.max(maxi, heights[ele] * (nse - pse - 1));
            }
            stack.push(i);
        }

        while (stack.length > 0) {
            const ele = stack.pop()!;
            const nse = n;
            const pse = stack.length === 0 ? -1 : stack[stack.length - 1];
            maxi = Math.max(maxi, heights[ele] * (nse - pse - 1));
        }

        return maxi;
    }

    maximalRectangle(matrix: string[][]): number {
        const r = matrix.length;
        if (r === 0) return 0;

        const c = matrix[0].length;
        let maxi = 0;

        const histo: number[] = new Array(c).fill(0);

        for (let i = 0; i < r; i++) {
            for (let j = 0; j < c; j++) {
                if (matrix[i][j] === '1') histo[j] += 1;
                else histo[j] = 0;
            }
            maxi = Math.max(maxi, this.largestRectangleArea(histo));
        }

        return maxi;
    }
}

/**Problem
You are given a 2D integer array squares. Each squares[i] = [xi, yi, li] represents the coordinates of the bottom-left point and the side length of a square parallel to the x-axis.
Find the minimum y-coordinate value of a horizontal line such that the total area of the squares above the line equals the total area of the squares below the line.
Answers within 10-5 of the actual answer will be accepted.
Note: Squares may overlap. Overlapping areas should be counted multiple times.
Example 1:
Input: squares = [[0,0,1],[2,2,1]]
Output: 1.00000
Explanation:
Any horizontal line between y = 1 and y = 2 will have 1 square unit above it and 1 square unit below it. The lowest option is 1.
Example 2:
Input: squares = [[0,0,2],[1,1,1]]
Output: 1.16667
Explanation:
The areas are:
Below the line: 7/6 * 2 (Red) + 1/6 (Blue) = 15/6 = 2.5.
Above the line: 5/6 * 2 (Red) + 5/6 (Blue) = 15/6 = 2.5.
Since the areas above and below the line are equal, the output is 7/6 = 1.16667.
**/
var separateSquares = function(squares) {
    let totalArea = 0;
    let minY = Infinity, maxY = -Infinity;

    for (const [x, y, l] of squares) {
        totalArea += l * l;
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y + l);
    }

    const half = totalArea / 2;

    function areaBelow(h) {
        let area = 0;
        for (const [x, y, l] of squares) {
            const bottom = y;
            const top = y + l;

            if (h <= bottom) continue;
            if (h >= top) {
                area += l * l;
            } else {
                area += l * (h - bottom);
            }
        }
        return area;
    }

    let left = minY, right = maxY;

    for (let i = 0; i < 80; i++) {
        const mid = (left + right) / 2;
        if (areaBelow(mid) < half) {
            left = mid;
        } else {
            right = mid;
        }
    }

    return left;
};

/**
You are given the two integers, n and m and two integer arrays, hBars and vBars. The grid has n + 2 horizontal and m + 2 vertical bars, creating 1 x 1 unit cells. The bars are indexed starting from 1.
You can remove some of the bars in hBars from horizontal bars and some of the bars in vBars from vertical bars. Note that other bars are fixed and cannot be removed.
Return an integer denoting the maximum area of a square-shaped hole in the grid, after removing some bars (possibly none).
Example 1:
Input: n = 2, m = 1, hBars = [2,3], vBars = [2]
Output: 4
Explanation:
The left image shows the initial grid formed by the bars. The horizontal bars are [1,2,3,4], and the vertical bars are [1,2,3].
One way to get the maximum square-shaped hole is by removing horizontal bar 2 and vertical bar 2.
Example 2:
Input: n = 1, m = 1, hBars = [2], vBars = [2]
Output: 4
Explanation:
To get the maximum square-shaped hole, we remove horizontal bar 2 and vertical bar 2.
Example 3:
Input: n = 2, m = 3, hBars = [2,3], vBars = [2,4]
Output: 4
Explanation:
One way to get the maximum square-shaped hole is by removing horizontal bar 3, and vertical bar 4.
Constraints:
1 <= n <= 109
1 <= m <= 109
1 <= hBars.length <= 100
2 <= hBars[i] <= n + 1
1 <= vBars.length <= 100
2 <= vBars[i] <= m + 1
All values in hBars are distinct.
All values in vBars are distinct.
**/
/**
 * @param {number} n
 * @param {number} m
 * @param {number[]} hBars
 * @param {number[]} vBars
 * @return {number}
 */
var maximizeSquareHoleArea = function(n, m, hBars, vBars) {
    function findLen(bars) {
        bars.sort((a, b) => a - b);
        const bz = bars.length;
        let len = 1, maxLen = 1;
        for (let i = 0; i < bz - 1; i++) {
            if (bars[i] + 1 === bars[i + 1]) len++;
            maxLen = Math.max(len, maxLen);
        }
        return maxLen;
    }
    const l = 1 + Math.min(findLen(hBars), findLen(vBars));
    return l * l;
};
