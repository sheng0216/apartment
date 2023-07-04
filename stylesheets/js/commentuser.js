let floor = document.querySelector('.js-floor');
let btn = document.querySelector('.js-btn');
let commentModal = document.getElementById('＃addcomment');
let floorData = [];
for (let floor = 1; floor <= 9; floor++) {
    // 跳過戶數為4的選項
    if (floor === 4) {
        continue;
    }
    const households = [];
    for (let unit = 1; unit <= 8; unit++) {
        // 跳過戶數為4的選項
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
document.querySelectorAll('.text-danger').forEach(item => {
    item.style.display = 'none';
})
init()
btn.addEventListener('click', function (e) {
    e.preventDefault();
    let getDate = new Date();
    let today = `${getDate.getFullYear()}-${getDate.getMonth() + 1}-${getDate.getDate()}`;
    let form = document.querySelector('.js-form');
    let name = document.querySelector('#js-name');
    let household = document.querySelector('#js-household');
    let content = document.querySelector('#js-content');
    let obj = {
        name: name.value,
        household: household.value,
        content: content.value
    }
    let isDataSent = false;
    let ary = Object.keys(obj).forEach(item => {
        console.log(item);
        if (obj[item] === '' || obj[item] === '選擇樓層') {
            document.querySelector(`.js-${item}`).style.display = 'block';
            isDataSent = true;
        }
    })
    if (!isDataSent) {
        obj.date = today;
        addData(obj)
        form.reset();
    }
})
function init() {
    let str = '<option selected>選擇樓層</option>';
    floorData.forEach(item => {
        item.households.forEach(items => {
            str += `<option value="${items}">${items}</option>`
        })
    })
    floor.innerHTML = str;
}
function addData(obj) {
    axios.post(`https://safe-temple-77331-4df6e3bd9ebd.herokuapp.com/comments`, obj)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
}