## koa-sam-log koa2的日志输出中间件
基于log4js 3.0.6版本
### 安装
```
npm install koa-sam-log --save
```
### 基本使用
```javascript
const myLog = require('koa-sam-log');

// myLog函数传入一个appender和一些其他配置
app.use(myLog({ 
    type: 'dateFile',   //按日期创建文件，文件名为 filename + pattern
    filename: 'logs/',
    pattern: 'yyyy-MM-dd.log',
    alwaysIncludePattern: true
},{
    env: app.env,      //如果是development则可以同时在控制台中打印
    level: 'info'      //logger level
}));
```
app.use()之后，即可使用ctx.log.info(), ctx.log.error()等log4js的方法

最终打印信息内包括客户端ip, user-agent, method, path, MobileOrPC, responseTime等信息
```
[2018-11-07T00:24:08.406] [INFO] default - {"ip":"::1","method":"GET","path":"/","userAgent":"PC","responseTime":"0.001s","message":"恭喜你用koa-sam-log中间件成功打印日志"}
```