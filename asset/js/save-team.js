import {
    getTeamById,
    getSavedTeamById
} from './api.js'

// import { getTeamById, getSavedTeamById} from './api.js';
window.addEventListener('DOMContentLoaded', () => {

    const urlParams = new URLSearchParams(window.location.search);
    const isFormSaved = urlParams.get('saved');
    // eslint-disable-next-line radix
    const id = parseInt(urlParams.get('id'));
    const saved = document.querySelector('#save');
    const deleted = document.querySelector('#delete');
    if (isFormSaved) {
        // saved.style.display = 'none';
        const item = getSavedTeamById();
        // deleted.onclick = function() {
        //     console.log('tombol delete di klik');
        //     item.then(() => {
        //         deleteById(id);
        //     });
        // };
    } else {
        // deleted.style.display = 'none';
        getTeamById();
        // if (saved) {
        //     saved.onclick = function() {
        //         console.log('tombol fad di clik');
        //         item.then((team) => {
        //             saveForLater(team);
        //         });
        //     };
        // }
    }

});