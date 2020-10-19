var baseUrl = './data/team.json';
var apiUrl = 'http://api.football-data.org/v2/teams';
var apiOption = {
    method: 'GET',
    mode: 'no-cors',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': '4d8cdc4b83c94ba19969ac6990d91775',
        // 'Access-Control-Allow-Headers': '*'
    }
}


function cardItem(team) {
    console.log(team)
    return `
  <div class="col l3 m4 s12">
   <div class="card">
    <a href="./detail.html?id=${team.id}">
      <div class="card-image waves-effect waves-block waves-light">
        <img src="../team.svg" alt="team.svg"/>
      </div>
    </a>
    <div class="card-content">
      <span class="card-title truncate">${team.name}</span>
    </div>
  </div>
  </div>
  `;
}

function cardSavedtem(team) {
    return `
  <div class="col l3 m4 s12">
   <div class="card">
    <a href="./detail.html?id=${team.id}&saved=true">
      <div class="card-image waves-effect waves-block waves-light">
        <img src="../team.svg" alt="team.svg"/>
      </div>
    </a>
    <div class="card-content">
      <span class="card-title truncate">${team.name}</span>
    </div>
  </div>
  </div>
  `;
}

function cardDetailsTeam(team) {
    return `
        <li class=""><a href="./detail.html">${team.name}</a></li>
  `
}

function cardDetailSavedTeam(team) {
    return `
        <li class=""><a href="./detail.html">apa aja</a></li>
  `
}

function status(response) {
    if (response.status !== 200) {
        // Method reject() akan membuat blok catch terpanggil
        console.log('gagal parsing api')
    }
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
}

function json(response) {
    return response.json();
}

function error(err) {
    console.log(`Error : ${err}`);
}

function hideSaveButton(id) {
    let arryId = [];
    let btnSaved = document.querySelector('#save');
    getAll().then((teams) => {
        teams.forEach((team) => {
            arryId.push(team.id)
        });
        if (arryId.includes(parseInt(id))) {
            btnSaved.style.display = 'none';
        }
    });
}

function getTeam() {
    if ('caches' in window) {
        caches.match(`${baseUrl}team.json`).then((response) => {
            if (response) {
                response.json().then((data) => {
                    let content = '';
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
                'X-Auth-Token': '4d8cdc4b83c94ba19969ac6990d91775'
            }
        })
        .then(status)
        .then(json)
        .then((data) => {
            let content = '';
            data.teams.forEach((team) => {
                content += cardItem(team);
            });
            document.querySelector('#body-content').innerHTML = content;
        })
        .catch(error);
}

function getTeamById() {
    return new Promise((resolve, reject) => {
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get('id');
        console.log(idParam);
        let content = '';
        if ('caches' in window) {
            caches.match('oneTeam.json').then((response) => {
                if (response) {
                    response.json().then((data) => {
                        content = cardDetailsTeam(data);
                        document.querySelector('#detail-content').innerHTML = content;
                        resolve(data);
                    });
                }
            });
        }
        fetch(`${apiUrl}/${idParam}`, {
                headers: {
                    'X-Auth-Token': '4d8cdc4b83c94ba19969ac6990d91775'
                }
            })
            .then((response) => {
                return response;
            })
            .then(json)
            .then((data) => {
                content = cardDetailsTeam(data);
                console.log(data)
                let detail = document.querySelector('#detail-content') || '';
                detail.innerHTML = content;
                resolve(data)
            })
            .then(hideSaveButton(idParam))
            .catch(err => console.log(err))
    });
}

function getSavedTeams() {
    getAll().then((teams) => {
        console.log(teams);
        let content = '';
        var arryId = [];
        teams.forEach((team) => {
            console.log(team.id);
            arryId.push(team.id)
            content += cardSavedtem(team);
        });
        console.log(arryId);
        if (arryId.includes(63)) {
            console.log('ada')
        }
        let saved = document.querySelector('#body-content');
        saved.innerHTML = content;
    });
}

function getSavedTeamById() {
    return new Promise((resolve, reject) => {
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = parseInt(urlParams.get('id'));
        console.log(idParam)
        let content = 'hallo';
        getById(idParam).then((team) => {
            console.log(team)
            content = cardDetailsTeam(team);
            console.log(content)
            let detail = document.querySelector('#detail-content');
            detail.innerHTML = content;
            resolve(team)
        })
    })
}

function contoh() {
    document.querySelector('#apa').innerHTML = 'selamat'
}