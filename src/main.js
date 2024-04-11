const dayjs = require('dayjs')
var localizedFormat = require('dayjs/plugin/localizedFormat')
//import dayjs from 'dayjs' // ES 2015
dayjs.extend(localizedFormat);


setDateTime = () => {
    let curTime = Date();
    var element = document.getElementById("date");
    element.innerText = dayjs(curTime).format('LL');

    var element = document.getElementById("time");
    element.innerText = dayjs(curTime).format('LTS');

    console.log(dayjs(curTime).format('llll'));
}

setInterval(setDateTime, 1000);


