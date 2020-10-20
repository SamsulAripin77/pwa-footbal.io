// let baseUrl = './data/team.json';
const apiUrl = 'http://api.football-data.org/v2/teams';

const cardColor = [
  { color: 'red darken-1', bg: 'bg1' },
  { color: 'brown darken-1', bg: 'bg2' },
  { color: 'deep-purple darken-1', bg: 'bg3'},
  { color: 'purple accent-3', bg: 'bg4' },
  { color: 'blue darken-2', bg: 'bg5' },
  { color: 'cyan lighten-1', bg: 'bg6' },
  { color: 'light-blue darken-1', bg: 'bg7' },
  { color: 'yellow darken-3', bg: 'bg8' },
  { color: 'amber darken-1', bg: 'bg9' },
  { color: 'orange darken-1', bg: 'bg10' },
  { color: 'light-green accent-3', bg: 'bg11' },
];

function cardItem(team) {
  const getRandom = Math.floor(Math.random() * cardColor.length);
  return ` 
    <div class="col l4 m4 s12">
        <div class="card">
            <a href="./detail.html?id=${team.id}" class="card-bg card-content white-text" style="background-image: url('./asset/img/${cardColor[getRandom].bg}.jpg');">
                <div class=" center relative">
                        <img width="60" class="absolute circle white img-circle" src="team.svg" alt="gambar team">
                </div>
            </a>
            <div class="card-action center-align white-text ${cardColor[getRandom].color}">
                <h6><strong>${team.shortName}</strong></h6>
            </div>
        </div>
    </div>
    <style>
        .card-bg{
            
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            display: block;
            height: 7.5em;
        }
        .img-circle{
            padding: 7px!important
        }
        .absolute{
            position: absolute;
            right: 3em;
            top: 2.2em;
            z-index: 3;
            top: 120%;
            left: 50%;
            -ms-transform: translate(-50%, -10%);
            transform: translate(-50%, -10%);
        }
        .relative{
            position: relative;
            height: 3em;
        }
    </style>
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
        <div class="card indigo darkern-3">
            <div class="card-content white-text">
                <div class="row">
                    <div class="col s12 m6 l4 center">
                        <img src="./team.svg">
                    </div>
                    <div class="col s12 m6 l8">
                         <h4>${team.name}</h4>
                         <div class="row">
                             <div class="col s2">Founded</div>
                             <div class="col s10">${team.founded}</div>
                             <div class="col s2">Email</div>
                             <div class="col s10">${team.email}</div>
                             <div class="col s2">Venue</div>
                             <div class="col s10">${team.venue}</div>
                             <div class="col s2">Address</div>
                             <div class="col s10">${team.address}</div>
                             <div class="col s2">Phone</div>
                             <div class="col s10">${team.phone}</div>
                             <div class="col s2">Website</div>
                             <div class="col s10">${team.website}</div>
                         </div>
                    </div>
                </div>
            </div>
            <div class="card-action right-align btn-delete">
                 <a id="delete" href="#">Delete</a>
            </div>
        </div>

  `;
}

function cardDetailSavedTeam(team) {
  return `
        <li class=""><a href="./detail.html">apa aja</a></li>
  `;
}

function status(response) {
  if (response.status !== 200) {
    // Method reject() akan membuat blok catch terpanggil
    console.log('gagal parsing api');
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
  const arryId = [];
  const btnSaved = document.querySelector('#save');
  getAll().then((teams) => {
    teams.forEach((team) => {
      arryId.push(team.id);
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

  fetch('./data/team.json', {
    headers: {
      'X-Auth-Token': '4d8cdc4b83c94ba19969ac6990d91775',
    },
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
        'X-Auth-Token': '4d8cdc4b83c94ba19969ac6990d91775',
      },
    })
      .then((response) => response)
      .then(json)
      .then((data) => {
        content = cardDetailsTeam(data);
        console.log(data);
        const detail = document.querySelector('#detail-content') || '';
        detail.innerHTML = content;
        resolve(data);
      })
      .then(hideSaveButton(idParam))
      .catch((err) => console.log(err));
  });
}

function getSavedTeams() {
  getAll().then((teams) => {
    let content = '';
    teams.forEach((team) => {
      content += cardItem(team);
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
    let content = 'hallo';
    getById(idParam).then((team) => {
      console.log(team);
      content = cardDetailsTeam(team);
      const detail = document.querySelector('#detail-content');
      detail.innerHTML = content;
      resolve(team);
    });
  });
}

function contoh() {
  document.querySelector('#apa').innerHTML = 'selamat';
}
