/**
 * @param {*} req ctx.req
 * @method 获取客户端ip地址
 */
function getClientIp(req){
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
}

function isMobile(userAgent){
    // 判断是移动端还是pc端
    return /Mobile/.test(userAgent) ? 'Mobile' : 'PC';
}

module.exports = (ctx, message) => {
    let client = {
        ip: getClientIp(ctx.req),
        method: ctx.request.method,
        path: ctx.request.path,
        referer: ctx.request.headers['referer'],
        userAgent: isMobile(ctx.request.headers['user-agent']),
        responseTime: (Date.now()-ctx.log.startTime)/1000 + 's',
        message: message
    }
    // 返回客户端信息交给logger打印
    return JSON.stringify(client);
}