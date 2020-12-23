let audio = document.getElementById('audio');
let context;
let analyser;
let src;
let array;
let logog = document.getElementById('logo').style;


window.onclick = function(){
    if(!context){
      preparation();  
    }
    if(audio.paused){
        audio.play();
        loop();
    } else {
        audio.pause();
    }
}

function preparation(){
    context = new AudioContext();
    analyser = context.createAnalyser();
    src = context.createMediaElementSource(audio);
    src.connect(analyser);
    analyser.connect(context.destination);
    loop();
}

function loop(){
    if(!audio.paused){
        window.requestAnimationFrame(loop);
    }
    array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);

    logog.minHeight = (array[40]) + "px";
    logog.width = (array[40]) + "px";
}