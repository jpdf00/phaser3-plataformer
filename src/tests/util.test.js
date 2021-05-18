// eslint-disable-next-line no-unused-vars
import { screen } from '@testing-library/jest-dom';

const util = require('../scenes/util.js');

describe('Sort Array Function', () => {
  const array = [
    { user: 'One', score: 1 },
    { user: 'Two', score: 2 },
    { user: 'Three', score: 3 },
  ];
  const sortedArray = util.sortArray(array);

  test('it should sort an array of objects by descending order of the score', () => {
    expect(sortedArray[0].score).toBe(3);
  });

  test('it should sort an array of objects by descending order of the score', () => {
    expect(sortedArray[1].score).toBe(2);
  });

  test('it should sort an array of objects by descending order of the score', () => {
    expect(sortedArray[2].score).toBe(1);
  });
});

describe('Save Score Function', () => {
  test('it should save the score to the leaderboard', () => {
    util.saveScore('jpdf00', 10).then((resp) => {
      expect(resp.result).toBe('Leaderboard score created correctly.');
    });
  });

  test('it should save the score to the leaderboard', () => {
    util.saveScore('jpdf00', 10).then((resp) => {
      expect(resp.result).not.toBe('');
    });
  });
});

describe('Get Score Function', () => {
  test('it should save the score to the leaderboard', () => {
    util.getScore().then((resp) => {
      expect(resp.result.length).toBeGreaterThan(0);
    });
  });

  test('it should save the score to the leaderboard', () => {
    util.getScore().then((resp) => {
      expect(resp.result.length).not.toBe(0);
    });
  });
});
