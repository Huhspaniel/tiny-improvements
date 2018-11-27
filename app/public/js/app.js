let kudoList = [];
const DOM = {
    kudoTitle: document.querySelector('.kudo-title'),
    kudoBody: document.querySelector('.kudo-body'),
    kudoSubmit: document.querySelector('.kudo-submit'),
    kudoTo: document.querySelector('.kudo-to'),
    kudoFrom: document.querySelector('.kudo-from')
}

function getKudos(cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/kudos/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        cb(kudoList = JSON.parse(xhr.response));
    }
    xhr.send();
}
function postKudo(kudo, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/kudos');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        const res = JSON.parse(xhr.response);
        cb ? cb(res) : console.log(res);
    }
    xhr.send(JSON.stringify(kudo));
}
function getKudoInput() {
    return {
        title: DOM.kudoTitle.value,
        body: DOM.kudoBody.value,
        to: DOM.kudoTo.value,
        from: DOM.kudoFrom.value
    };
}
function clearKudoInput() {
    DOM.kudoTitle.value = '';
    DOM.kudoBody.value = '';
    DOM.kudoFrom.value = '';
    DOM.kudoTo.value = '';
}
const Kudo = props => (
    `<div class='kudo' key=${props._id}>
        <h2>${props.title}</h2>
        <h3>From: ${props.from.name}</h3>
        <h3>To: ${props.to.name}</h3>
        <p>${props.body}</p>
    </div>`
)
function renderKudos() {
    kudoList.forEach(props => {
        document.querySelector('.kudo-list').innerHTML += Kudo(props);
    })
}
getKudos(data => {
    console.log(data);
    renderKudos();
})
document.querySelector('.kudo-submit').addEventListener('click', e => {
    e.preventDefault();
    postKudo(getKudoInput());
    getKudos(renderKudos);
})
