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
    if ('caches' in window) {
        caches.match(`${baseUrl}`).then((response) => {
            if (response) {
                response.json().then((data) => {
                    data.teams.forEach((team) => {
                        content += cardItem(team);
                    });
                    document.querySelector('#body-content').innerHTML = content;
                });
            }
        });
    }

    fetch(`${baseUrl}`, {
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
                document.querySelector('#body-content').appendChild(content);
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
            caches.match('oneTeamh.json').then((response) => {
                if (response) {
                    response.json().then((data) => {
                        content = cardDetailsTeam(data);
                        document.querySelector('#detail-content').innerHTML = content;
                        resolve(data);
                    });
                }
            });
        }
        fetch(`${baseUrl}`, {
                headers: {
                    'X-Auth-Token': '4d8cdc4b83c94ba19969ac6990d91775',
                },
            })
            .then(status)
            .then(json)
            .then((data) => {
                data.teams.forEach((team) => {
                    if (team.id == idParam) {
                        console.log(team);
                        content.team = team;
                        detail.append(content);
                        resolve(team);
                    }
                });
            })
            .catch((err) => console.log(err));
    });
}

function getSavedTeams() {
    getAll().then((teams) => {
        let content = '';
        teams.forEach((team) => {
            content += cardItem(team, true);
        });
        const saved = document.querySelector('#body-content');
        saved.innerHTML = content;
    });
}

function getSavedTeamById() {
    return new Promise((resolve, reject) => {
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = parseInt(urlParams.get('id'));
        console.log(idParam);
        const detail = document.querySelector('#detail-content');

        let content = document.createElement('card-detail');
        getById(idParam).then((team) => {
            console.log(team);
            content.team = team;
            detail.appendChild(content)
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

// eslint-disable-next-line import/prefer-default-export
// export {getTeamById, getTeam, getSavedTeamById};