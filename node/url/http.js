 const http = require('http');
 const url = require('url');
 const querystring = require('querystring')

 const app = http.createServer();

 app.on('request',(request, response) => {
    
    if(request.url=='/favicon.ico') return

    // console.log(request.headers['accept'])
    // console.log(request.headers['connection'])

        
        response.writeHead(
            200,//http状态码
            {'content-type':'text/html;charset=UTF8'},//数据类型和编码格式
        )
    

    if(request.method=='GET'){

        let {query, pathname} = url.parse(request.url,true)

        if(pathname=='/index' || pathname=='/' ){
            response.end('<h3>首页</h3>')
        }else if(pathname=='/list'){
            response.end('listpage')
        }else{
            response.end('not found')
        }

        console.log(query)

    }else if(request.method=='POST'){

        let postParams = ''

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