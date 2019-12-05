/**
 * @desc 压缩dist文件成zip
 * */
const JSZip = require('jszip');
const fs = require('fs');
const path = require('path');

/*const ajax = require("./share/ajax");

const postFile = file => {
    return ajax({
        url:`/api/upload`,
        method:'POST',
        file
    });
};*/
async function init(){
    let zip = new JSZip();

    let zipFilePath = getFilePath();

    await getFileDir(zipFilePath);

    console.log(zip);

    zip.generateAsync({type:"nodebuffer",platform: process.platform})
        .then(function(content) {
            // see FileSaver.js
            //saveAs(content, "dist.zip");
            fs.writeFile('dist.zip',content,{encoding:'utf-8'},(err,data) => {
                if(err){throw err}
                console.log(data);
            });
        });



    // 获取dist文件目录
    function getFilePath() {
        let filePath = path.resolve(__dirname);
        let fullPath = path.join(filePath,'dist');
        console.log('dist文件夹路径',fullPath);
        return fullPath;
    }
    //
    /**
     * @desc 获取dist文件夹目录结构
     * @param filePath
     * @param dirName
     * */
    function getFileDir(filePath,dirName) {
        //获取dist下所有目录
        let dir = fs.readdirSync(filePath,{ encoding:'utf-8',withFileTypes:true });
        console.log(dir);

        //获取子级目录
        dir.forEach(dirent => {
            if(dirent.isDirectory()){
                let childFilePath = path.join(filePath,dirent.name);
                console.log('dist子目录路径',childFilePath);
                zip.folder(dirent.name)
                getFileDir(childFilePath,dirent.name);
            }
            else if(dirent.isFile()){
                let childFilePath = path.join(filePath,dirent.name);
                console.log('dist file路径',childFilePath);
                if(dirName){
                    zip.file(`${dirName}/${dirent.name}`,addZipFile(childFilePath));
                }
                else{
                    zip.file(dirent.name,addZipFile(childFilePath));
                }

            }
        })
    }

    function addZipFile(filePath) {
        let fileContent;
        fileContent = fs.readFile(filePath,'utf8',(err,data) => {
            if(err){
                console.log(`读取${filePath}文件内容错误`)
                console.log(err);
                throw err;
            }
            console.log(data);
            return data;
        });
        return fileContent;
    }
}
init();