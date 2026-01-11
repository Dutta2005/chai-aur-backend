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
