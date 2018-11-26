import { getMap } from '../DataProcessor/Map';

describe('get Map', () => {
  it('expect get map 10000 to match mock', async () => {
    const result = await getMap({ mapId: 10000 });
    const expected = {
      mapId: 10000,
      info: {
        returnMap: 10000,
      },
      life: [
        {
          type: 'n',
          id: '0002101',
          x: 130,
          y: 293,
          hide: 0,
          mobTime: 0,
          fh: 51,
          cy: 305,
          rx0: 116,
          rx1: 154,
          f: 1,
        },
        {
          type: 'n',
          id: '0002100',
          x: 833,
          y: 125,
          hide: 0,
          mobTime: 0,
          f: -1,
          fh: 9,
          cy: 125,
          rx0: 783,
          rx1: 883,
        },
        {
          type: 'n',
          id: '0002007',
          x: 1394,
          y: 121,
          mobTime: 0,
          f: 0,
          hide: 1,
          fh: 16,
          cy: 125,
          rx0: 1344,
          rx1: 1394,
        },
        {
          type: 'n',
          id: '9010003',
          x: 562,
          y: 365,
          mobTime: 0,
          f: 0,
          hide: 0,
          fh: 27,
          cy: 365,
          rx0: 56250,
          rx1: 512,
        },
      ],
    };

    expect(result).toEqual(expected);
  });
});
