const baseUrl = "http://api.football-data.org/v2/teams"
const tempUrl = "/data/";


function status (response) {
    if (response.status !== 200) {
        console.log('Error : ' + response.status);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
        return Promise.resolve(response);
    }
}

function json (response) {
    // Mengembalikan sebuah Promise berupa objek/array JavaScript
    // yang diubah dari teks JSON. 
    return response.json();
}
function error (error) {
    // Parameter error berasal dari Promise.reject() 
    console.log('Error : ' + error);
}

fetch(`${tempUrl}team.json`,{
    method: "GET",
    withCredentials: true,
    'headers':{
        'Content-Type': 'application/json',
        'X-Auth-Token': '4d8cdc4b83c94ba19969ac6990d91775',
        "Content-Type": "application/x-www-form-urlencoded"
    }
})
    .then(status)
    .then(json)
    .then(function(data) {
        // Objek/array JavaScript dari response.json() masuk lewat data.
        console.log(data);
    }).catch(error);
