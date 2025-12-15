module.exports = DirGen;

const path = require("path");
const fs = require("fs");

function* DirGen(options) {
    const filesToEmit = [];
    // Avoid unnecessary reverse and spread - work with copy in original order
    const dirsToScan = options.folders.slice().reverse();
    const isSilent = options.silent;

    const _isIgnoreDir = function(dir, options) {
        if (!options) {
            return false;
        }
        if (options.ignoreDotDir === true) {
            // Use path.basename for proper cross-platform dot directory detection
            const basename = path.basename(dir);
            if (basename.startsWith('.')) {
                return true;
            }
        }
        // Use Array.some() for early exit optimization
        if (options.excludeFolders && options.excludeFolders.length > 0) {
            return options.excludeFolders.some(excludeFolder => dir.endsWith(excludeFolder));
        }

        return false;
    };

    const _isIgnoreFile = function(file, options) {
        // Simplify boolean logic - if includeExtensions is set, only check that
        if (options && options.includeExtensions && options.includeExtensions.length > 0) {
            return !options.includeExtensions.some(ext => file.endsWith('.' + ext));
        }
        // Otherwise check excludeExtensions
        if (options && options.excludeExtensions && options.excludeExtensions.length > 0) {
            return options.excludeExtensions.some(ext => file.endsWith('.' + ext));
        }
        return false;
    };

    while (dirsToScan.length > 0 || filesToEmit.length > 0) {
        // emit the files first
        if (filesToEmit.length > 0) {
            const fileToEmit = filesToEmit.pop();
            yield fileToEmit;
        } else {
            const dirToScan = dirsToScan.pop();

            let entries;
            try {
                // Read directly without intermediate array and spread
                entries = fs.readdirSync(dirToScan);
            } catch (error) {
                if (!isSilent) {
                    console.warn(`Could not read directory: '${dirToScan}'. Ignoring it.`);
                }
                continue;
            }
            
            // Process in reverse order to maintain original behavior
            for (let i = entries.length - 1; i >= 0; i--) {
                const entry = entries[i];
                const entryFullPath = path.join(dirToScan, entry);

                let stat;
                try {
                    stat = fs.lstatSync(entryFullPath);
                } catch (error) {
                    // Skip entries that can't be stat'd (e.g., broken symlinks)
                    continue;
                }

                if (stat.isFile()) {
                    if (!_isIgnoreFile(entry, options)) {
                        filesToEmit.push(entryFullPath);
                    }
                } else if (stat.isDirectory()) {
                    if (!_isIgnoreDir(entryFullPath, options)) {
                        dirsToScan.push(entryFullPath);
                    }
                }
            }
        }
    }
}
