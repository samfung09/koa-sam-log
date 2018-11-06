function isMobile(userAgent){
    // 判断是移动端还是pc端
    return /Mobile/.test(userAgent) ? 'Mobile' : 'PC';
}

module.exports = (ctx, message) => {
    let client = {
        ip: ctx.request.ip,
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