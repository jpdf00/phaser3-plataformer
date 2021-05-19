import { saveScore, getScore, sortArray } from '../scenes/util.js';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve('Resolve'),
}));

beforeEach(() => {
  fetch.mockClear();
});

describe('Sort Array Function', () => {
  const array = [
    { user: 'One', score: 1 },
    { user: 'Two', score: 2 },
    { user: 'Three', score: 3 },
  ];
  const sortedArray = sortArray(array);

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
  test('it should save the score to the leaderboard', async () => {
    fetch.mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve('Leaderboard score created correctly.') }));
    await expect(saveScore('jpdf00', 10)).resolves.toEqual('Leaderboard score created correctly.');
  });

  test('it should not save the score to the leaderboard', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('API is Down')));
    await expect(saveScore('', '')).rejects.toThrow('API is Down');
  });
});

describe('Get Score Function', () => {
  test('it should get the score from the leaderboard', async () => {
    fetch.mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve({ user: 'jpdf00', score: 10 }) }));
    await expect(getScore()).resolves.toEqual({ user: 'jpdf00', score: 10 });
  });

  test('it should not get the score from the leaderboard', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('API is Down')));
    await expect(getScore()).rejects.toThrow('API is Down');
  });
});
