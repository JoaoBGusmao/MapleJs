/* eslint-disable import/prefer-default-export */
import xml2js from 'xml2js';
import fs from 'fs';
import { promisify } from 'util';
import findNode from '../Helpers/findNode';

const mapCache = [];

const parser = new xml2js.Parser({
  attrkey: 'node',
});
const parserSync = promisify(parser.parseString);

export const getMap = async ({ mapId }) => {
  const dataFile = 'Packages/DataServer/Assets/Map.wz/Map0/000010000.img.xml';
  const loadedFile = fs.readFileSync(dataFile);
  const parsed = await parserSync(loadedFile);

  const mapInformation = parsed.imgdir.imgdir;
  const infoNode = findNode(mapInformation, 'info');
  const lifeNode = findNode(mapInformation, 'life');
  const portalNode = findNode(mapInformation, 'portal');

  const life = lifeNode.imgdir.map(lifeObj => ({
    type: findNode(lifeObj.string, 'type').node.value || '',
    id: findNode(lifeObj.string, 'id').node.value || '',
    x: parseInt(findNode(lifeObj.int, 'x').node.value, 10),
    y: parseInt(findNode(lifeObj.int, 'y').node.value, 10),
    mobTime: parseInt(findNode(lifeObj.int, 'mobTime').node.value || 0, 10),
    f: parseInt(findNode(lifeObj.int, 'f').node.value || -1, 10),
    hide: parseInt(findNode(lifeObj.int, 'hide').node.value || 0, 10),
    fh: parseInt(findNode(lifeObj.int, 'fh').node.value, 10),
    cy: parseInt(findNode(lifeObj.int, 'cy').node.value, 10),
    rx0: parseInt(findNode(lifeObj.int, 'rx0').node.value, 10),
    rx1: parseInt(findNode(lifeObj.int, 'rx1').node.value, 10),
  }));

  const portal = portalNode.imgdir.map(portalObj => ({
    pn: findNode(portalObj.string, 'pn').node.value || '',
    pt: parseInt(findNode(portalObj.int, 'pt').node.value, 10),
    x: parseInt(findNode(portalObj.int, 'x').node.value, 10),
    y: parseInt(findNode(portalObj.int, 'y').node.value, 10),
    tm: parseInt(findNode(portalObj.int, 'tm').node.value, 10),
    tn: findNode(portalObj.string, 'tn').node.value || '',
    horizontalImpact: parseInt(findNode(portalObj.int, 'horizontalImpact').node.value || -1, 10),
    script: findNode(portalObj.string, 'script').node.value || '',
    hideTooltip: parseInt(findNode(portalObj.int, 'hideTooltip').node.value || -1, 10),
    onlyOnce: parseInt(findNode(portalObj.int, 'onlyOnce').node.value || -1, 10),
    delay: parseInt(findNode(portalObj.int, 'delay').node.value || -1, 10),
  }));

  const map = {
    mapId: 10000,
    info: {
      returnMap: parseInt(findNode(infoNode.int, 'returnMap').node.value, 10 || 0),
    },
    life,
    portal,
  };

  return map;
};
