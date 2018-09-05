/* Business logic of ServerStatus
 * Handler name: ServerStatusRequestHandler
 *
 * This handle is responsable to show the
 * world status
 *
 * Received:
 * - nothing
 *
 * Expected:
 * - World status
 */

export default async (reader, client) => {
  try {
    // This handle wont be fully done now
    client.write(Buffer.from([0x03, 0x00, 0x00, 0x00]));
  } catch (err) {
    return [];
  }
};
