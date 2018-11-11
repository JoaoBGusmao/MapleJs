import { CharList } from './send';

/* Business logic of CharList
 * Handler name: CharListRequestHandler
 *
 * This handle is responsable to show the
 * list of players in a world
 *
 * Received:
 * - nothing
 *
 * Expected:
 * - char list
 */

export default async (reader, client) => {
  try {
    // This handle wont be fully done now
    const characters = [
      {
        id: 1,
        name: 'Chuck',
        gender: 0,
        skin: 0,
        face: 20012,
        hair: 30415,
        level: 100,
        job: 420,
        str: 10,
        dex: 10,
        int: 10,
        luk: 10,
        hp: 1000,
        maxHp: 1000,
        mp: 1000,
        maxMp: 1000,
        ap: 10,
        sp: 10,
        exp: 100000,
        fame: 100,
        map: 910000000,
        spawnPoint: 2,
      },
    ];

    client.write(CharList(characters));
  } catch (err) {
    console.log(err);
    return [];
  }
};
