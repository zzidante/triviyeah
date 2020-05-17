// recursivly get a list of file/directories inside of a folder
// this uses sync so it blocks the process - there are also ways
// to do this asyncronously.
const FS = require('fs');
const PATH = require('path');

const getAllFiles = (dir, recursive, fs = FS, path = PATH) => {
  const directory = fs.readdirSync(dir);
  
  const directoryTree = directory.reduce((files, file) => {
    const name = path.join(dir, file);
    const isDirectory = fs.statSync(name).isDirectory();

    if (isDirectory && recursive) {
      return [...files, ...getAllFiles(name, recursive)]
    }
      
    return [...files, name]
  }, []);

  return directoryTree;
};


/* istanbul ignore next */
module.exports = ({directory, recursive = false, _fs = FS, _path = PATH}) => {
  return getAllFiles(directory, recursive, _fs, _path);
};
