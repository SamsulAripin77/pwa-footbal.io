if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker.register('./service-worker.js')
            .then(() => {
                console.log('pendaftaran service worker berhasil')
            })
            .catch(function(error) {
                console.log(`pendaftaran service worker gagal => ${error}`)
            })
    })
}