let data = []
let commentList = document.querySelector(".commentList");
init()
function init() {
    axios.get(`https://safe-temple-77331-4df6e3bd9ebd.herokuapp.com/comments`)
        .then(res => {
            data = res.data;
            render();
        })
        .catch(err => {
            console.log(err);
        })
}
function render() {
    let str = '';
    let reply = data.filter(item => item.state === 'true')
    reply.forEach((item, index) => {
        const { date, question, answer, replyDate, id } = item;
        str += strHtml(date, question, answer, replyDate, index, id)
    })
    commentList.innerHTML = str
}
function strHtml(date, question, answer, replyDate, index, id) {
    const addClass = index % 2 === 0;
    const isEven = addClass ? 'me-md-auto' : '';
    return `
    <li class="col-10 col-md-5 ${isEven} timeLine-item">
        <div class="p-4 border border-3">
        <time class="mb-2 d-block">${date}</time>
        <div class="d-flex align-items-start justify-content-between">
            <p class="me-3">${question}</p>
            <button class="btn btn-primary" type="button" data-bs-toggle="collapse"
                data-bs-target="#commentbtn${id}">
                <span class="material-icons">
                    expand_more
                </span>

            </button>
        </div>
        <div class="border-top pt-2 mt-2 collapse" id="commentbtn${id}">
                <time class="mb-2 d-block">${replyDate}</time>
                <p>${answer}</p>
            </div>
        </div>
    </li>
    `;
}