# dir-walker-gen [![Build Status](https://api.travis-ci.com/vsoneji/dir-walker-gen.svg?branch=master)](http://travis-ci.org/daaku/nodejs-walker)

JavaScript generator pattern for efficient directory listing.

Unlike other directory walkers, this coding pattern will NOT try to scan the entire tree. The directory listings are returned as a generator pattern and the subdirectories are only scanned when the calling method has consumed all the normal files in a directory.

The async nature of the function, it `yield`s to the calling routine allowing it to process the file as needed.

## Installation

```shell
$ npm install dir-walker-gen
```

## Basic Usage
```javascript
const DirGen = require('dir-walker-gen');

for (let file of DirGen(`D:\DropBox`)) {
    console.log(file);
}
```

## Options Object
```javascript
const DirGen = require('dir-walker-gen');

const options = {
    ignoreDotDir: true,
    excludeFolders: ['Public'],
    excludeExtensions: ['tmp', 'docx', 'xlsx'],
    includeExtensions: ['jpeg', 'jpg', 'png', 'gif']
};

for (let file of DirGen(`D:\DropBox`, options)) {
    console.log(file);
}
```

| Option<sup>*</sup> | Comment | Default |
| ------ | ------- | ------- |
| `ignoreDotDir` | Ignores directories that start with a dot (e.g. .git, .vscode, etc) | false |
| `excludeFolders` | Exclude all folder that ends with any of the given strings | empty list (ignore nothing) |
| `excludeExtensions` | List of extensions to ignore | empty list (ignore nothing) |
| `includeExtensions` | List of extensions to scan (all other extensions are ignored) | empty list (ignore nothing) |

Notes: 
1. `excludeExtensions` is not really needed if `includeExtensions` is supplied.
2. Include and Exclude strings are case sensitive