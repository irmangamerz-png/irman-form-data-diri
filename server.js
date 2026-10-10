const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = Number(process.env.PORT) || 3000;
const ROOT = __dirname;
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg'};
http.createServer((req,res)=>{
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400); return res.end('Bad request'); }
  let file = path.resolve(ROOT, pathname === '/' ? 'index.html' : '.' + pathname);
  if (!file.startsWith(ROOT + path.sep) && file !== path.join(ROOT,'index.html')) { res.writeHead(403); return res.end('Forbidden'); }
  fs.stat(file,(err,st)=>{
    if(err || !st.isFile()) file = path.join(ROOT,'index.html');
    fs.readFile(file,(e,data)=>{
      if(e){res.writeHead(500);return res.end('Server error');}
      res.writeHead(200,{'Content-Type':types[path.extname(file).toLowerCase()] || 'application/octet-stream','X-Content-Type-Options':'nosniff'});
      res.end(data);
    });
  });
}).listen(PORT,'0.0.0.0',()=>console.log('Form Data Diri IRMAN aktif di port '+PORT));
