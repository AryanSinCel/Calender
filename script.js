function updateCalender() {
    const now = new Date();
    const day = now.getDate();
    const monthName = ["january","february","march","april","may","june","july","august","september","october","november","december"];
    const month = monthName[now.getMonth()];
    document.getElementById("day").textContent = day;
    document.getElementById("month").textContent = month;
}

updateCalender();