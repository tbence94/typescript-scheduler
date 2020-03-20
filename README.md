# typescript-scheduler

A small test project that solves an interesting google interview question in two possible ways.

The original interview explains the problem:
https://www.youtube.com/watch?v=3Q_oYDQ2whs

## My motivation
I wrote this project because i like to solve these kind of "puzzles".
I like to optimize algorithms and try to reduce their time complexity.
And as an additional advantage i got to play with `typescript`, and `nyc`.

## About the solutions

### `soltuions-v1.ts`
- Less lines of code
- Complexity: O(n * m) (Slower solution)
- Might be more trivial than the second solution

### `soltuions-v2.ts`
- More lines of code
- Complexity: O(n + m) (Faster solution)
- Less conversion between strings and integers

## Testing

Each solution has a 100% test coverage.

Plus I create a `comparison.test.ts` just to be able to examine
the coverage of each solution for the same input that is randomly generated and large.
For large inputs the coverage can show which lines were executed more. 
