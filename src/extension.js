let goby = parent.goby;
const fs = require('fs');
let stat = fs.stat;

function activate(content) {
    function updateDic(src,dst){
        let src_ftp = src+"\\ftp_user_pass.dict"
        let dst_ftp = dst+"\\ftp_user_pass.dict"
        readable=fs.createReadStream(src_ftp);//创建读取流
        writable=fs.createWriteStream(dst_ftp);//创建写入流
        readable.pipe(writable);

        let src_mysql = src+"\\mysql_user_pass.dict"
        let dst_mysql = dst+"\\mysql_user_pass.dict"
        readable=fs.createReadStream(src_mysql);//创建读取流
        writable=fs.createWriteStream(dst_mysql);//创建写入流
        readable.pipe(writable);

        let src_postgres = src+"\\postgres_user_pass.dict"
        let dst_postgres = dst+"\\postgres_user_pass.dict"
        readable=fs.createReadStream(src_postgres);//创建读取流
        writable=fs.createWriteStream(dst_postgres);//创建写入流
        readable.pipe(writable);

        let src_rdp = src+"\\rdp_user_pass.dict"
        let dst_rdp = dst+"\\rdp_user_pass.dict"
        readable=fs.createReadStream(src_rdp);//创建读取流
        writable=fs.createWriteStream(dst_rdp);//创建写入流
        readable.pipe(writable);

        let src_smb = src+"\\smb_user_pass.dict"
        let dst_smb = dst+"\\smb_user_pass.dict"
        readable=fs.createReadStream(src_smb);//创建读取流
        writable=fs.createWriteStream(dst_smb);//创建写入流
        readable.pipe(writable);

        let src_snmp = src+"\\snmp_pass.dict"
        let dst_snmp = dst+"\\snmp_pass.dict"
        readable=fs.createReadStream(src_snmp);//创建读取流
        writable=fs.createWriteStream(dst_snmp);//创建写入流
        readable.pipe(writable);

        let src_ssh = src+"\\ssh_user_pass.dict"
        let dst_ssh = dst+"\\ssh_user_pass.dict"
        readable=fs.createReadStream(src_ssh);//创建读取流
        writable=fs.createWriteStream(dst_ssh);//创建写入流
        readable.pipe(writable);

        let src_tomcat = src+"\\tomcat_user_pass.dict"
        let dst_tomcat = dst+"\\tomcat_user_pass.dict"
        readable=fs.createReadStream(src_tomcat);//创建读取流
        writable=fs.createWriteStream(dst_tomcat);//创建写入流
        readable.pipe(writable)

        let src_user = src+"\\user_pass.dict"
        let dst_user = dst+"\\user_pass.dict"
        readable=fs.createReadStream(src_user);//创建读取流
        writable=fs.createWriteStream(dst_user);//创建写入流
        readable.pipe(writable)
    }   
    //插件更新完成
    function copy(src,dst){
        fs.readdir(src,function(err,paths){
        console.log(paths)
        if(err){
            throw err;
        }
        paths.forEach(function(path){
            var _src=src+'/'+path;
            var _dst=dst+'/'+path;
            var readable;
            var writable;
            stat(_src,function(err,st){
                if(err){
                    throw err;
                }
                if(st.isFile()){
                    readable=fs.createReadStream(_src);//创建读取流
                    writable=fs.createWriteStream(_dst);//创建写入流
                    readable.pipe(writable);
                }else if(st.isDirectory()){
                    exists(_src,_dst,copy);
                    }
                });
            });
        });
    }
    function exists(src,dst,callback){
        console.log(src,dst)
        fs.exists(dst,function(exists){
        if(exists){//不存在
            callback(src,dst);
        }else{//存在
            fs.mkdir(dst,function(){//创建目录
                callback(src,dst)
            })
        }
    })
    }
    function exists1(src,dst,callback){
        console.log(src,dst)
        fs.exists(dst,function(exists){
        if(exists){//不存在
            callback(src,dst);
        }
    })
    }
    function deleteFolder(path) {
        let files = [];
        if( fs.existsSync(path) ) {
            files = fs.readdirSync(path);
            files.forEach(function(file,index){
                let dirPath = path + "/" + file;
                if(fs.statSync(dirPath).isDirectory()) {
                    deleteFolder(dirPath);
                } else {
                    fs.unlinkSync(dirPath);
                }
            });
            fs.rmdirSync(path);
        }
    }
    function delfile(src,dst){
        fs.readdir(dst,function(err,paths){
            console.log(paths)
        if(err){
            throw err;
        }
        paths.forEach(function(path){
            var _dst=dst+'\\'+path;
            var _src=src
            stat(_dst,function(err,st){
                if(err){
                    throw err;
                }
                if(st.isFile()){
                    fs.unlinkSync(_dst);
                }else if(st.isDirectory()){
                    exists(_src,_dst,del);
                    }
                });
            });
        });
        
    }
    //更新json完成
    function updateJson(src,dst,dst_extension){
        let src_rawdata = fs.readFileSync(src)
        let src_config_json = JSON.parse(src_rawdata);
        let dst_rawdata = fs.readFileSync(dst)
        let dst_config_json = JSON.parse(dst_rawdata);

        dst_config_json["ports"] = src_config_json["ports"]
        dst_config_json["fofaFetchSubdomainEnabled"] = src_config_json["fofaFetchSubdomainEnabled"]
        dst_config_json["fofaEmail"] = src_config_json["fofaEmail"]
        dst_config_json["fofaKey"] = src_config_json["fofaKey"]
        dst_config_json["pingFirst"] = src_config_json["pingFirst"]
        dst_config_json["pingCheckSize"] = src_config_json["pingCheckSize"]
        dst_config_json["pingConcurrent"] = src_config_json["pingConcurrent"]
        dst_config_json["pingSendCount"] = src_config_json["pingSendCount"]
        dst_config_json["deepAnalysis"] = src_config_json["deepAnalysis"]
        dst_config_json["curTheme"] = src_config_json["curTheme"]
        dst_config_json["disableMdns"] = src_config_json["disableMdns"]
        dst_config_json["disableUpnp"] = src_config_json["disableUpnp"]
        dst_config_json["enableComponentVersion"] = src_config_json["enableComponentVersion"]
        dst_config_json["name"] = src_config_json["name"]
        dst_config_json["key"] = src_config_json["key"]
        dst_config_json["rate"] = src_config_json["rate"]
        dst_config_json["scanMode"] = src_config_json["scanMode"]
        dst_config_json["proxy"] = src_config_json["proxy"]
        dst_config_json["connectionSize"] = src_config_json["connectionSize"]
        dst_config_json["fofaFetchSize"] = src_config_json["fofaFetchSize"]
        dst_config_json["enableCrawler"] = src_config_json["enableCrawler"]
        dst_config_json["crawlerScope"] = src_config_json["crawlerScope"]
        dst_config_json["crawlerConcurrent"] = src_config_json["crawlerConcurrent"]
        dst_config_json["crawlerMaxLinks"] = src_config_json["crawlerMaxLinks"]
        dst_config_json["crawlerMaxCrawlLinks"] = src_config_json["crawlerMaxCrawlLinks"]
        dst_config_json["checkHoneyPot"] = src_config_json["checkHoneyPot"]
        dst_config_json["language"] = src_config_json["language"]

        src_config_hashToInfo = src_config_json["hashToInfo"]
        for (var key in src_config_hashToInfo){
            if (src_config_hashToInfo[key]["name"] == "UpdateConfig"){
                if (src_config_hashToInfo[key]["publisher"] == "goby牛逼"){
                    let dst_update = dst_extension+"\\"+key
                    exists1(dst_extension,dst_update,delfile)
                    deleteFolder(dst_update)
                }
            }
        }

        dst_config_json["pluginConfig"] = src_config_json["pluginConfig"]
        dst_config_json["hashToInfo"] = src_config_json["hashToInfo"]
        dst_config_json["pidToHash"] = src_config_json["pidToHash"]

        let config_data = JSON.stringify(dst_config_json);
        fs.writeFileSync(dst, config_data);
    }

    goby.registerCommand('UpdateConfig', function () {
        let config = goby.getConfiguration();
        let src_dir = config.src_config.default;
        let dst_dir = config.dst_config.default;
        let src_config = src_dir + "\\config\\config.json"
        let dst_config = dst_dir + "\\config\\config.json"
        let src_golib = src_dir + "\\golib"
        let dst_golib = dst_dir + "\\golib"
        let src_extension = src_dir + "\\" +"extensions"
        let dst_extension = dst_dir + "\\" +"extensions"
        let path = require('path');
        let url = path.join(__dirname,"./index.html");
        //检测用户是否输入数据
        if (src_dir && dst_dir){
            goby.showIframeDia(url, "请重启goby！", "334", "110");
            exists(src_extension,dst_extension,copy)
            updateDic(src_golib,dst_golib)
            updateJson(src_config,dst_config,dst_extension)            
        } else{
            goby.showConfigurationDia()
        }
    });
}

exports.activate = activate;