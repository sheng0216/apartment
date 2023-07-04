let data = []
let firmTpye = document.querySelector('.js-firmTpye');
let firmList = document.querySelector('.js-firmList');
let typeIcon = {
    builder: 'apartment',//建設公司
    facilities: 'manage_accounts',//公社廠商
    house: 'room_preferences',//屋內設施
    clean: 'cleaning_services',//清潔
    electrician: 'engineering'//水電
}
// init()
//初始化
function init() {
    axios.get(`https://safe-temple-77331-4df6e3bd9ebd.herokuapp.com/firm`)
        .then(res => {
            data = res.data;
            render(data)
        })
        .catch(err => {
            console.log(err);
        })
}
//選染清單
function render(data) {
    let str = '';
    data.forEach(item => {
        let = { company, name, phone, content, type } = item;
        str += strFrim(company, name, phone, content, type)
    })
    firmList.innerHTML = str
}
//清單資料
function strFrim(company, name, phone, content, type) {
    let icon = typeIcon[type]
    return `
    <div class="col-sm-6 col-lg-4">
        <div class="card border-primary">
            <div class="card-body">
                <div class="d-flex justify-content-center mb-3 flex-grow-1">
                <span class="material-icons h1">
                    ${icon}
                </span>
                </div>
                <ul class="list-unstyled  d-flex flex-column gap-row-1 mb-0">
                    <li>
                        <i class="fa-solid fa-user align-middle"></i>
                        <span>${name}</span>
                    </li>
                    <li>
                        <i class="fa-solid fa-phone"></i>
                        <a href="tel:${phone}" class="text-primary">${phone}</a>
                    </li>
                    <li>
                        <i class="fa-solid fa-pen-to-square align-middle"></i>
                        <span>
                            ${content}
                        </span>

                    </li>
                </ul>
            </div>
        </div>
    </div>
    `;
}




let page = document.querySelector('.js-page');
let pageLimit = 6;
initPage();
function initPage() {
    getDate(1)
}
let pageData = [];
let filterData = [];

function getDate(pageBtn, type) {
    let url = `https://safe-temple-77331-4df6e3bd9ebd.herokuapp.com/firm?_page=${pageBtn}&_limit=${pageLimit}${type ? `&type=${type}` : ''}`;
    axios.get(url)
        .then(res => {
            pageData = res.data;
            let pageTotal = Math.ceil(res.headers['x-total-count'] / pageLimit)
            renderDataLimit(pageData, pageTotal, type)

        })
        .catch(err => {
            console.log(err);
        })
}
//渲染廠商資料和分頁
function renderDataLimit(data, pageTotal, type) {
    //廠商資料
    let str = ''
    data.forEach(item => {
        let { company, name, phone, content, type } = item;
        str += strFirm(company, name, phone, content, type);
    })
    firmList.innerHTML = str;
    //分頁資料
    page.innerHTML = strPage(pageTotal, type)

}
//分頁結構
function strPage(pageTotal, type) {
    let iconStart = `<li class="page-item">
    <a class="page-link text-primary" href="#" data-page="left" aria-label="Previous">
        <span aria-hidden="true" data-page="left">&laquo;</span>
    </a>
    </li>`;
    let iconEnd = `<li class="page-item">
    <a class="page-link text-primary" href="#" aria-label="Next" data-page="right">
        <span aria-hidden="true"  data-page="right">&raquo;</span>
    </a>
    </li>`;
    let str = '';
    for (let i = 0; i < pageTotal; i++) {
        let dataAttribute = type !== null && type !== undefined ? `data-type="${type}"` : '';
        str += ` <li class="page-item"><a class="page-link text-primary" href="#"  ${dataAttribute} data-page="${i + 1}">${i + 1}</a></li>`
    }
    return `${iconStart}${str}${iconEnd}`;
}
//廠商資料
function strFirm(company, name, phone, content, type) {
    let icon = typeIcon[type]
    return `
    <div class="col-sm-6 col-lg-4">
        <div class="card border-primary">
            <div class="card-body">
                <div class="d-flex justify-content-center mb-3 flex-grow-1">
                    <span class="material-icons h1">
                        ${icon}
                    </span>
                </div>
                <h3 class="h5 mb-2 text-center">${company}</h3>
                <ul class="list-unstyled  d-flex flex-column gap-row-1 mb-0">
                    <li>
                        <i class="fa-solid fa-user align-middle"></i>
                        <span>${name}</span>
                    </li>
                    <li>
                        <i class="fa-solid fa-phone"></i>
                        <a href="tel:${phone}" class="text-primary">${phone}</a>
                    </li>
                    <li>
                        <i class="fa-solid fa-pen-to-square align-middle"></i>
                        <span>
                            ${content}
                        </span>

                    </li>
                </ul>
            </div>
        </div>
    </div>
    `;
}
//點擊分頁切換頁面
page.addEventListener('click', function (e) {
    e.preventDefault()
    let pageBtn = e.target.getAttribute('data-page');
    let type = e.target.getAttribute('data-type')
    if (pageBtn === null) {
        return
    }
    getDate(pageBtn, type)
})
//點擊list切換
firmTpye.addEventListener('click', function (e) {
    let type = e.target.getAttribute('data-type');
    if (type === 'all') {
        type = null
    }
    getDate(1, type)
})

