console.log("Welcome To Spotify");
let songs=[
    {songName:"Warriyo-Mortals",filePath:"./songs/1.mp3",coverPath:"./covers/1.jpg"},
    {songName:"Cielo-Huma-Huma",filePath:"./songs/2.mp3",coverPath:"./covers/2.jpg"},
    {songName:"DEAF KEV-Invincible",filePath:"./songs/3.mp3",coverPath:"./covers/3.jpg"},
    {songName:"Different Heaven & EHIDE",filePath:"./songs/4.mp3",coverPath:"./covers/4.jpg"},
    {songName:"Janji-Heros Tonight",filePath:"./songs/5.mp3",coverPath:"./covers/5.jpg"},
    {songName:"Ghar",filePath:"./songs/6.mp3",coverPath:"./covers/6.jpg"},
    {songName:"Janji-Heroes",filePath:"./songs/7.mp3",coverPath:"./covers/7.jpg"},
    {songName:"Non-Copyright",filePath:"./songs/8.mp3",coverPath:"./covers/8.jpg"},
    {songName:"Bela-Ciao",filePath:"./songs/9.mp3",coverPath:"./covers/9.jpg"},
    {songName:"295-Sidhu-Moosewaala",filePath:"./songs/10.mp3",coverPath:"./covers/10.jpg"}
]

let songIndex=0;
let audioElement= new Audio('./songs/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar')
let gif=document.getElementById('gif')
let songItems= Array.from(document.getElementsByClassName('songItem'))
let songNamex=document.getElementById('masterSongName')

songItems.forEach((element,i) => {
    element.getElementsByTagName('img')[0].src=songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerHTML=songs[i].songName
    let audioElement=new Audio('./songs/1.mp3');
    // element.getElementsByClassName('timestamp')[0].innerHTML=audioElement.duration
});

// audioElement.play();

//Handle play/pause/click

masterPlay.addEventListener('click',()=>{
    if(audioElement.paused||audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})

//listen to events

audioElement.addEventListener('timeupdate',()=>{
    //update seek bar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value=progress;
});

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=(myProgressBar.value*audioElement.duration)/100;
})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-play-circle')
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach( (element)=>{
   element.addEventListener('click',(e)=>{
       makeAllPlays();
       songIndex=parseInt(e.target.id)
       songNamex.innerText=songs[songIndex-1].songName
       e.target.classList.remove('fa-play-circle');
       e.target.classList.add('fa-pause-circle');
       audioElement.src=`songs/${songIndex}.mp3`
       audioElement.currentTime=0;
       masterPlay.classList.remove('fa-play-circle')
       masterPlay.classList.add('fa-pause-circle')
       gif.style.opacity=1;
       audioElement.play();
   }) 
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>9){
        songIndex=1;
    }else{
        songIndex+=1;
    }
    songNamex.innerText=songs[songIndex-1].songName
    audioElement.src=`songs/${songIndex}.mp3`
    audioElement.currentTime=0;
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
    gif.style.opacity=1;
    audioElement.play();
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<0){
        songIndex=10;
    }else{
        songIndex-=1;
    }
    songNamex.innerText=songs[songIndex-1].songName
    audioElement.src=`songs/${songIndex}.mp3`
    audioElement.currentTime=0;
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
    gif.style.opacity=1;
    audioElement.play();
})

document.getElementById('mute').addEventListener('click',()=>{
    audioElement.volume=0;
})
document.getElementById('unmute').addEventListener('click',()=>{
    audioElement.volume=1;
})