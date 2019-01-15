const DirGen = require("../src/dirgen");
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

        for (let file of DirGen(simpleFolder)) {
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
            excludeExtensions: ["jpg", "jpeg"]
        };

        for (let file of DirGen(simpleFolder, options)) {
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
            includeExtensions: ["txt", "text"]
        };

        for (let file of DirGen(simpleFolder, options)) {
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

        for (let file of DirGen(multiLevelFolder)) {
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
            excludeFolders: ["Folder2", "Folder3"]
        };

        for (let file of DirGen(multiLevelFolder, options)) {
            files.push(file);
        }
        files.should.deepEqual(expected);
    });
});
