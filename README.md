# dir-walker-gen [![CI](https://github.com/vsoneji/dir-walker-gen/actions/workflows/ci.yml/badge.svg)](https://github.com/vsoneji/dir-walker-gen/actions/workflows/ci.yml)

JavaScript generator pattern for efficient directory listing.

Unlike other directory walkers, this coding pattern will NOT try to scan the entire tree. The directory listings are returned as a generator pattern and the subdirectories are only scanned when the calling method has consumed all the normal files in a directory.

The async nature of the function, it `yield`s to the calling routine allowing it to process the file as needed.

## Installation

```shell
$ npm install dir-walker-gen
```

## Requirements

- Node.js 22 or newer

## Release Notes

See [CHANGELOG.md](CHANGELOG.md) for upcoming 2.x release notes and migration-impacting changes.

## Development

### Run Tests

This project uses Node's built-in test runner.

```shell
$ npm test
```

### Run Security Audit

```shell
$ npm run audit
```

## Basic Usage
```javascript
const DirGen = require('dir-walker-gen');

const options = {
    folders: ["D:\\Dropbox"]
}

for (let file of DirGen(options)) {
    console.log(file);
}
```

## Options Object
```javascript
const DirGen = require('dir-walker-gen');

const options = {
    folders: ["D:\\Dropbox", "D:\\OneDrive"],
    silent: true,
    ignoreDotDir: true,
    excludeFolders: ['Public'],
    excludeExtensions: ['tmp', 'docx', 'xlsx'],
    includeExtensions: ['jpeg', 'jpg', 'png', 'gif']
};

for (let file of DirGen(options)) {
    console.log(file);
}
```

| Option<sup>*</sup> | Comment | Default |
| ------ | ------- | ------- |
| `folders` | (Required) List of starting folders |  |
| `silent` | Does not show console warning when directories do not exist | false |
| `ignoreDotDir` | Ignores directories that start with a dot (e.g. .git, .vscode, etc) | false |
| `excludeFolders` | Exclude all folder that ends with any of the given strings | empty list (ignore nothing) |
| `excludeExtensions` | List of extensions to ignore | empty list (ignore nothing) |
| `includeExtensions` | List of extensions to scan (all other extensions are ignored) | empty list (ignore nothing) |

Notes: 
1. `excludeExtensions` is not really needed if `includeExtensions` is supplied.
2. Include and Exclude strings are case sensitive