 const http = require('http');
 const url = require('url');
 const path = require('path');
 const querystring = require('querystring')
 const fs = require('fs');
 const mime = require('mime');

 const app = http.createServer();

 app.on('request',(request, response) => {
    
    if(request.url=='/favicon.ico') return

    // console.log(request.headers['accept'])
    // console.log(request.headers['connection'])

    
    if(request.method=='GET'){

        //获取请求
        let {query, pathname} = url.parse(request.url,true)


        //判断路由
        if(pathname=='/index' || pathname=='/' ){
            
            pathname = pathname == '/' || pathname=='/index' ? '/form.html' : pathname
            //文件服务器路径
            let realPath = path.join(__dirname + pathname);

            //访问
            fs.readFile(realPath , (err, doc) => {
                if(!err){
                    //请求会有html和css和img用mime第三方
                    response.writeHead(
                        200,//http状态码
                        {'content-type':mime.getType(realPath)},//数据类型和编码格式
                    )
                    response.end(doc)
                }else{
                    response.end('失败')
                    response.writeHead(
                        404,//http状态码
                        {'content-type':'text/html;charset=UTF8'},//数据类型和编码格式
                    )
                    return 
                }
            })  
        }else if(pathname=='/list'){
            response.end('列表页')
        }else{
            response.end('not found')
        }

        //get参数
        // console.log(query)

        

    }else if(request.method=='POST'){

        let postParams = ''

        //post接参
        request.on('data', params=>{
            postParams += params
        })
        request.on('end',()=>{
            postParams = querystring.parse(postParams)
            
            console.log(postParams)
        })


    }
 })
 //监听端口
 app.listen(3030);
console.log('启动3030')