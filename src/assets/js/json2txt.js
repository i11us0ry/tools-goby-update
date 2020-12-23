function json2txt(urls,file) {
    var text = "";
    $.each(urls, function(index, val) {
             text += val["url"]+ " \r\n";
    });
    // 下载文件方法
    var funDownload = function (content, filename) {
        var eleLink = document.createElement('a');
        eleLink.download = filename;
        eleLink.style.display = 'none';
        // 字符内容转变成blob地址
        var blob = new Blob([content]);
        eleLink.href = URL.createObjectURL(blob);
        goby.showErrorMessage(eleLink.href);    
        // 触发点击
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
    };
    if ('download' in document.createElement('a')) {
            funDownload(text, file);    
    } else {
            goby.showErrorMessage('浏览器不支持');    
    }
}