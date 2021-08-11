module.exports = app => {
  return async (ctx, next) => {
    ctx.socket.emit('res', '有客户端连接了!' + JSON.stringify(ctx));
    await next();
    // execute when disconnect.
    // console.log('disconnection!');
  };
};