import xml2js from 'xml2js';
import fs from 'fs';
import { promisify } from 'util';

let makeCharInfoCache;

const parser = new xml2js.Parser({
  attrkey: 'node',
});
const parserSync = promisify(parser.parseString);

export const getMakeCharInfo = async () => {
  try {
    if (makeCharInfoCache !== undefined) {
      return makeCharInfoCache;
    }

    const dataFile = 'DataServer/assets/Etc.wz/MakeCharInfo.img.xml';
    const loadedFile = fs.readFileSync(dataFile);
    const parsed = await parserSync(loadedFile);

    const charData = {};
    const imgdirNode = parsed.imgdir.imgdir;
    const InfoNode = imgdirNode.find(node => node.node.name === 'Info');

    InfoNode.imgdir.forEach((iNode) => {
      charData[iNode.node.name] = {};

      iNode.imgdir.forEach((idNode) => {
        const arr = idNode.int.map(int => parseInt(int.node.value, 10));

        charData[iNode.node.name][idNode.node.name] = arr;
      });
    });

    makeCharInfoCache = charData;

    return charData;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const nothing = () => {};
