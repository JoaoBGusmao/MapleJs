import EnterChannelWrite from './EnterChannel.write';

describe('Enter Channel', () => {
  const character = {
    name: 'Chuck',
    gender: 0,
    job: 0,
    level: 15,
    exp: 0,
    fame: 0,
    skin: 0,
    hair: 30415,
    face: 20022,
    SP: 10,
    AP: 10,
    STR: 13,
    DEX: 13,
    INT: 13,
    LUK: 13,
    HP: 150,
    max_HP: 150,
    MP: 150,
    max_MP: 150,
    map: 910000000,
    spawn_point: 0,
    inventory: {
      EQUIPPED: {
        slots: 15,
        items: {
          0: { itemId: 100100 },
        },
      },
      EQUIP: {
        slots: 15,
        items: {
          0: { itemId: 100100 },
        },
      },
      USE: {
        slots: 15,
        items: {
          0: { itemId: 100100 },
        },
      },
      SETUP: {
        slots: 15,
        items: {
          0: { itemId: 100100 },
        },
      },
      ETC: {
        slots: 15,
        items: {
          0: { itemId: 100100 },
        },
      },
      CASH: {
        slots: 15,
        items: {
          0: { itemId: 100100 },
        },
      },
    },
    skills: [
      { skillId: 100100, level: 10, masterLevel: 10 },
      { skillId: 100100, level: 10, masterLevel: 10 },
      { skillId: 100100, level: 10, masterLevel: 10 },
    ],
    cooldown: [
      { skillId: 100100, timeStart: 0 },
    ],
    quests: [],
    rings: [],
    teleport: [],
    monsterBook: {
      cover: 0,
      cards: [],
    },
    areaInfo: [], // search more about it
  };

  const enterChannel = EnterChannelWrite({ character });
  const result = [0x7D, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x01, 0x00, 0x00, 0xAE, 0x59, 0xA7, 0xEF, 0x92, 0xFE, 0x7A, 0x41, 0x8A, 0x4B, 0xD1, 0x72, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x00, 0x01, 0x00, 0x00, 0x00, 0x43, 0x68, 0x75, 0x63, 0x6B, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xBE, 0x5A, 0x00, 0x00, 0x8F, 0x84, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x32, 0x64, 0x00, 0xE7, 0x03, 0xE7, 0x03, 0xE7, 0x03, 0xE7, 0x03, 0x00, 0x0D, 0x00, 0x0D, 0x54, 0x0D, 0x54, 0x0D, 0x0E, 0x01, 0x11, 0x00, 0x00, 0x00, 0x00, 0x00, 0x8C, 0x03, 0xA0, 0x86, 0x01, 0x00, 0x10, 0x27, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00, 0x00, 0x19, 0x01, 0x0B, 0x00, 0x4D, 0x65, 0x72, 0x64, 0x61, 0x44, 0x65, 0x4A, 0x6F, 0x67, 0x6F, 0x4E, 0x38, 0x25, 0x00, 0x60, 0x60, 0x60, 0x60, 0x60, 0x00, 0x40, 0xE0, 0xFD, 0x3B, 0x37, 0x4F, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF, 0xC9, 0x9A, 0x3B, 0xFF, 0xC9, 0x9A, 0x3B, 0xFF, 0xC9, 0x9A, 0x3B, 0xFF, 0xC9, 0x9A, 0x3B, 0xFF, 0xC9, 0x9A, 0x3B, 0xFF, 0xC9, 0x9A, 0x3B, 0xFF, 0xC9, 0x9A, 0x3B, 0xFF, 0xC9, 0x9A, 0x3B, 0xFF, 0xC9, 0x9A, 0x3B, 0xFF, 0xC9, 0x9A, 0x3B, 0xFF, 0xC9, 0x9A, 0x3B, 0xFF, 0xC9, 0x9A, 0x3B, 0xFF, 0xC9, 0x9A, 0x3B, 0xFF, 0xC9, 0x9A, 0x3B, 0xFF, 0xC9, 0x9A, 0x3B, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x30, 0xC3, 0x41, 0xF5, 0xD2, 0x81, 0xD4, 0x01];
  expect([...enterChannel]).toBe(result);
});
