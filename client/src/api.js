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
export {
    ajaxJSON,
    getUsers,
    getKudos,
    postKudo
};