const searchBtn = document.getElementById('searchBtn');
const inputSong = document.getElementById("inputField");


inputSong.addEventListener('keypress', function(){
    if(event.keyCode === 13){
        searchMusic();
    }
})

searchBtn.addEventListener('click', function(){
    searchMusic();
});

function searchMusic(){
    document.getElementById('info').innerHTML = "";
    document.getElementById('lyrics').innerHTML = "";
     const keyword = inputSong.value;    
     fetch(`https://api.lyrics.ovh/suggest/${keyword}`)
    .then(response => response.json())
    .then(data=>{
        getdata = data;
        console.log(data);
        for (let i = 0; i < data.data.length; i++) {
            const title = data.data[i].title;
            const albumName = data.data[i].album.title;
            const artistName = data.data[i].artist.name;
            const id = data.data[i].id;
            document.getElementById('info').innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                                                            <div class="col-md-6">
                                                                <h3 class="lyrics-name">${title}</h3>
                                                                <p class="author lead">Album by <span>${albumName}</span></p>
                                                                <p class="author lead">Artist by <a href=""> ${artistName}</a></p>
                                                                <a href="#"><button onClick="preview(${id})" class="btn btn-success">Preview</button></a>
                                                            </div>
                                                            <div class="col-md-6 text-md-right text-center">
                                                                <a href="#"><button onClick="getLyrics(${id})" class="btn btn-success">Get Lyrics</button></a>
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
        if(getdata.data[i].id === id){
            const artistName = getdata.data[i].artist.name;
            const songTitle = getdata.data[i].title;
            fetch(`https://api.lyrics.ovh/v1/${artistName}/${songTitle}`)
            .then(response => response.json())
            .then(data => {
                let lyrics = data.lyrics;
                if(lyrics === undefined){
                    lyrics = `Sorry we cann't found this song Lyrics. Please try another song`;
                }
                document.getElementById('lyrics').innerHTML = `<div class="single-lyrics text-center">
                                                                            <button class="btn go-back">&lsaquo;</button>
                                                                            <h2 class="text-success mb-4">Lyrics</h2>
                                                                            <h5 class="text-muted">${lyrics}</h5>
                                                                        </div>`
            })
            
            
        }
    }
    
}

 function preview(id){
    for(let i = 0; i < 10; i++){
        if(getdata.data[i].id === id){
            const artistName = getdata.data[i].artist.name;
            const songTitle = getdata.data[i].title;
            const coverPhoto = getdata.data[i].album.cover;
            const trackLink = getdata.data[i].link;
            const duration =  getdata.data[i].duration/60;
            const getDuration = duration.toFixed(2);
            const downloadPreview = getdata.data[i].preview;  
            document.getElementById('info').innerHTML += `<div class="preview text-center mt-5">
                                                                        <h3 class="text-success mb-4">Preview</h3>
                                                                        <img src="${coverPhoto}" alt="" class="mb-2">
                                                                        <h5>Song Title: ${songTitle}</h5>
                                                                        <h5>Artist Name: ${artistName}</h5>
                                                                        <h5><a target="_blank" href="${trackLink}">Click here to get track link</a></h5>
                                                                        <h5>Duration: ${getDuration}s</h5>
                                                                        <h5><a target="_blank" href="${downloadPreview}">Click here to download preview</a></h5>                                                                   </div>`
        }
    }
}
