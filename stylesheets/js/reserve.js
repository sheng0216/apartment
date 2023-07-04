let reserveList = document.querySelector('.reserveList');
let reserveDate = document.querySelector('.js-reserveDate');
let data = []
init()
update()
function init() {
    axios.get('https://safe-temple-77331-4df6e3bd9ebd.herokuapp.com/reservation')
        .then(res => {
            data = res.data;
            render(data)
        })
}
function render(newData) {
    let str = "";
    newData.forEach(item => {
        const { name, floor, date, timeStart, timeEnd } = item;
        str += strHtml(name, floor, date, timeStart, timeEnd)
    })
    reserveList.innerHTML = str;
}
function strHtml(name, floor, date, timeStart, timeEnd) {
    return `
    <div class="col-6 col-sm-4">
        <div class="card border-primary">
            <div class="card-body d-flex flex-column">
                <time class="mb-1">${date}</time>
                <span class="mb-1">${timeStart}-${timeEnd}</span>
                <ul class="d-flex list-unstyled m-0">
                    <li class="me-3">${floor}</li>
                    <li>${name}</li>
                </ul>
            </div>
        </div>
    </div>
    `;
}
function update() {
    let startOfWeek = dayjs().startOf('week');
    let daysOfWeek = [];
    for (let i = 0; i < reserveDate.childElementCount; i++) {
        const day = startOfWeek.add(i, 'day').format('MM-DD');
        daysOfWeek.push(day);
    }
    let str = "";
    daysOfWeek.forEach(item => {
        const dateSplit = item.split('-');
        const date = dateSplit[1];
        str += `
        <li>
            <a href="#"
            class="reserve-item reserve-hover border border-primary rounded-3 text-primary link-active" data-date="${item}">${date}</a>
        </li>
        `;
    })
    reserveDate.innerHTML = str;
    click()

}
function click() {
    reserveDate.addEventListener('click', function (e) {
        e.preventDefault();
        let date = e.target.getAttribute('data-date')
        if (date === null) {
            return
        }
        let nowDate = dayjs(date, 'MM-DD');
        let numberWeekday = nowDate.day();
        let filteredData = data.filter(item => {
            let itemDate = dayjs(item.date, 'M-D');
            let itemWeekday = itemDate.day();
            return itemDate.isSame(nowDate, 'day') || itemWeekday === numberWeekday;
        });
        render(filteredData)
    })
}