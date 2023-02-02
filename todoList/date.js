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

// db.products.insert({
//     _id: 1,
//     name: "Rubber",
//     price: 1.30,
//     stock: 32,
//     reviews: [
//         {
//             authorName: "Eugene",
//             rating: 4,
//             review: "best rubber ever!"
//         },
//         {
//             authorName: "Natali",
//             rating: 5,
//             review: "best!"
//         }

//     ]
// })