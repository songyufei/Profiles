var lang = "zh"
var lat_lon = "28.6156932200,119.0373624200"   //浙江省丽水市遂昌县金竹镇
//var lat_lon = "30.2596922200,120.2006859900" //浙江省杭州市江干区
var api = "892b9c8df0a959fa5bbcfb2ca849a69b"
//第三行引号内填入申请到的dark sky api
//有问题请通过Telegram反馈 https://t.me/Leped_Bot
//clear-day, partly-cloudy-day, cloudy, clear-night, rain, snow, sleet, wind, fog, or partly-cloudy-night
//☀️🌤⛅️🌥☁️🌦🌧⛈🌩🌨❄️💧💦🌫☔️☂️ ☃️⛄️
var wurl = {
    //url: "https://free-api.heweather.net/s6/weather/now?&location=" + coordinate + "&key=" + key,
    url: "https://api.darksky.net/forecast/" + api + "/" + lat_lon + "?lang=" + lang +
        "&units=si&exclude=currently,minutely",
};


$task.fetch(wurl).then(response => {
    var obj = JSON.parse(response.body);
    //console.log(obj);
    var hour_summary = obj.hourly.summary;
    var icon_text = obj.hourly.icon;
    var icon = "❓"
    if (icon_text == "clear-day") icon = "☀️";
    if (icon_text == "partly-cloudy-day") icon = "🌤";
    if (icon_text == "cloudy") icon = "☁️";
    if (icon_text == "rain") icon = "🌧";
    if (icon_text == "snow") icon = "☃️";
    if (icon_text == "sleet") icon = "🌨";
    if (icon_text == "wind") icon = "🌬";
    if (icon_text == "fog") icon = "🌫";
    if (icon_text == "partly-cloudy-night") icon = "🌑";
    if (icon_text == "clear-night") icon = "🌑";
    var daily_prec_chance = obj.daily.data[0].precipProbability;
    var daily_maxtemp = obj.daily.data[0].temperatureMax;
    var daily_mintemp = obj.daily.data[0].temperatureMin;
    //$notification.post("Dark Sky", icon + " " + Math.round(daily_mintemp) + " - " + Math.round(daily_maxtemp) + "  ☔️% " + Math.round(Number(daily_prec_chance) * 100), hour_summary);
    $notify("Dark Sky", icon + " " + Math.round(daily_mintemp) + " - " + Math.round(daily_maxtemp) + "  ☔️ " +
        (Number(daily_prec_chance) * 100).toFixed(1) + "%", hour_summary);


}, reason => {
    $notify("Dark Sky", lat_lon + '信息获取失败', reason.error);
});