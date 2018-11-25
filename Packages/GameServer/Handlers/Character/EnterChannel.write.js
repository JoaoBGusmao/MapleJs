import { PacketWriter } from 'mapleendian';
import { SEND_OPCODES } from '../../Base/constants';
import { setCharacterStats } from '../../../LoginServer/Handlers/Character/Character.write';

const setAreaInformation = (Writer, character) => {
  Writer.writeShort(0);
};

const setNewYearInformation = (Writer, character) => {
  Writer.writeShort(0);
};

const setMonsterBookInformation = (Writer, character) => {
  Writer
    .writeInt(0)
    .write(0)
    .writeShort(0);
};

const setTeleportInformation = (Writer, character) => {
  Writer
    .writeInt(0)
    .writeInt(0)
    .writeInt(0)
    .writeInt(0)
    .writeInt(0)
    .writeInt(0)
    .writeInt(0)
    .writeInt(0)
    .writeInt(0)
    .writeInt(0)
    .writeInt(0)
    .writeInt(0)
    .writeInt(0)
    .writeInt(0)
    .writeInt(0);
};

const setRingInformation = (Writer, character) => {
  Writer
    .writeShort(0)
    .writeShort(0)
    .writeShort(0)
    .writeShort(0);
};

const setSkillInformation = (Writer, character) => {
  Writer
    .write(0)
    .writeShort(0)
    .writeShort(0);
};

const setQuestInformation = (Writer, character) => {
  Writer
    .writeShort(0)
    .writeShort(0);
};

const setMinigameInformationl = (Writer, character) => {
  Writer.writeShort(0)
};

const setInventoryInformation = (Writer, character) => {
  Writer
    .write(10)
    .write(10)
    .write(10)
    .write(10)
    .write(10)
    .writeLong(0)
    .writeShort(0)
    .writeShort(0)
    .writeInt(0)
    .write(0)
    .write(0)
    .write(0);
};

const setCharacterInformation = (Writer, character) => {
  Writer.writeLong(-1)
    .write(0);

  setCharacterStats(Writer, character);
  Writer.write(10);
  Writer.write(0);
  Writer.writeInt(100000);

  setInventoryInformation(Writer, character);
};

export default ({ character }) => {
  const Writer = new PacketWriter(SEND_OPCODES.SET_FIELD)
    .writeInt(0) // Channel ID
    .write(1)
    .write(1)
    .writeShort(0)
    .writeInt(0) // rnd
    .writeInt(0) // rnd
    .writeInt(0); // rnd

  setCharacterInformation(Writer, character);
  setSkillInformation(Writer, character);
  setQuestInformation(Writer, character);
  setMinigameInformationl(Writer, character);
  setRingInformation(Writer, character);
  setTeleportInformation(Writer, character);
  setMonsterBookInformation(Writer, character);
  setNewYearInformation(Writer, character);
  setAreaInformation(Writer, character);

  Writer.writeShort(0)
    .writeLong(Date.now());

  return Writer.getBufferCopy();
};
