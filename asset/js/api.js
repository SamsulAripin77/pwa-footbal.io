import './components/card-detail.js'
import './components/card-item.js'

const baseUrl = './data/team.json';
const apiUrl = 'http://api.football-data.org/v2/teams';

function status(response) {
    if (response.status !== 200) {
        console.log('gagal parsing api');
    }
    return Promise.resolve(response);
}

function json(response) {

    return response.json();
}

function error(err) {
    console.log(`Error : ${err}`);
}


function getTeam() {
    let container = document.querySelector('.main-content')
    container.innerHTML = ''
    if ('caches' in window) {
        caches.match(`${apiUrl}`).then((response) => {
            if (response) {
                response.json().then((data) => {
                    data.teams.forEach((team) => {
                        let content = document.createElement('card-item');
                        content.team = team
                        container.appendChild(content)
                    });
                });
            }
        });
    }

    fetch(`${apiUrl}`, {
            headers: {
                'X-Auth-Token': '4d8cdc4b83c94ba19969ac6990d91775',
            },
        })
        .then(status)
        .then(json)
        .then((data) => {
            data.teams.forEach((team) => {
                let content = document.createElement('card-item');
                content.team = team
                container.appendChild(content)
            });
        })
        .catch(error);
}

function getTeamById() {
    return new Promise((resolve, reject) => {
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get('id');
        const detail = document.querySelector('#detail-content');
        let content = document.createElement('card-detail');
        if ('caches' in window) {
            caches.match(`${apiUrl}/${idParam}`).then((response) => {
                if (response) {
                    response.json().then((data) => {
                        data.teams.forEach((team) => {
                            if (team.id == idParam) {
                                console.log(team);
                                content.team = team;
                                detail.appendChild(content)
                                resolve(team);
                            }
                        });
                    });
                }
            });
        }
        fetch(`${apiUrl}`, {
                headers: {
                    'X-Auth-Token': '4d8cdc4b83c94ba19969ac6990d91775',
                },
            })
            .then(status)
            .then(json)
            .then((data) => {
                console.log(data)
                data.teams.forEach((team) => {
                    if (team.id == idParam) {
                        console.log(team);
                        content.team = team;
                        detail.appendChild(content)
                        resolve(team);
                    }
                });
            })
            .catch(error);
    });
}

function getSavedTeams() {
    let container = document.querySelector('.main-content')
    container.innerHTML = ''
    getAll().then((teams) => {
        let content = '';
        teams.forEach((team) => {
            let content = document.createElement('card-item');
            content.team = team
            container.appendChild(content)
        });
    });
}

function getSavedTeamById() {
    return new Promise((resolve, reject) => {
        let container = document.querySelector('#detail-content')
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = parseInt(urlParams.get('id'));
        console.log(idParam);
        let content = document.createElement('card-detail');
        getById(idParam).then((team) => {
            console.log(team);
            content.team = team;
            container.appendChild(content)
            resolve(team);
        });
    });
}

export {
    getTeam,
    getTeamById,
    getSavedTeams,
    getSavedTeamById
}