let today = new Date();

exports.getDate = function() {
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    return today.toLocaleDateString("en-US", options);
}

exports.getWeekDay = function() {
    let currentDay = today.getDay();
    let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekDays[currentDay];
}