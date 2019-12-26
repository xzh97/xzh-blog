/**
 * @desc 压缩dist文件成zip
 * @desc 思路：
 * 1.构建新的dist目录
 * 1.获取源文件路径及目录
 * 2.遍历源文件，zip添加文件或者目录（若为目录，则递归调用此方法遍历）
 * 3.写入target.zip
 * */
const JSZip = require('jszip');
const fs = require('fs');
const path = require('path');
const request = require('request');
const childProcess = require('child_process');
//const { saveAs } = require('file-saver');
const envMap = {
    'dev': {
        apiUrl:'http://127.0.0.1:3000',
    },
    'prod': {
        apiUrl:'http://122.51.73.210:3000',
    }
};
const upload = target => {
    return new Promise((resolve,reject) => {
        let env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';
        let url = `${envMap['dev'].apiUrl}/api/upload`;
        let formData = {
            file:fs.createReadStream(`${target}.zip`)
        };
        let params = {
            url,
            formData
        };
        request.post(params, function (err ,res, body) {
            if(err){
                console.error('上传应用压缩包文件失败 ', err);
                reject(err);
            }
            else{
                if (body) {
                    console.error('上传应用压缩包文件成功');
                    console.log(body);
                    console.log(url);
                    //console.log('上传应用压缩包文件成功 ', JSON.parse(body));
                    //console.log('文件路径 ' + JSON.parse(body).fullPath);
                    //console.log('Upload successful!  Server responded with:', body);
                    //resolve(JSON.parse(body))
                } else {
                    reject('error');
                }
            }
        })
    })

};
/**
 * @desc 运行指令
 * */
function runCommand(cmd){
    return new Promise((resolve,reject) => {
        childProcess.exec(cmd,(error, stdout, stderr) => {
            if (error) {
                console.error(`执行命令出错：${cmd}`);
                console.error(error);
                reject(error);
            }
            else{
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
                resolve()
            }
        })
    })
}
/**
 * @desc 构建dist包
 * */
function buildDist(){
    console.log('开始构建dist包');
    return runCommand('npm run build')
}

/**
 * @param source 源文件
 * @param target 压缩包名
 * */
function start(source, target) {
    let zip = new JSZip();

    buildDist().then(res => {
        console.log('开始压缩dist文件');
        //获取dist文件路径
        let zipFilePath = path.join(__dirname, source);
        console.log('dist文件夹路径', zipFilePath);

        getFileDir(zipFilePath,'').then(res => {
            //console.log('zip',zip);

            zip.generateNodeStream({streamFiles:true})
                .pipe(fs.createWriteStream(`${target}.zip`))
                .on('finish',() => {
                    console.log('压缩dist文件成功');
                    console.log(`开始上传${target}.zip`);
                    upload(target);
                })
        });
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
                    //console.log(`添加${dirent.name}子目录到${dirName}中`);
                    zip.folder(path.join(dirName, dirent.name))
                    getFileDir(childFilePath,path.join(dirName, dirent.name));
                }
                else if(dirent.isFile()){
                    //zip子目录
                    if(dirName){
                        //console.log(`添加${dirent.name}到zip的子目录：${dirName}中`)
                        zip.file(path.join(dirName, dirent.name), getFile(childFilePath));
                    }
                    //zip目录
                    else{
                        //console.log(`添加${dirent.name}到zip中`)
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

start('dist','blog');