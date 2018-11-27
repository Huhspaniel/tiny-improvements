const DOM = {
    kudoTitle: document.querySelector('.kudo-title'),
    kudoBody: document.querySelector('.kudo-body'),
    kudoSubmit: document.querySelector('.kudo-submit'),
    kudoTo: document.querySelector('.kudo-to'),
    kudoFrom: document.querySelector('.kudo-from'),
    kudoList: document.querySelector('.kudo-list')
}

function ajaxJSON({ type, url, success, error, data }) {
    const xhr = new XMLHttpRequest();
    try {
        xhr.open(type.toUpperCase(), url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        if (success) xhr.onload = () => {
            success(JSON.parse(xhr.response));
        };
        xhr.send(JSON.stringify(data));
    } catch (err) {
        if (error) error(err);
        else throw err;
    }
}
function getUsers(onload) {
    ajaxJSON({
        type: 'GET',
        url: '/api/users',
        success: onload
    });
}
function getKudos(onload) {
    ajaxJSON({
        type: 'GET',
        url: '/api/kudos',
        success: onload
    });
}
function postKudo(kudo, onload) {
    ajaxJSON({
        type: 'POST',
        url: '/api/kudos',
        success: onload,
        data: kudo
    });
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
}
function clearKudos() {
    DOM.kudoList.innerHTML = '';
}
function clear() {
    clearKudoInput();
    clearKudos();
}

const Kudo = props => (
    `<div class='kudo' key=${props._id}>
        <h3>${props.title}</h3>
        <h4>From: ${props.from.name}</h4>
        <h4>To: ${props.to.name}</h4>
        <p>${props.body}</p>
    </div>`
)
function renderKudos(kudos) {
    if (!kudos[0]) return DOM.kudoList.innerHTML = '<div style=padding:10px>No kudos have been given :(</div>';
    kudos.forEach(props => {
        DOM.kudoList.innerHTML += Kudo(props);
    })
}
function renderUserSelects(users) {
    let user;
    users.forEach(({ _id, name }) => {
        user = `<option value="${_id}">${name}</option>`;
        DOM.kudoFrom.innerHTML += user;
        DOM.kudoTo.innerHTML +=  user;
    });
}

getKudos(renderKudos);
getUsers(renderUserSelects);

document.querySelector('.kudo-submit').addEventListener('click', e => {
    e.preventDefault();
    const kudo = getKudoInput();
    if (kudo) {
        postKudo(kudo, data => {
            if (!data.errors) getKudos(kudos => {
                clear();
                renderKudos(kudos);
            })
            else {
                console.log(data);
            }
        });
    }
});
