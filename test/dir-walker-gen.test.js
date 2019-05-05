const DirGen = require("../src/dir-walker-gen");
const should = require("should");
const path = require("path");

describe("Simple Folder List", () => {
    const baseDir = __dirname;
    const simpleFolder = path.join(baseDir, "test_simple");

    it("will list contents of a folder", () => {
        const files = [];

        const expected = [
            path.join(simpleFolder, "File1.txt"),
            path.join(simpleFolder, "File2.txt"),
            path.join(simpleFolder, "File3.jpg")
        ];

        const options = {
            folders: [simpleFolder]
        };

        for (let file of DirGen(options)) {
            files.push(file);
        }
        files.should.deepEqual(expected);
    });

    it("will list contents of a folder with excluded extensions", () => {
        const files = [];

        const expected = [
            path.join(simpleFolder, "File1.txt"),
            path.join(simpleFolder, "File2.txt")
        ];

        const options = {
            folders: [simpleFolder],
            excludeExtensions: ["jpg", "jpeg"]
        };

        for (let file of DirGen(options)) {
            files.push(file);
        }
        files.should.deepEqual(expected);
    });

    it("will list contents of a folder with included extensions", () => {
        const files = [];

        const expected = [
            path.join(simpleFolder, "File1.txt"),
            path.join(simpleFolder, "File2.txt")
        ];

        const options = {
            folders: [simpleFolder],
            includeExtensions: ["txt", "text"]
        };

        for (let file of DirGen(options)) {
            files.push(file);
        }
        files.should.deepEqual(expected);
    });
});

describe("Multi-Level Folder Tree", () => {
    const baseDir = __dirname;
    const multiLevelFolder = path.join(baseDir, "test_recursive");

    it("will list contents of a folder and sub-folders", () => {
        const files = [];

        const expected = [
            path.join(multiLevelFolder, "Folder1", "File1.txt"),
            path.join(multiLevelFolder, "Folder1", "File2.txt"),
            path.join(multiLevelFolder, "Folder1", "File3.jpg"),
            path.join(multiLevelFolder, "Folder2", "File1.txt"),
            path.join(multiLevelFolder, "Folder2", "File2.txt"),
            path.join(multiLevelFolder, "Folder2", "File4.md")
        ];

        const options = {
            folders: [multiLevelFolder]
        };

        for (let file of DirGen(options)) {
            files.push(file);
        }
        files.should.deepEqual(expected);
    });

    it("will list contents of a folder and sub-folders with excluded folders", () => {
        const files = [];

        const expected = [
            path.join(multiLevelFolder, "Folder1", "File1.txt"),
            path.join(multiLevelFolder, "Folder1", "File2.txt"),
            path.join(multiLevelFolder, "Folder1", "File3.jpg")
        ];

        const options = {
            folders: [multiLevelFolder],
            excludeFolders: ["Folder2", "Folder3"]
        };

        for (let file of DirGen(options)) {
            files.push(file);
        }
        files.should.deepEqual(expected);
    });
});

describe("Multiple Start Folders", () => {
    const baseDir = __dirname;
    const multiLevelFolder = path.join(baseDir, "test_recursive");
    const simpleFolder = path.join(baseDir, "test_simple");

    it("will list contents of a folder and sub-folders", () => {
        const files = [];

        const expected = [
            path.join(simpleFolder, "File1.txt"),
            path.join(simpleFolder, "File2.txt"),
            path.join(simpleFolder, "File3.jpg"),
            path.join(multiLevelFolder, "Folder1", "File1.txt"),
            path.join(multiLevelFolder, "Folder1", "File2.txt"),
            path.join(multiLevelFolder, "Folder1", "File3.jpg"),
            path.join(multiLevelFolder, "Folder2", "File1.txt"),
            path.join(multiLevelFolder, "Folder2", "File2.txt"),
            path.join(multiLevelFolder, "Folder2", "File4.md")
        ];

        const options = {
            folders: [simpleFolder, multiLevelFolder]
        };

        for (let file of DirGen(options)) {
            files.push(file);
        }
        files.should.deepEqual(expected);
    });

    it("will list contents of a folder and sub-folders with excluded folders", () => {
        const files = [];

        const expected = [
            path.join(simpleFolder, "File1.txt"),
            path.join(simpleFolder, "File2.txt"),
            path.join(simpleFolder, "File3.jpg"),
            path.join(multiLevelFolder, "Folder1", "File1.txt"),
            path.join(multiLevelFolder, "Folder1", "File2.txt"),
            path.join(multiLevelFolder, "Folder1", "File3.jpg")
        ];

        const options = {
            folders: [simpleFolder, multiLevelFolder],
            excludeFolders: ["Folder2", "Folder3"]
        };

        for (let file of DirGen(options)) {
            files.push(file);
        }
        files.should.deepEqual(expected);
    });
});

describe('Issue #1 - error handling', () => {
    it('will not throw an error if a folder does not exist', () => {
        const simpleFolder = path.join(__dirname, "test_simple");

        const files = [];

        const expected = [
            path.join(simpleFolder, "File1.txt"),
            path.join(simpleFolder, "File2.txt"),

            path.join(simpleFolder, "File3.jpg")
        ];

        const options = {
            folders: [simpleFolder, 'A foldr that does not exist']
        };

        for (let file of DirGen(options)) {
            files.push(file);
        }
        files.should.deepEqual(expected);
    });
    it('will not a console if a folder does not exist in silent mode', () => {
        const simpleFolder = path.join(__dirname, "test_simple");

        const files = [];

        const expected = [
            path.join(simpleFolder, "File1.txt"),
            path.join(simpleFolder, "File2.txt"),
            
            path.join(simpleFolder, "File3.jpg")
        ];

        const options = {
            folders: [simpleFolder, 'A foldr that does not exist'],
            silent: true
        };

        for (let file of DirGen(options)) {
            files.push(file);
        }
        files.should.deepEqual(expected);
    });
});