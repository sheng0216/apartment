let floor = document.querySelector('.js-floor');
let btn = document.querySelector(".js-btn");
let floorData = [];
for (let floor = 1; floor <= 9; floor++) {
    if (floor === 4) {
        continue;
    }
    const households = [];
    for (let unit = 1; unit <= 8; unit++) {
        if (unit === 4) {
            continue;
        }
        households.push(`${floor}-${unit}`);
    }
    floorData.push({
        floor: `${floor}`,
        households: households
    });
}
function render() {
    let str = '<option selected>選擇樓層</option>';
    floorData.forEach(item => {
        item.households.forEach(items => {
            str += `<option value="${items}">${items}</option>`
        })
    })
    floor.innerHTML = str;
}
render()
document.querySelectorAll('.text-danger').forEach(item => {
    item.style.display = 'none';
})
btn.addEventListener('click', function (e) {
    e.preventDefault();
    let form = document.querySelector('.js-form');
    let name = document.querySelector("#js-name");
    let floor = document.querySelector("#js-floor").value;
    let date = document.querySelector("#js-date").value;
    let changeDate = dayjs(date, 'MM/DD/YYYY').format('MM-DD');
    let timeStart = document.querySelector('#js-timeStart').value;
    let timeEnd = document.querySelector('#js-timeEnd').value;
    let obj = {
        name: name.value,
        floor: floor,
        date: changeDate,
        timeStart: timeStart,
        timeEnd: timeEnd
    }
    let isDataSent = false;
    let ary = Object.keys(obj).forEach(item => {
        if (obj[item] === '' || obj[item] === '選擇樓層' || obj[item] === 'Invalid Date' || obj[item] === '選擇時間') {
            document.querySelector(`.${item}`).style.display = 'block';
            isDataSent = true;
        }
    })
    if (!isDataSent) {
        addData(obj)
        form.reset();
    }

})
function addData(obj) {
    axios.post(`https://safe-temple-77331-4df6e3bd9ebd.herokuapp.com/reservation`, obj)
        .then(res => {
            console.log(res);
            window.location.href = 'finish.html';
        })
        .catch(err => {
            console.log(err);
        })
}

