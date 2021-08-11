const email = require("emailjs");

const server = email.server.connect({
    user: "service@yio.me", 
    password: "r7HMedbg6KNNQbr", 
    host: "smtp.mxhichina.com",
    ssl: true // 使用ssl
});

//开始发送邮件
const sendMeail = async (toMeail,cont) => {
    let result = false;
    server.send({
        text: cont, //邮件内容
        from: "service@yio.me", //谁发送的
        to: toMeail, //发送给谁的
        subject: 'YioPay服务提醒' //邮件主题
    }, function (err, message) {
        //回调函数
        // console.log(err || message);
        if (err)  console.log(err);
    })

}

module.exports = sendMeail
