const categoryIcons = {
    trending: '<i class="fa-solid fa-fire"></i>',
    rooms: '<i class="fa-solid fa-bed"></i>',
    iconiccities: '<i class="fa-solid fa-mountain-city"></i>',
    mountains: '<i class="fa-solid fa-mountain"></i>',
    castles: '<i class="fa-brands fa-fort-awesome"></i>',
    amazingpools: '<i class="fa-solid fa-person-swimming"></i>',
    camping: '<i class="fa-solid fa-campground"></i>',
    farms: '<i class="fa-solid fa-cow"></i>',
    arctic: '<i class="fa-regular fa-snowflake"></i>',
    domes: '<i class="fa-solid fa-igloo"></i>',
    boats: '<i class="fa-solid fa-ship"></i>'
};

function getCategoryIcon(category) {
    return categoryIcons[category.toLowerCase()] || ''; // Return empty string if no icon is found
}


module.exports = { getCategoryIcon };
