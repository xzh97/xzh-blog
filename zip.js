/**
 * @desc 压缩dist文件成zip
 * @desc 思路：
 * 1.获取源文件路径及目录
 * 2.遍历源文件，zip添加文件或者目录（若为目录，则递归调用此方法遍历）
 * 3.写入target.zip
 * */
const JSZip = require('jszip');
const fs = require('fs');
const path = require('path');
const { saveAs } = require('file-saver');

/**
 * @param source 压缩源文件
 * @param target 压缩包名
 * */
function init(source, target) {
    let zip = new JSZip();

    //获取dist文件路径
    let zipFilePath = path.join(__dirname, source);
    console.log('dist文件夹路径', zipFilePath);

    getFileDir(zipFilePath,'').then(res => {
        console.log('zip',zip);

        zip.generateNodeStream({streamFiles:true})
            .pipe(fs.createWriteStream(`${target}.zip`))
            .on('finish',() => {
                console.log('写入成功')
            })
    });

    /**
     * @desc 获取dist文件夹目录结构
     * @param filePath
     * @param dirName
     * */
    function getFileDir(filePath,dirName) {
        return new Promise(resolve => {
            let dir = fs.readdirSync(filePath,{ encoding:'utf8',withFileTypes:true });

            //获取子级目录
            dir.forEach(dirent => {
                let childFilePath = path.join(filePath,dirent.name);

                if(dirent.isDirectory()){
                    console.log(`添加${dirent.name}子目录到${dirName}中`);
                    zip.folder(path.join(dirName, dirent.name))
                    getFileDir(childFilePath,path.join(dirName, dirent.name));
                }
                else if(dirent.isFile()){
                    //zip子目录
                    if(dirName){
                        console.log(`添加${dirent.name}到zip的子目录：${dirName}中`)
                        zip.file(path.join(dirName, dirent.name), getFile(childFilePath));
                    }
                    //zip目录
                    else{
                        console.log(`添加${dirent.name}到zip中`)
                        zip.file(dirent.name, getFile(childFilePath));
                    }
                }
            })
            resolve();
        },reject => {
            console.log('zip文件添加错误')
            reject();
        })
    }

    /**
     * @desc 获取文件内容
     * @param filePath
     * */
    function getFile(filePath) {
        console.log(`文件路径: ${filePath}`);
        return fs.createReadStream(filePath,{ autoClose:true, });
    }
}
init('dist','blog');