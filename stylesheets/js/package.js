let data = []
let packageTotal = document.querySelector('.total');
const typeList = {
    package: 'packageList',
    registered: 'registeredList',
    frozen: 'frozenList',
    refrigerated: 'refrigeratedList'
};
init()
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
function render() {
    const typeCounts = {};
    let total = 0;
    data.forEach((item) => {
        const { type, date, household, count } = item;
        const typeName = typeList[type];
        const element = document.querySelector(`.${typeName}`);
        if (typeCounts[type]) {
            typeCounts[type]++;
        } else {
            typeCounts[type] = 1;
        }
        total += Number(count);
        element.innerHTML += strHtml(type, date, household, count, typeCounts[type]);
    });
    packageTotal.innerHTML = `目前數量:${total}`;
}
function strHtml(type, date, household, count, num) {
    return `
    <tr>
        <th scope="row">${num}</th>
        <td>${date}</td>
        <td>${household}</td>
        <td>${count}</td>
        <td>萬春</td>
    </tr>
    `
}