import { getMakeCharInfo } from '../DataProcessor/Etc';

describe('getMakeCharInfo', () => {
  it('Should return right object', async () => {
    const result = await getMakeCharInfo();

    const expected = {
      CharMale: {
        0: [20000, 20001, 20002],
        1: [30030, 30020, 30000],
        2: [0, 7, 3, 2],
        3: [0, 1, 2, 3],
        4: [1040002, 1040006, 1040010],
        5: [1060002, 1060006],
        6: [1072001, 1072005, 1072037, 1072038],
        7: [1302000, 1322005, 1312004],
      },

      CharFemale: {
        0: [21000, 21001, 21002],
        1: [31000, 31040, 31050],
        2: [0, 7, 3, 2],
        3: [0, 1, 2, 3],
        4: [1041002, 1041006, 1041010, 1041011],
        5: [1061002, 1061008],
        6: [1072001, 1072005, 1072037, 1072038],
        7: [1302000, 1322005, 1312004],
      },
    };

    expect(result).toEqual(expected);
  });
});
