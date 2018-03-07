import fs from 'fs';
import path from 'path';
import util from 'util';

const readFile = util.promisify(fs.readFile);

const asyncGetStats = async pathToLoadableFile => {
  const fileContent = await readFile(
    path.resolve(__dirname, pathToLoadableFile),
    'utf8',
  );

  return JSON.parse(fileContent);
};

export default asyncGetStats;
