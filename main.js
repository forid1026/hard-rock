const searchBtn = document.getElementById('searchBtn');
const inputMusic = document.getElementById("inputField");


inputMusic.addEventListener('keypress', function(){
    if(event.keyCode === 13){
        searchMusic();
    }
})

searchBtn.addEventListener('click', function(){
    searchMusic();
});

function searchMusic(){
    document.getElementById('allResult').innerHTML = "";
        document.getElementById('lyrics').innerHTML = "";
     const keyword = inputMusic.value;    
     fetch(`https://api.lyrics.ovh/suggest/${keyword}`)
    .then(res => res.json())
    .then(data=>{
        storedData = data;
        console.log(data);
        for (let i = 0; i < data.data.length; i++) {
            const title = data.data[i].title;
            const albumName = data.data[i].album.title;
            const artistName = data.data[i].artist.name;
            const id = data.data[i].id;
            console.log(title);
            document.getElementById('allResult').innerHTML += `<div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-6">
                <h3 class="lyrics-name">${title}</h3>
                <p class="author lead">Album by <span>${albumName}</span></p>
                <p class="author lead">Artist by <a href=""> ${artistName}</a></p>
            </div>
            <div class="col-md-6 text-md-right text-center">
                <a href="#lyrics-or-details"><button onClick="getLyrics(${id})" class="btn btn-success">Get Lyrics</button></a>
            </div>
        </div>`
            

            if(i == 9){
                break;
            }
        }
    })
}

function getLyrics(id){
    for (let i = 0; i < 10; i++) {
        if(storedData.data[i].id == id){
            const artistName = storedData.data[i].artist.name;
            const songTitle = storedData.data[i].title;
            fetch(`https://api.lyrics.ovh/v1/${artistName}/${songTitle}`)
            .then(res => res.json())
            .then(data => {
                let lyrics = data.lyrics;
                if(lyrics == undefined){
                    lyrics = `Song Lyrics Not Found. Try for another song`;
                }
                document.getElementById('lyrics').innerHTML = `<div class="single-lyrics text-center">
                                                                            <button class="btn go-back">&lsaquo;</button>
                                                                            <h2 class="text-success mb-4">Song Lyrics</h2>
                                                                            <h5>${lyrics}</h5>
                                                                        </div>`
            })
            
            
        }
    }
    
}
