   document.addEventListener('DOMContentLoaded', function() {
       const urlParams = new URLSearchParams(window.location.search);
       const isFormSaved = urlParams.get('saved');
       const id = parseInt(urlParams.get('id'));
       let saved = document.querySelector('#save');
       let deleted = document.querySelector('#delete');
       if (isFormSaved) {
           saved.style.display = 'none';
           let item = getSavedTeamById()
           deleted.onclick = function() {
               console.log('tombol delete di klik')
               item.then(() => {
                   deleteById(id)
               })
           }
       } else {
           deleted.style.display = 'none';
           const item = getTeamById()
           if (saved) {
               saved.onclick = function() {
                   console.log('tombol fad di clik')
                   item.then(function(team) {
                       saveForLater(team)
                   })
               }
           }
       }
   })