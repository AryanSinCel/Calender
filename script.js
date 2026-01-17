function updateCalender() {
    const now = new Date();
    const day = now.getDate();
    const monthName = ["january","february","march","april","may","june","july","august","september","october","november","december"];
    const month = monthName[now.getMonth()];
    document.getElementById("day").textContent = day;
    document.getElementById("month").textContent = month;
}

// Color customization functions
function loadSavedColors() {
    const savedBg = localStorage.getItem('bgColor');
    const savedBorder = localStorage.getItem('borderColor');
    const savedAccent = localStorage.getItem('accentColor');
    const savedText = localStorage.getItem('textColor');
    
    if (savedBg) {
        document.body.style.background = savedBg;
    }
    if (savedBorder) {
        document.body.style.borderColor = savedBorder;
        document.querySelector('.calender').style.borderColor = savedBorder;
    }
    if (savedAccent) {
        document.querySelector('.title').style.background = savedAccent;
        document.querySelector('.calender').style.background = savedAccent;
    }
    if (savedText) {
        document.querySelector('#day').style.color = savedText;
        document.querySelector('#month').style.color = savedText;
        document.querySelector('.title').style.color = savedText;
    }
}

// Initialize
updateCalender();
loadSavedColors();

function applyColorsFromObject(colors) {
    // Apply to body
    document.body.style.background = colors.bgColor;
    document.body.style.borderColor = colors.borderColor;
    
    // Apply to title and calendar
    document.querySelector('.title').style.background = colors.accentColor;
    document.querySelector('.calender').style.background = colors.accentColor;
    document.querySelector('.calender').style.borderColor = colors.borderColor;
    
    // Apply to text
    document.querySelector('#day').style.color = colors.textColor;
    document.querySelector('#month').style.color = colors.textColor;
    document.querySelector('.title').style.color = colors.textColor;
}

// Open color picker window on title click
const titleDiv = document.getElementById('titleDiv');
if (titleDiv) {
    titleDiv.addEventListener('click', function() {
        console.log('Title clicked, attempting to open color picker...');
        if (window.electronAPI) {
            console.log('electronAPI found, calling openColorPicker');
            window.electronAPI.openColorPicker();
        } else {
            console.error('electronAPI not found!');
        }
    });
}

// Listen for color updates from color picker window
if (window.electronAPI) {
    window.electronAPI.onColorsUpdate((colors) => {
        console.log('Received color update:', colors);
        applyColorsFromObject(colors);
    });
} else {
    console.error('electronAPI not available for color updates');
}