module.exports = DirGen;

const path = require("path");
const fs = require("fs");

function* DirGen(options) {
    const filesToEmit = [];
    const dirsToScan = [...options.folders.reverse()];
    const isSilent = options.silent;

    const _isIgnoreDir = function(dir, options) {
        if (!options) {
            return false;
        }
        if (options.ignoreDotDir == true) {
            if (`${dir}`.includes("\\.")) {
                return true;
            }
        }
        if (options.excludeFolders && options.excludeFolders.length > 0) {
            for (let i = 0; i < options.excludeFolders.length; i++) {
                if (`${dir}`.endsWith(`${options.excludeFolders[i]}`)) {
                    return true;
                }
            }
        }

        return false;
    };

    const _isIgnoreFile = function(file, options) {
        let skip = false;
        let noSkip = true;
        if (options && options.excludeExtensions) {
            for (let i = 0; i < options.excludeExtensions.length; i++) {
                if (`${file}`.endsWith(`.${options.excludeExtensions[i]}`)) {
                    skip = true;
                    break;
                }
            }
        }
        if (options && options.includeExtensions) {
            noSkip = false;
            for (let i = 0; i < options.includeExtensions.length; i++) {
                if (`${file}`.endsWith(`.${options.includeExtensions[i]}`)) {
                    noSkip = true;
                    break;
                }
            }
        }
        return !(skip == false && noSkip == true);
    };

    while (dirsToScan.length > 0 || filesToEmit.length > 0) {
        // emit the files first
        if (filesToEmit.length > 0) {
            const fileToEmit = filesToEmit.pop();
            yield fileToEmit;
        } else {
            const dirToScan = dirsToScan.pop();

            const entries = [];
            try {
                const dirEntries = fs.readdirSync(dirToScan);
                entries.push(...dirEntries);
            } catch (error) {
                if (!isSilent) {
                    console.warn(`Could not read directory: '${dirToScan}'. Ignoring it.`);
                }
            }
            
            entries.reverse().forEach(entry => {
                const entryFullPath = path.join(dirToScan, entry);

                const stat = fs.lstatSync(entryFullPath);

                if (stat.isFile()) {
                    if (!_isIgnoreFile(entry, options)) {
                        filesToEmit.push(entryFullPath);
                    }
                } else if (stat.isDirectory()) {
                    if (!_isIgnoreDir(entryFullPath, options)) {
                        dirsToScan.push(entryFullPath);
                    }
                }
            });
        }
    }
}
