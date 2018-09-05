/* Business logic of ChatList
 * Handler name: ChatlistRequestHandler
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
    client.write(Buffer.from([0x0B, 0x00, 0x00, 0x00, 0x01, 0x03, 0x00, 0x00, 0x00]));
  } catch (err) {
    return [];
  }
};
