const log4js = require('log4js');
const clientInfo = require('./access');
// log4js中日志级别
const levels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];
module.exports = (appender, options) => {
    // appenders
    let appenders = { 
        cheese: appender    //app.js中配置的appender
    };

    // 如果是开发环境就往appenders添加dev
    if(options.env === 'development'){
        appenders.dev = {type: "console"}
    }

    // log4js配置
    log4js.configure({
        appenders: appenders,
        categories: { 
            default: {      //只写了一个默认分类
                appenders: Object.keys(appenders),
                level: options.level    //app.js中设置的level
            } 
        }
    });
    const logger = log4js.getLogger();

    return async (ctx, next) => {
        // 在ctx上添加logger的几个方法
        let ctxLogger = {};
        levels.forEach(level => {
            ctxLogger[level] = message => {
                // clientInfo()返回客户端信息
                logger[level](clientInfo(ctx, message));
            }
        })
        ctx.log = ctxLogger;

        ctx.log.startTime = Date.now();

        await next();
    }
}