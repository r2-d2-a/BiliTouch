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
            if(video.getAttribute("touchWorldTime") != null && 
                video.getAttribute("touchX") != null &&
                video.getAttribute("touchY") != null)
            {
                if(new Date().getTime() - video.getAttribute("touchWorldTime") < 800 && 
                    touch.clientX - video.getAttribute("touchX") < 20 &&
                    touch.clientY - video.getAttribute("touchY") < 20 )
                {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }
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
                video.currentTime += 0.2(parseFloat(video.getAttribute("moveX")) - parseFloat(video.getAttribute("touchX")))
                video.setAttribute("touchX", video.getAttribute("moveX"));
            }
            else
            {
                if(video.getAttribute("moveX") - video.getAttribute("touchX") > 25)
                {
                    window.dispatchEvent(keyRightDown);
                    window.dispatchEvent(keyRightUp);
                    video.setAttribute("touchX", video.getAttribute("moveX"));
                }
                if(video.getAttribute("moveX") - video.getAttribute("touchX") < -25)
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
    
    //阻止触摸被当作点击来处理
    // video.addEventListener('touchend', e => {
    //     e.preventDefault();
    // },);
})
