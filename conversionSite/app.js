var calendar = require('node-calendar');
var express = require('express');
var moment = require('moment');
var converter = require('number-to-words');
const pug = require('pug');
const path = require('path');
const date = require('date-and-time');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('views'));


app.get('/from/now/:day/:month/:year/', function (req, res) {
    function randomDate(start, end) {
        var date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        var day = date.getDate();
        var month = date.getMonth()+1;
        var year = date.getFullYear();
        return day + "/" + month + "/" + year
    }

    var now = moment();
    var randomArr = [];
    var urlDate = req.params;

    var dateJSON = JSON.stringify(urlDate);
    var obj = JSON.parse(dateJSON);
    var final = moment(`${obj.year}-${obj.month}-${obj.day}`);
    if (!final.isValid()) { return res.redirect('/'); }
    var uDay = moment(final).format("DD");
    var uMonth = moment(final).format("MM");
    var uYear = moment(final).format("YYYY");
    var today = moment(final).format("D");
    var randomMonthSay = [];
    var start = new Date(moment(now).format("YYYY"), moment(now).format("M"), moment(now).format("D"));
    var end = new Date(2021,12,31);
    for (var i = 0; i < 10; i++) {
        randomArr.push(randomDate(start, end));
        randomMonthSay.push(moment(randomArr[i], "D/M/YYYY", true).format("MMM") +" "+ converter.toOrdinal(moment(randomArr[i], "D/M/YYYY", true).format("D")));
    }
    var calen = new calendar.Calendar(6).itermonthdates(uYear, uMonth);
    var weekdays = [];
    var monthdays = [];
    var yeardays = [];
    var say = [];
    var linkt = [];
    calen.forEach((ddate) => {
        weekdays.push(moment(ddate).format('D'));
        monthdays.push(moment(ddate).format("MM"));
        yeardays.push(moment(ddate).format("YYYY"));
        say.push(moment(ddate, "D/M/YYYY", true).format("MMM") + " " + converter.toOrdinal(moment(ddate, "D/M/YYYY", true).format("D")));
        if (moment(ddate).diff(moment(now), 'seconds') < 0) {
            linkt.push("/"); 
        }

        else {
            linkt.push("/from/now/" + moment(ddate).format('D') + "/" + moment(ddate).format("MM") + "/" + moment(ddate).format("YYYY"));
        }

    })
    var nowD = now.format('DD');
    var nowM = now.format('MMMM');
    var nowY = now.format('YYYY');
    var Dsay = converter.toOrdinal(nowD);

    var Wdays = converter.toOrdinal(uDay);
    var dayOfWeek = final.format('dddd');

    var nextMonth = moment(final).add(1, 'months').format("MMMM");
    var month = moment(final).format("MM");

    var beforeMonth = moment(final).subtract(1, 'months').format("MMM");

    var monthL8r = moment(final).add(1, 'months').format("D/M/YYYY");
    var monthB4 = moment(final).subtract(1, 'months').format("D/M/YYYY");
    var monthB4l = "/from/now/" + moment(final).subtract(1, 'months').format("D/M/YYYY");
    var nowmonth = moment(now).format("MMMM")
    var thisMonth = moment(final).format("MMMM");
    if (moment(final).subtract(1, 'months').diff(moment(now), 'seconds')<0) {
        monthB4l = "/";
    }

    var weeksbtw = moment(final).diff(now, 'weeks');
    var daysbtw = moment(final).diff(now, 'days');
    var hoursbtw = moment(final).diff(now, 'hours');
    var minbtw = moment(final).diff(now, 'minutes');
    var secbtw = moment(final).diff(now, 'seconds');
    var weektxt = "0 weeks";
    var daytxt = "0 days";
    var hourtxt = "0 hours";
    var mintxt = "0 minutes";
    var sectxt = "0 seconds";
    if (weeksbtw > 1) { weektxt = weeksbtw + " weeks "; } else { if (weeksbtw == 1) { weektxt = weeksbtw + " week "; } }
    if (daysbtw > 1) { daytxt = daysbtw + " days "; } else { if (daysbtw == 1) { daytxt = daysbtw + " day "; } }
    if (hoursbtw > 1) { hourtxt = hoursbtw + " hours "; } else { if (hoursbtw == 1) { hourtxt = hoursbtw + " hour "; } }
    if (minbtw > 1) { mintxt = minbtw + " minutes "; } else { if (minbtw == 1) { mintxt = minbtw + " minute "; } }
    if (secbtw > 1) { sectxt = secbtw + " seconds "; } else { if (secbtw == 1) { sectxt = secbtw + " second "; } }
    var years = 0;
    years = moment(final).diff(now, 'years');
    now.add(years, 'years');
    var months = 0;
    months = moment(final).diff(now, 'months');
    now.add(months, 'months');
    var days = 0;
    days = moment(final).diff(now, 'days');
    now.add(days, 'days');
    var hour =moment(final).diff(now, 'hours');
    now.add(hour, 'hours');
    var min =moment(final).diff(now, 'minutes');
    now.add(min, 'minutes');
    var sec = moment(final).diff(now, 'seconds');
    now.add(sec, 'seconds');
    var Ytxt = "0 years";
    var Mtxt = "0 months";
    var Dtxt = "0 days";
    var htxt = "0 hours";
    var mtxt = "0 minutes";
    var stxt = "0 seconds";
    var ytop = "";
    var mtop = "";
    var dtop = "";
    if (years > 1) { Ytxt = years + " years "; } else { if (years == 1) { Ytxt = years + " year "; } }
    if (months > 1) { Mtxt = months + " months "; } else { if (months == 1) { Mtxt = months + " month "; } }
    if (days > 1) { Dtxt = days + " days"; } else { if (days == 1) { Dtxt = days + " day"; } }

    if (years > 1) { ytop = years + " years "; } else { if (years == 1) { ytop = years + " year "; } }
    if (months > 1) { mtop = months + " months "; } else { if (months == 1) { mtop = months + " month "; } }
    if (days > 1) { dtop = days + " days"; } else { if (days == 1) { dtop = days + " day"; } }
    if (mtop == "" && ytop == "" && dtop == "") {
        if (hour > 1) { ytop = hour + " hours "; } else { if (hour == 1) { ytop = hour + " hours "; } }
        if (min > 1) { mtop = min + " minutes "; } else { if (min == 1) { mtop = min + " minutes "; } }
        if (sec > 1) { dtop = sec + " seconds"; } else { if (sec == 1) { dtop = sec + " seconds"; } }
    }
    if (hour > 1) { htxt = hour + " hours "; } else { if (hour == 1) { htxt = hour + " hours "; } }
    if (min > 1) { mtxt = min + " minutes "; } else { if (min == 1) { mtxt = min + " minutes "; } }
    if (sec > 1) { stxt = sec + " seconds"; } else { if (sec == 1) { stxt = sec + " seconds"; } }
    if (secbtw <= 0) { return res.redirect('/'); }
    var q1 = "How long until " + dayOfWeek + ", " + thisMonth + ", " + Wdays + " " + urlDate.year +"?";
    var a1 = dayOfWeek + ", " + thisMonth + ", " + Wdays + " " + urlDate.year + " is in " + sectxt + "or " + mintxt + "or " +hourtxt + "or " + daytxt + "or " + weektxt + "and that is ...";
    var q2 = "How many days until " + dayOfWeek + ", " + thisMonth + ", " + Wdays + " " + urlDate.year + "?";
    var q3 = "How long between today and " + dayOfWeek + ", " + thisMonth + ", " + Wdays + " " + urlDate.year + "?";
    var q4 = "How many days between now and " + dayOfWeek + ", " + thisMonth + ", " + Wdays + " " + urlDate.year + "?";
    var a2 = a1;
    var desc = a1;
    res.render('index', {
        title: "Dates Calculator",
        monthL8r: monthL8r,
        monthB4: monthB4,
        weekdays: weekdays,
        monthdays: monthdays,
        yeardays: yeardays,
        yearURL: urlDate.year,
        monthURL: urlDate.month,
        dayURL: urlDate.day,
        thisMonth: thisMonth,
        beforeMonth: beforeMonth,
        nextMonth: nextMonth,
        Ytxt: Ytxt,
        Mtxt: Mtxt,
        Dtxt: Dtxt,
        Wdays: Wdays,
        dayOfWeek: dayOfWeek,
        nowM: nowM,
        nowD: nowD,
        nowY: nowY,
        Dsay: Dsay,
        randomArr: randomArr,
        randomMonthSay: randomMonthSay,
        today: today,
        weektxt: weektxt,
        daytxt: daytxt ,
        hourtxt: hourtxt,
        mintxt: mintxt,
        sectxt: sectxt,
        ytop: ytop,
        mtop: mtop,
        dtop: dtop,
        htxt: htxt,
        mtxt: mtxt,
        stxt: stxt,
        say: say,
        month: month,
        q1:q1,
        q2:q2,
        a1:a1,
        a2: a2,
        daysbtw: daysbtw,
        desc: desc,
        monthB4l: monthB4l,
        linkt: linkt,
        q3: q3,
        q4:q4
    })
});
app.get('/from/:day/:month/:year/to/:day2/:month2/:year2/', function (req, res) {
    function randomDate(start, end) {
        var date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        return day + "/" + month + "/" + year
    }
    var urlDate = req.params;
    var dateJSON = JSON.stringify(urlDate);
    var obj = JSON.parse(dateJSON);
    var now = moment();
    var randomArr = [];
    var randomMonthSay = [];
    var start = new Date(2015,1,1);
    var end = new Date(2019, 12, 31);
    for (var i = 0; i < 10; i++) {
        randomArr.push(randomDate(start, end));
        randomMonthSay.push(moment(randomArr[i], "D/M/YYYY", true).format("MMM") + " " + converter.toOrdinal(moment(randomArr[i], "D/M/YYYY", true).format("D")));
    }
    var randomArr2 = [];
    var randomMonthSay2 = [];
    var start2 = new Date(2020,1,1);
    var end2 = new Date(2025, 1, 1);
    for (var i = 0; i < 10; i++) {
        randomArr2.push(randomDate(start2, end2));
        randomMonthSay2.push(moment(randomArr2[i], "D/M/YYYY", true).format("MMM") + " " + converter.toOrdinal(moment(randomArr2[i], "D/M/YYYY", true).format("D")));
    }
    var from = moment(`${obj.year}-${obj.month}-${obj.day}`);
    var to = moment(`${obj.year2}-${obj.month2}-${obj.day2}`);
    if (!to.isValid() || !from.isValid()) { return res.redirect('/'); }
    var uDay = moment(from).format("DD");
    var uMonth = moment(from).format("MM");
    var uYear = moment(from).format("YYYY");
    var uDay2 = moment(to).format("DD");
    var uMonth2 = moment(to).format("MM");
    var uYear2 = moment(to).format("YYYY");
    var dayOfWeekFrom = from.format('dddd');
    var dayOfWeekTo = to.format('dddd');



    var monthL8rTo = moment(to).add(1, 'months').format("D/MM/YYYY");
    var nextMonthTo = moment(to).add(1, 'months').format("MMMM");
    var monthB4To = moment(to).subtract(1, 'months').format("D/MM/YYYY");
    var beforeMonthTo = moment(to).subtract(1, 'months').format("MMM");
    var thisMonthTo = moment(to).format("MMMM");

    var monthL8rFrom = moment(from).add(1, 'months').format("D/MM/YYYY");

    var nextMonthFrom = moment(from).add(1, 'months').format("MMMM");

    var monthB4From = moment(from).subtract(1, 'months').format("D/MM/YYYY");

    var beforeMonthFrom = moment(from).subtract(1, 'months').format("MMM");
    var thisMonthFrom = moment(from).format("MMMM");
    var monthB4froml = "/from/" + monthB4From + "/to/" + urlDate.day2 + "/" + urlDate.month2 + "/" + urlDate.year2;
    var monthL8rfroml = "/from/" + monthL8rFrom + "/to/" + urlDate.day2 + "/" + urlDate.month2  + "/" + urlDate.year2;
    var monthB4tol = "/from/" + urlDate.day + "/" + urlDate.month + "/" + urlDate.year  + "/to/" + monthB4To;
    var monthL8rtol = "/from/" + urlDate.day + "/" + urlDate.month + "/" + urlDate.year  + "/to/" + monthL8rTo;
    if (moment(to).subtract(1, 'months').diff(moment(from), 'seconds') < 0) {
        monthB4tol = "/";
    }
    if (moment(from).add(1, 'months').diff(moment(to), 'seconds') > 0) {
        monthL8rfroml = "/";
    }
    var calen = new calendar.Calendar(6).itermonthdates(uYear, uMonth);
    var calen2 = new calendar.Calendar(6).itermonthdates(uYear2, uMonth2);
    var weekdays = [];
    var monthdays = [];
    var yeardays = [];
    var say = [];
    var linkt = [];
    calen.forEach((ddate) => {
        weekdays.push(moment(ddate).format('D'));
        monthdays.push(moment(ddate).format("MM"));
        yeardays.push(moment(ddate).format("YYYY"));
        say.push("from " + moment(ddate, "D/M/YYYY", true).format("MMM") + " " + converter.toOrdinal(moment(ddate, "D/M/YYYY", true).format("D")) + " " + moment(ddate).format('D') + "/" + moment(ddate).format("MM") + "/" + moment(ddate).format("YYYY") + " to " + moment(to, "D/M/YYYY", true).format("MMM") + " " + converter.toOrdinal(moment(to, "D/M/YYYY", true).format("D")) + " " +  urlDate.day2 + "/" + urlDate.month2 + "/" + urlDate.year2);
        if (moment(ddate).diff(moment(to), 'seconds') >= 0) {
            linkt.push("/");
        }

        else {
            linkt.push("/from/" + moment(ddate).format('D') + "/" + moment(ddate).format("MM") + "/" + moment(ddate).format("YYYY") + "/to/" + urlDate.day2 + "/" + urlDate.month2 + "/" + urlDate.year2);
        }
    })
    var weekdays2 = [];
    var monthdays2 = [];
    var yeardays2 = [];
    var say2 = [];
    var linkt2 = [];
    calen2.forEach((ddate) => {
        weekdays2.push(moment(ddate).format('D'));
        monthdays2.push(moment(ddate).format("MM"));
        yeardays2.push(moment(ddate).format("YYYY"));
        say2.push("from " + moment(from, "D/M/YYYY", true).format("MMM") + " " + converter.toOrdinal(moment(from, "D/M/YYYY", true).format("D")) + " " + urlDate.day + "/" + urlDate.month + "/" + urlDate.year + " to " +moment(ddate, "D/M/YYYY", true).format("MMM") + " " + converter.toOrdinal(moment(ddate, "D/M/YYYY", true).format("D")) + " " + moment(ddate).format('D') + "/" + moment(ddate).format("MM") + "/" + moment(ddate).format("YYYY"));
        if (moment(ddate).diff(moment(from), 'seconds') <= 0) {
            linkt2.push("/");
        }

        else {
            linkt2.push("/from/" + urlDate.day + "/" + urlDate.month + "/" + urlDate.year + "/to/" + moment(ddate).format('D') + "/" + moment(ddate).format("MM") + "/" + moment(ddate).format("YYYY"));
        }
    })


    var fromD = from.format('DD');
    var fromM = from.format('MMMM');
    var fromY = from.format('YYYY');
    var toD = to.format('DD');
    var toM = to.format('MMMM');
    var toY = to.format('YYYY');
    var monthB = moment(from).format("MM");
    var monthB2 = moment(to).format("MM");
    var DFromsay = converter.toOrdinal(uDay);
    var DTosay = converter.toOrdinal(uDay2);
    var today = moment(from).format("D");
    var today2 = moment(to).format("D");
    var weeksbtw = moment(to).diff(from, 'weeks');
    var daysbtw = moment(to).diff(from, 'days');
    var hoursbtw = moment(to).diff(from, 'hours');
    var minbtw = moment(to).diff(from, 'minutes');
    var secbtw = moment(to).diff(from, 'seconds');
    var weektxt = "0 weeks";
    var daytxt = "0 days";
    var hourtxt = "0 hours";
    var mintxt = "0 minutes";
    var sectxt = "0 seconds";
    if (weeksbtw > 1) { weektxt = weeksbtw + " weeks "; } else { if (weeksbtw == 1) { weektxt = weeksbtw + " week "; } }
    if (daysbtw > 1) { daytxt = daysbtw + " days "; } else { if (daysbtw == 1) { daytxt = daysbtw + " day "; } }
    if (hoursbtw > 1) { hourtxt = hoursbtw + " hours "; } else { if (hoursbtw == 1) { hourtxt = hoursbtw + " hour "; } }
    if (minbtw > 1) { mintxt = minbtw + " minutes "; } else { if (minbtw == 1) { mintxt = minbtw + " minute "; } }
    if (secbtw > 1) { sectxt = secbtw + " seconds "; } else { if (secbtw == 1) { sectxt = secbtw + " second "; } }
    var years = 0;
    years = moment(to).diff(from, 'years');
    from.add(years, 'years');
    var months = 0;
    months = moment(to).diff(from, 'months');
    from.add(months, 'months');
    var days = 0;
    days = moment(to).diff(from, 'days');
    from.add(days, 'days');
    var hour = moment(to).diff(from, 'hours');
    from.add(hour, 'hours');
    var min = moment(to).diff(from, 'minutes');
    from.add(min, 'minutes');
    var sec = moment(to).diff(from, 'seconds');
    from.add(sec, 'seconds');
    var Ytxt = "0 years";
    var Mtxt = "0 months";
    var Dtxt = "0 days";
    var htxt = "0 hours";
    var mtxt = "0 minutes";
    var stxt = "0 seconds";
    var ytop = "";
    var mtop = "";
    var dtop = "";
    if (years > 1) { Ytxt = years + " years "; } else { if (years == 1) { Ytxt = years + " year "; } }
    if (months > 1) { Mtxt = months + " months "; } else { if (months == 1) { Mtxt = months + " month "; } }
    if (days > 1) { Dtxt = days + " days"; } else { if (days == 1) { Dtxt = days + " day"; } }

    if (years > 1) { ytop = years + " years "; } else { if (years == 1) { ytop = years + " year "; } }
    if (months > 1) { mtop = months + " months "; } else { if (months == 1) { mtop = months + " month "; } }
    if (days > 1) { dtop = days + " days"; } else { if (days == 1) { dtop = days + " day"; } }
    if (mtop == "" && ytop == "" && dtop == "") {
        if (hour > 1) { ytop = hour + " hours "; } else { if (hour == 1) { ytop = hour + " hours "; } }
        if (min > 1) { mtop = min + " minutes "; } else { if (min == 1) { mtop = min + " minutes "; } }
        if (sec > 1) { dtop = sec + " seconds"; } else { if (sec == 1) { dtop = sec + " seconds"; } }
    }
    if (hour > 1) { htxt = hour + " hours "; } else { if (hour == 1) { htxt = hour + " hours "; } }
    if (min > 1) { mtxt = min + " minutes "; } else { if (min == 1) { mtxt = min + " minutes "; } }
    if (sec > 1) { stxt = sec + " seconds"; } else { if (sec == 1) { stxt = sec + " seconds"; } }
    if (secbtw <= 0) { return res.redirect('/'); }

    if (years > 1) { Ytxt = years + " years "; } else { if (years == 1) { Ytxt = years + " year "; } }
    if (months > 1) { Mtxt = months + " months "; } else { if (months == 1) { Mtxt = months + " month "; } }
    if (days > 1) { Dtxt = days + " days"; } else { if (days == 1) { Dtxt = days + " day"; } }
    var wdays2 = converter.toOrdinal(uDay2);
    var wdays = converter.toOrdinal(uDay);
    var q1 = "How long from " + thisMonthFrom + ", " + wdays + " " + urlDate.year + " to " + thisMonthTo + ", " + wdays2 + " " + urlDate.year2;
    var a1 = "From " + thisMonthFrom + ", " + wdays + " " + urlDate.year + " to " + thisMonthTo + ", " + wdays2 + " " + urlDate.year2 + " it is " + sectxt + "or " + mintxt + "or " + hourtxt + "or " + daytxt + "or " + weektxt + " and that is ...";
    var q2 = "How many days from " + thisMonthFrom + ", " + wdays + ", "+ urlDate.year + " to " + thisMonthTo + ", " + wdays2 + " " + urlDate.year2;
    var q3 = "How many days between " + thisMonthFrom + ", " + wdays + ", "+ urlDate.year + " and " + thisMonthTo + ", " + wdays2 + " " + urlDate.year2;
    var a2 = a1;
    var desc = a1;
    res.render('index2', {
        title: "Dates Calculator",
        dayOfWeekTo: dayOfWeekTo,
        dayOfWeekFrom: dayOfWeekFrom,
        weekdays: weekdays,
        monthdays: monthdays,
        yeardays: yeardays,
        weekdays2: weekdays2,
        monthdays2: monthdays2,
        yeardays2: yeardays2,
        yearURL: urlDate.year,
        monthURL: urlDate.month,
        dayURL: urlDate.day,
        yearURL2: urlDate.year2,
        monthURL2: urlDate.month2,
        dayURL2: urlDate.day2,
        fromY: fromY,
        fromM: fromM,
        fromD: fromD, 
        toY: toY, 
        toM: toM, 
        toD: toD, 
        DFromsay: DFromsay,
        DTosay: DTosay,
        Ytxt: Ytxt,
        Mtxt: Mtxt,
        Dtxt: Dtxt,
        monthL8rTo: monthL8rTo,
        nextMonthTo: nextMonthTo,
        monthB4To: monthB4To,
        beforeMonthTo: beforeMonthTo,
        monthL8rFrom: monthL8rFrom,
        nextMonthFrom: nextMonthFrom,
        monthB4From: monthB4From,
        beforeMonthFrom: beforeMonthFrom,
        thisMonthTo: thisMonthTo,
        thisMonthFrom: thisMonthFrom,
        randomArr: randomArr,
        randomMonthSay: randomMonthSay,
        randomArr2: randomArr2,
        randomMonthSay2: randomMonthSay2,
        say: say,
        say2: say2,
        weeksbtw: weeksbtw,
        daysbtw:daysbtw,
        hoursbtw: hoursbtw,
        minbtw: minbtw,
        secbtw:secbtw,
        weektxt:weektxt,
        daytxt:daytxt,
        hourtxt:hourtxt,
        mintxt:mintxt,
        sectxt:sectxt,
        htxt:htxt,
        mtxt:mtxt,
        stxt:stxt,
        ytop:ytop,
        mtop:mtop,
        dtop: dtop,
        today: today,
        today2: today2,
        monthB: monthB,
        monthB2: monthB2,
        daysbtw: daysbtw,
        wdays: wdays,
        wdays2: wdays2,
        q1: q1,
        q2: q2,
        a1: a1,
        a2: a2,
        desc: desc,
        monthB4froml: monthB4froml,
        monthL8rfroml: monthL8rfroml,
        monthB4tol: monthB4tol,
        monthL8rtol: monthL8rtol,
        linkt: linkt,
        linkt2: linkt2,
        q3:q3
    })
});
app.get('/now/add/:days', function (req, res) {
    var now = moment();
    var randomDay = [];
    for (var i = 0; i < 10; i++) {
        randomDay.push(Math.floor(Math.random() * (366 - 2) + 2));
    }
    var urlDate = req.params;

    var dateJSON = JSON.stringify(urlDate);
    var obj = JSON.parse(dateJSON);

    var days = parseInt(urlDate.days);
    if (days <= 0) { return res.redirect('/'); }
  
    var dateFromNow = moment(now).add(days, 'days').format("DD/MM/YYYY");
    if (!Number.isInteger(parseInt(days))) { return res.redirect('/'); }
    var dateFromNowM = moment(now).add(days, 'days').format("MMM")
    var nowSay = moment(now).format("DD/MM/YYYY");
    var daySay="days";
    if (days == 1) { daySay = "day" }
    var txtD = converter.toOrdinal(parseInt(moment(now).add(days, 'days').format("D")));
    var txtM = moment(now).add(days, 'days').format("MMM");
    var weeks =  Math.floor(days / 7);
    var hours = days * 24;
    var min = hours * 60;
    var sec = min * 60;
    var weektxt = " weeks";
    var daytxt = " days";
    var hourtxt=" hours";
    var mintxt = " minutes";
    var sectxt = " seconds";
    if (weeks == 1) { weektxt = " week"; }
    if (days == 1) { daytxt = " day"; }
    if (hours == 1) { hourstxt = " hour"; }
    if (min == 1) { mintxt = " minute"; }
    if (sec == 1) { sectxt = " seconds"; }

    var q1 = "What date is " + days+ " days ahead of now?";
    var a1 = "The date that is " + days + daytxt + " ahead is also " + sec + sectxt + " or " + min + mintxt + " or " + hours + hourtxt + " or " + days + daytxt+ " or " + weeks +weektxt+ " ahead and that is ...";
    var desc = a1;
    res.render('index3', {
        title: "Dates Calculator",
        days: days,
        dateFromNow: dateFromNow,
        dateFromNowM: dateFromNowM,
        nowSay: nowSay,
        daySay: daySay,
        randomDay: randomDay,
        txtD: txtD,
        txtM: txtM,
        weeks: weeks,
        hours: hours,
        min: min,
        sec: sec,
        a1: a1,
        q1: q1,
        desc: desc,
        weektxt: weektxt,
        daytxt: daytxt,
        hourtxt: hourtxt,
        mintxt: mintxt,
        sectxt: sectxt
    })
});
app.get('/*', function (req, res) {
    function randomDate(start, end) {
        var date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        return day + "/" + month + "/" + year
    }
    var now = moment();
    var randomArr = [];
    //var randomWeek = [];
    //var randomDay = [];
    //var randomMonth = [];
    var randomMonthSay = [];
    var start = new Date(moment(now).format("YYYY"), moment(now).format("M"), moment(now).format("D"));
    var end = new Date(2021, 12, 31);
    for (var i = 0; i < 10; i++) {
        randomArr.push(randomDate(start, end));
        randomMonthSay.push(moment(randomArr[i], "D/M/YYYY", true).format("MMM") + " " + converter.toOrdinal(moment(randomArr[i], "D/M/YYYY", true).format("D")));
    }
    var randomArr1 = [];
    var randomMonthSay1 = [];
    var start1 = new Date(2015, 1, 1);
    var end1 = new Date(2019, 12, 31);
    for (var i = 0; i < 10; i++) {
        randomArr1.push(randomDate(start1, end1));
        randomMonthSay1.push(moment(randomArr1[i], "D/M/YYYY", true).format("MMM") + " " + converter.toOrdinal(moment(randomArr1[i], "D/M/YYYY", true).format("D")));
    }
    var randomDay = [];
    for (var i = 0; i < 4; i++) {
        randomDay.push(Math.floor(Math.random() * (366 - 2) + 2));
    }
    var randomArr2 = [];
    var randomMonthSay2 = [];
    var start2 = new Date(2020, 1, 1);
    var end2 = new Date(2025, 1, 1);
    for (var i = 0; i < 10; i++) {
        randomArr2.push(randomDate(start2, end2));
        randomMonthSay2.push(moment(randomArr2[i], "D/M/YYYY", true).format("MMM") + " " + converter.toOrdinal(moment(randomArr2[i], "D/M/YYYY", true).format("D")));
    }
    res.render('home', {
        randomArr: randomArr,
        randomMonthSay: randomMonthSay,
        randomArr1: randomArr1,
        randomMonthSay1: randomMonthSay1,
        randomArr2: randomArr2,
        randomMonthSay2: randomMonthSay2,
        randomDay:randomDay
    })
});
app.listen(80);