window.addEventListener('load', function () {
  let urlArtist = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/`


  function leerQueryString() {
    //obtiene la queryString Completa
    const querystring = window.location.search
    //convierte la query string en objeto
    const params = new URLSearchParams(querystring)
    let id = params.get('id')
    return id
  }

  async function BuscarArtista() {

    fetch(`${urlArtist}${leerQueryString()}`)
      .then(respuesta => respuesta.json())
      .then(res => {
        let imagenArtista = document.querySelector('.card-Artist img')
        imagenArtista.src = res.picture_xl
        let detallesArtista = document.querySelector('.Subtitle-detail b')
        detallesArtista.innerHTML = res.name
        fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${res.id}/albums?limit=5`)
          .then(respalbums => respalbums.json())
          .then(albums => {
            CreaPlayList(albums.data)
          })
      })
      .catch(err => console.log(err))
  }

  function CreaPlayList(albums) {
    for (const album in albums) {
      console.log(albums[album]);
      let article = document.createElement('article');
      article.classList.add('card')
      let infoCard = document.createElement('div')
      infoCard.classList.add('informacion')
      infoCard.classList.add('details')
      let title = document.createElement('h1')
      title.innerText = albums[album].title
      let img = document.createElement('img')
      img.src = albums[album].cover_big
      infoCard.appendChild(title)
      infoCard.appendChild(img)
      article.appendChild(infoCard)
      document.querySelector('#topTracks').appendChild(article)
    }


  }

  BuscarArtista()
})