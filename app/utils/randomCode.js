randomCode = async () => {
    let Num="";
    for(var i=0;i<6;i++){
        Num+=Math.floor(Math.random()*10);
    }
    return Num;
};

module.exports = randomCode;
