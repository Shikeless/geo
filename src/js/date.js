function getData() {
    var todayTime = new Date();

    var month = todayTime .getMonth() + 1;

    var day = todayTime .getDate();

    var year = todayTime .getFullYear();

    var hour = todayTime .getHours();

    var minute = todayTime .getMinutes();

    return year + "/" + month + "/" + day + "-" + hour + "." + minute;
}

export {
	getData
} 
            