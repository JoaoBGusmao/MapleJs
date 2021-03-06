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
      portal: [
        {
          pn: 'sp',
          pt: 0,
          x: -93,
          y: 450,
          tm: 999999999,
          tn: '',
          delay: -1,
          hideTooltip: -1,
          onlyOnce: -1,
          horizontalImpact: -1,
          script: '',
        },
        {
          pn: 'sp',
          pt: 0,
          x: -114,
          y: 453,
          tm: 999999999,
          tn: '',
          hideTooltip: -1,
          onlyOnce: -1,
          script: '',
          horizontalImpact: -1,
          delay: -1,
        },
        {
          pn: 'sp',
          pt: 0,
          x: -89,
          y: 451,
          tm: 999999999,
          tn: '',
          hideTooltip: -1,
          onlyOnce: -1,
          script: '',
          horizontalImpact: -1,
          delay: -1,
        },
        {
          pn: 'out00',
          pt: 2,
          x: 1077,
          y: 480,
          tm: 20000,
          tn: 'in00',
          script: '',
          hideTooltip: 0,
          onlyOnce: 0,
          horizontalImpact: -1,
          delay: 0,
        },
        {
          pn: 'tuto00',
          pt: 9,
          x: -95,
          y: 428,
          tm: 999999999,
          tn: '',
          horizontalImpact: 0,
          script: 'tutoChatNPC',
          hideTooltip: 0,
          onlyOnce: 1,
          delay: 0,
        },
        {
          pn: 'tuto01',
          pt: 9,
          x: 280,
          y: 455,
          tm: 999999999,
          tn: '',
          horizontalImpact: 0,
          script: 'infoMinimap',
          hideTooltip: 0,
          onlyOnce: 1,
          delay: 0,
        },
        {
          pn: 'glBmsg0',
          pt: 9,
          x: 987,
          y: 430,
          tm: 999999999,
          tn: '',
          horizontalImpact: 0,
          script: 'glTutoMsg0',
          delay: -1,
          hideTooltip: -1,
          onlyOnce: -1,
        },
        {
          pn: 'glBmsg1',
          pt: 9,
          x: 1164,
          y: 431,
          tm: 999999999,
          tn: '',
          horizontalImpact: 0,
          script: 'glTutoMsg0',
          delay: -1,
          hideTooltip: -1,
          onlyOnce: -1,
        },
      ],
    };

    expect(result).toEqual(expected);
  });
});
