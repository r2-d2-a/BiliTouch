var keyRightDown = new KeyboardEvent('keydown', {
    key: "ArrowRight",
    keyCode: "39"
});

var keyRightUp = new KeyboardEvent('keyup', {
    key: "ArrowRight",
    keyCode: "39"
});

var keyLeftDown = new KeyboardEvent('keydown', {
    key: "ArrowLeft",
    keyCode: "37"
});

var keyLeftUp = new KeyboardEvent('keyup', {
    key: "ArrowLeft",
    keyCode: "37"
});

function progressShadow(){
    var shadowProgress = document.querySelector("#bilibili-player > div > div > div.bpx-player-primary-area > div.bpx-player-video-area > div.bpx-player-control-wrap > div.bpx-player-control-entity")
    shadowProgress.setAttribute('data-shadow-show', 'true')
    var dataControl = document.querySelector("#bilibili-player > div > div")
    dataControl.setAttribute('data-ctrl-hidden', "true")
}

function addGlobalEventListener(type, seletor, callback){
    document.addEventListener(type, e => {
        if(e.target.matches(seletor))callback (e)
    })
}

addGlobalEventListener("touchstart", "bwp-video", e=>{
        video = document.querySelector('bwp-video')
})

window.addEventListener('load', () => {    
    var video = document.querySelector('bwp-video')
    if (video == null)
    {
        video = document.querySelector('video')
    }
    //console.log(video)
    video.addEventListener("touchstart", e => {
        if(e.changedTouches.length == 1){
            //e.preventDefault()
            ;[...e.changedTouches].forEach(touch=>{
            video.setAttribute("touchWorldTime", new Date().getTime())
            video.setAttribute("touchY", touch.clientY)
            video.setAttribute("touchX", touch.clientX)
            return false
            })
         
        }
       
    },false)
    
    
    video.addEventListener("touchmove", e => {
        if(e.targetTouches.length == 1)
        e.preventDefault()
        e.stopPropagation()
        ;[...e.changedTouches].forEach(touch=>{
            video.setAttribute("moveX", touch.clientX)
            if (document.querySelector('bwp-video') == null)
            { 
                video.currentTime += 0.1*(video.getAttribute("moveX") - video.getAttribute("touchX"))
                video.setAttribute("touchX", video.getAttribute("moveX"));
            }
            else
            {
                if(video.getAttribute("moveX") - video.getAttribute("touchX") > 50)
                {
                    window.dispatchEvent(keyRightDown);
                    window.dispatchEvent(keyRightUp);
                    video.setAttribute("touchX", video.getAttribute("moveX"));
                }
                if(video.getAttribute("moveX") - video.getAttribute("touchX") < -50)
                {
                    window.dispatchEvent(keyLeftDown);
                    window.dispatchEvent(keyLeftUp);
                    video.setAttribute("touchX", video.getAttribute("moveX"));
                }     
            }
            var shadowProgress = document.querySelector("#bilibili-player > div > div > div.bpx-player-primary-area > div.bpx-player-video-area > div.bpx-player-control-wrap > div.bpx-player-control-entity")
            shadowProgress.setAttribute('data-shadow-show', 'false')
            var dataControl = document.querySelector("#bilibili-player > div > div")
            dataControl.setAttribute('data-ctrl-hidden', "false")
            
        })  
    },false)
    video.addEventListener("touchend", e => {
        if(e.targetTouches.length == 1)
        ;[...e.changedTouches].forEach(touch=>{
            setTimeout('progressShadow()', 3000)
            
        })
    })
    
})
