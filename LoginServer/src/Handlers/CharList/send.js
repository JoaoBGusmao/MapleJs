import { PacketWriter } from 'mapleendian';
import { SEND_OPCODES } from '../../Base/constants';

export const setCharEquips = (Writer, character) => {
  Writer.write(255);
  Writer.write(255);
  Writer.writeInt(0);
  Writer.writeInt(0);
  Writer.writeInt(0);
  Writer.writeInt(0);
};

export const setCharLook = (Writer, character) => {
  Writer.write(character.gender);
  Writer.write(character.skin);
  Writer.writeInt(character.face);
  Writer.write(1);
  Writer.writeInt(character.hair); // hair
  setCharEquips(Writer, character);
};

export const setCharStats = (Writer, character) => {
  Writer.writeInt(character.id);
  Writer.writeString(character.name, 13);
  Writer.write(character.gender);
  Writer.write(character.skin);
  Writer.writeInt(character.face);
  Writer.writeInt(character.hair);
  // Pet
  Writer.writeLong(0);
  Writer.writeLong(0);
  Writer.writeLong(0);
  // End Pet
  Writer.write(character.level);
  Writer.writeShort(character.job);
  Writer.writeShort(character.str);
  Writer.writeShort(character.dex);
  Writer.writeShort(character.int);
  Writer.writeShort(character.luk);
  Writer.writeShort(character.hp);
  Writer.writeShort(character.maxHp);
  Writer.writeShort(character.mp);
  Writer.writeShort(character.maxMp);
  Writer.writeShort(character.ap);
  Writer.writeShort(character.sp);
  Writer.writeInt(character.exp);
  Writer.writeShort(character.fame);
  Writer.writeInt(0);
  Writer.writeInt(character.map);
  Writer.write(character.spawnPoint);
  Writer.writeInt(0);
};

export const setCharacterInformation = (Writer, character) => {
  setCharStats(Writer, character);
  setCharLook(Writer, character);
  Writer.write(0);
  Writer.write(1);
  Writer.writeInt(1);
  Writer.writeInt(1);
  Writer.writeInt(1);
  Writer.writeInt(1);
};

export const CharList = (characters) => {
  const Writer = new PacketWriter(SEND_OPCODES.CHAR_LIST);
  Writer.write(0);
  Writer.write(characters.length);
  characters.forEach(character => setCharacterInformation(Writer, character));
  Writer.write(2);
  Writer.writeInt(3);

  return Writer.getBufferCopy();
};
