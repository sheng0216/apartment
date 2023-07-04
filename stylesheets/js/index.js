let url = `https://safe-temple-77331-4df6e3bd9ebd.herokuapp.com/package`;
let packageData = [];
let commentData = [];
let firmData = [];
let total = document.querySelector('.total')
let comment = document.querySelector('.comment');
let firmType = document.querySelector('.firmType');
let firmList = document.querySelector('.firmList');
let totalList = {
    package: 'packageTotal',
    registered: 'registeredTotal',
    frozen: 'frozenTotal',
    refrigerated: 'refrigeratedTotal'
}
init()
//初始化
function init() {
    axios.get(`https://safe-temple-77331-4df6e3bd9ebd.herokuapp.com/package`)
        .then(res => {
            packageData = res.data;
            render()
        })
        .catch(err => {
            console.log(err.data);
        })
    axios.get(`https://safe-temple-77331-4df6e3bd9ebd.herokuapp.com/comments`)
        .then(res => {
            commentData = res.data;
            renderComment();
        })
        .catch(err => {
            console.log(err.data);
        })
    axios.get(`https://safe-temple-77331-4df6e3bd9ebd.herokuapp.com/firm`)
        .then(res => {
            firmData = res.data;
            renderFirm(firmData)
        })
        .catch(err => {
            console.log(err.data);
        })

}
//渲染包裹畫面
function render() {
    let num = 0;
    const typeCounts = {};
    packageData.forEach(item => {
        const { type, count } = item;
        const totalName = totalList[type];
        const element = document.querySelector(`.${totalName}`);
        num += Number(count)
        if (typeCounts[type]) {
            typeCounts[type] += Number(count)
        } else {
            typeCounts[type] = Number(count)
        }
        element.innerHTML = `${typeCounts[type]}件`
    })
    total.innerHTML = `目前數量:${num}件`;
}
//渲染住戶意見
function renderComment() {
    let str = '';
    commentData.forEach(item => {
        const { date, question, state } = item;
        if (state) {
            str += strComment(date, question)
        }
    })
    comment.innerHTML = str;
}
//住戶意見資料
function strComment(date, question) {
    return `
    <div class="swiper-slide">
        <div class="ratio ratio-104x75">
            <div class="card rounded-3 bg-primary p-4">
                <div class="card-body p-0 d-flex flex-column align-items-start">
                    <time class="h4 mb-2">
                        ${date}
                    </time>
                    <p class="text-hidden overflow-hidden mb-auto">
                        ${question}
                    </p>
                    <a href="comment.html" class="btn btn-white text-primary fw-bold">
                        回復
                    </a>
                </div>
            </div>
        </div>
    </div>
    
    `;
}
//監聽廠商list渲染資料
firmType.addEventListener('click', function (e) {
    e.preventDefault();
    let type = e.target.getAttribute('data-type');
    console.log(type);
    if (type === null) {
        return
    }

    let choose = firmData.filter(item => {
        return type === "all" ? true : item.type === type;
    })
    renderFirm(choose)
})
//渲染廠商資料
function renderFirm(choose) {
    let str = "";
    choose.forEach(item => {
        str += strFirm(item);
    })
    firmList.innerHTML = str
}
//廠商資料
function strFirm(item) {
    return `
    <div class="col-sm-6 col-md-4 rotate-hover">
                        <div class="bg-white border text-center rounded-3 text-primary border-5">
                            <div class="icon rounded-circle position-relative bg-white h1 lh-lg">
                                <i class="fa-solid fa-gavel"></i>
                            </div>
                            <div class="p-4">
                                <h3 class="h3 mb-2">${item.company}</h3>
                                <p class="h4 mb-2">${item.name}</p>
                                <a href="tel:${item.phone}" class="h5 text-primary ">
                                    <span class="material-icons align-middle">
                                        call
                                    </span>
                                    ${item.phone}</a>
                            </div>
                        </div>
                    </div>
    `;
}

