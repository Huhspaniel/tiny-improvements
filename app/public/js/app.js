let kudosList = [];

function getKudos(cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/kudos/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        cb(JSON.parse(xhr.response));
    }
    xhr.send();
}
const Kudos = props => (
    `<div class='kudos' key=${props._id}>
        <h2>${props.title}</h2>
        <h3>From: ${props.from.name}</h3>
        <h3>To: ${props.to.name}</h3>
        <p>${props.body}</p>
    </div>`
)
function render() {
    console.log(kudosList);
    kudosList.forEach(props => {
        document.querySelector('.kudos-list').innerHTML += Kudos(props);
    })
}
getKudos(data => {
    kudosList = data;
    render();
})
