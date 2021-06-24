
window.addEventListener('load', function () {
  let topTracksUrl = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/tracks';
  let topArtistUrl = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/artists';
  let topAlbumnUrl = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/albums';


  function RealizarPeticion(url, mensajeError, callback) {
    fetch(url)
      .then(res => res.json())
      .then(res => callback(res))
      .catch(error => console.log('error', mensajeError))

  }

  function loadApis() {

    RealizarPeticion(topTracksUrl, 'TopTracks', createTopTracks);
    RealizarPeticion(topArtistUrl, 'TopArtist', createTopArtists);
    RealizarPeticion(topAlbumnUrl, 'TopAlbums', createTopAlbums);

  }

  function createTopTracks(track) {

    track.data.map(item => {
      const article = document.createElement('article');
      article.className = 'card';
      article.innerHTML = `
        <div class="avatar" style="background-image: url(${item.album.cover_small}"></div>
        <div class="informacion">
          <h1>${item.title}</h1>
          <h2 id=infoalbum>
          ${item.artist.name}</h2>
          <h3 id=infosingle>
            Album:${item.album.title} <h3>
              <form method="get" action="./detail-track.html">
              <button class="btn" type="submit">Play</button>
        </div>
        `;

      document.getElementById('topTracks').appendChild(article);


    })

  }


  function createTopArtists(data) {

    for (let i = 0; i < data.data.length; i++) {
      let id = data.data[i].id
      //let title = data.data[i].picture;
      let image = data.data[i].picture_small;
      let artistName = data.data[i].name;
      let position = data.data[i].position;
      //console.log("title" + title + "cover" + cover + "artistName"+ artistName+ "album" + album);
      //${icon}
      const article = document.createElement('article');
      article.className = 'card';
      article.innerHTML = `
        <div class="avatar" style="background-image: url(${image})"></div>
        
        <div class="informacion">
          <h1>${artistName}</h1>
          <h2 id=infoalbum>
            Posición ${position}
           </h2>
           <button name='artista' value='./detail-artist.html?id=${id}' class="btn">Ver más</a>
           <button  value='${id}' class="btn favoritos"><i class="fas fa-heart"></a>
        </div>
        `;
      document.getElementById('topArtists').appendChild(article);
      
    }

    let botones=document.querySelectorAll('.favoritos')
    for (let i = 0; i < botones.length; i++){
      botones[i].addEventListener('click', AgregarFavoritos)
    }


  }


  function createTopAlbums(data) {
    for (let i = 0; i < data.data.length; i++) {

      //let title = data.data[i].picture;
      let image = data.data[i].cover_small;
      let album = data.data[i].title;
      let artist = data.data[i].artist.name;
      let position = data.data[i].position;
      //console.log("title" + title + "cover" + cover + "artistName"+ artistName+ "album" + album);
      //${icon}
      const article = document.createElement('article');
      article.className = 'card';
      article.innerHTML = `<div class="avatar" style="background-image: url(${image})"></div>
        <div class="informacion">
          <h1>${album}</h1>
          <h2 id=infoalbum>
            ${artist}</h2>
          <h3 id=infosingle>
             Posición ${position} </h3>
          <form method="get" action="detail-album.html">
            <button class="btn" type="submit">Ver más</button>
          </form>
        </div>`;
      document.getElementById('topAlbums').appendChild(article);

    }
    /* <article class="card">
    <div class="avatar" style="background-image: url(${image})"></div>
    <div class="informacion">
      <h1>${album}</h1>
      <h2 id=infoalbum>
        {artist} </h2>
      <h3 id=infosingle>
        Año:2020 </h3>
      <form method="get" action="detail-album.html">
        <button class="btn" type="submit">Ver más</button>
      </form>
    </div>
    
    </article> */

  }


  function AgregarFavoritos(id) {
     let ids= localStorage.getItem('favoritos')
     if(!ids) {
        localStorage.setItem('favoritos',id.target.value)
     }else{
       ids+=','+id.target.value
       localStorage.setItem('favoritos',ids)
     }
  }

  loadApis();



  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn') && !e.target.classList.contains('favoritos')){
      location.href = e.target.value
    }


  })



})