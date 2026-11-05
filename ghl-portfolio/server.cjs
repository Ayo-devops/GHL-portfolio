const http=require('http'),fs=require('fs'),path=require('path');
const root=path.join(__dirname,'dist');
const types={'.ico':'image/x-icon','.webmanifest':'application/manifest+json','.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.svg':'image/svg+xml'};
http.createServer((req,res)=>{
let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400);return res.end('Bad request')}
let file=path.resolve(root,'.'+pathname);
if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);return res.end('Forbidden')}
if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
fs.readFile(file,(err,data)=>{res.writeHead(err?404:200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(err?'Not found':data)})
}).listen(process.env.PORT||4174,'127.0.0.1',()=>console.log('Portfolio preview running'));
