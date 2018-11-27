let kudoList = [];

function getKudos(cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/kudos/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        cb(JSON.parse(xhr.response));
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
    xhr.send(kudo);
}
const Kudo = props => (
    `<div class='kudo' key=${props._id}>
        <h2>${props.title}</h2>
        <h3>From: ${props.from.name}</h3>
        <h3>To: ${props.to.name}</h3>
        <p>${props.body}</p>
    </div>`
)
function render() {
    console.log(kudoList);
    kudoList.forEach(props => {
        document.querySelector('.kudo-list').innerHTML += Kudo(props);
    })
}
getKudos(data => {
    kudoList = data;
    render();
})
