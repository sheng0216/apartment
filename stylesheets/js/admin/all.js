let urlPackage = `https://safe-temple-77331-4df6e3bd9ebd.herokuapp.com/package`;
let packagelist = document.querySelector('.js-package');
let btnPackage = document.querySelector(".btnPackage");
const typeList = {
    package: 'packageList',
    registered: 'registeredList',
    frozen: 'frozenList',
    refrigerated: 'refrigeratedList'
};
//包裹資料
let data = []


//初始化
function init() {
    axios.get(`https://safe-temple-77331-4df6e3bd9ebd.herokuapp.com/package`)
        .then(res => {
            data = res.data;
            render()
        })
        .catch(err => {
            console.log(err);
        })
}
init()
//渲染資料畫面
function render() {
    let str = '';
    data.forEach((item, index) => {
        const { date, household, count, id, type } = item;
        let packageType = type === 'package' ? '包裹' : type === 'registered' ? '掛號' : type === 'frozen' ? '冷凍' : type === 'refrigerated' ? '冷藏' : '';
        str += `
        <tr>
        <th scope="row">${index + 1}</th>
        <td>${date}</td>
        <td>${household}</td>
        <td>${packageType}</td>
        <td>${count}</td>
        <td>
            <button type="button" class="btn btn-primary btn-sm" data-btn="${id}">刪除</button>
        </td>
    </tr>
        `;
    });
    packagelist.innerHTML = str
}
//隱藏錯誤訊息
document.querySelectorAll('.text-danger').forEach(item => {
    item.style.display = 'none';
})
//送出監聽事件
btnPackage.addEventListener("click", function (e) {
    e.preventDefault()
    let getDate = new Date();
    let today = `${getDate.getMonth() + 1}/${getDate.getDate()}`;
    let form = document.querySelector('.js-form');
    let household = document.querySelector('#household').value;
    let type = document.querySelector('#type').value;
    let count = document.querySelector('#count').value;
    let obj = {
        household: household,
        count: count,
        type: type
    }
    let isDataSent = false;
    let ary = Object.keys(obj).forEach(item => {
        if (obj[item] === '' || obj[item] === '選擇種類') {
            document.querySelector(`.js-${item}`).style.display = 'block';
            isDataSent = true;
        }
    })
    if (!isDataSent) {
        obj.date = today;
        form.reset();
        addData(obj)
    }
})
//新增
function addData(obj) {
    console.log(obj);
    axios.post(`https://safe-temple-77331-4df6e3bd9ebd.herokuapp.com/package`, obj)
        .then(res => {
            console.log(res);
            init()
        })
        .catch(err => {
            console.log(err.data);
        })
}
//刪除監聽
packagelist.addEventListener('click', function (e) {
    e.preventDefault();
    let id = e.target.getAttribute('data-btn');
    if (id === null) {
        return
    }
    console.log(id);
    deletePackage(id)
})
//刪除
function deletePackage(id) {
    console.log(id);
    axios.delete(`https://safe-temple-77331-4df6e3bd9ebd.herokuapp.com/package/${id}`)
        .then(res => {
            alert(`刪除成功`)
            init()
        })
        .catch(err => {
            alert(`刪除失敗`)
        })
}