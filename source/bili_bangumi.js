const videoHolder = document.getElementById("player_module")
//const videoHolder = document.getElementById("app")
const shadowProgress = document.querySelector("#bilibili-player > div > div > div.bpx-player-primary-area > div.bpx-player-video-area > div.bpx-player-control-wrap > div.bpx-player-control-entity")
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

videoHolder.addEventListener("touchstart", e => {
    if(e.changedTouches.length == 1){
        //e.preventDefault()
        ;[...e.changedTouches].forEach(touch=>{
        //双击全屏还是暂停/播放的区别
        //     if(videoHolder.getAttribute("touchWorldTime") != null && 
        //         videoHolder.getAttribute("touchX") != null&&
        //         videoHolder.getAttribute("touchY") != null)
        //     {
        //         if(new Date().getTime() - videoHolder.getAttribute("touchWorldTime") < 800 && 
        //             touch.clientX - videoHolder.getAttribute("touchX") < 20 &&
        //             touch.clientY - videoHolder.getAttribute("touchY") < 20 )
        //         {
        //             e.preventDefault();
        //             e.stopPropagation();
        //         }
        //     }    
        
        // videoHolder.setAttribute("touchWorldTime", new Date().getTime())
        // videoHolder.setAttribute("touchY", touch.clientY)
        videoHolder.setAttribute("touchX", touch.clientX)
        return false
        })
    }

},true)

videoHolder.addEventListener("touchmove", e => {
    if(e.targetTouches.length == 1)
    e.preventDefault()
    e.stopPropagation()
    ;[...e.changedTouches].forEach(touch=>{
        videoHolder.setAttribute("moveX", touch.clientX)
        if(videoHolder.getAttribute("moveX") - videoHolder.getAttribute("touchX") > 5)
        {
            window.dispatchEvent(keyRightDown);
            window.dispatchEvent(keyRightUp);
            videoHolder.setAttribute("touchX", videoHolder.getAttribute("moveX"))
            shadowProgress.setAttribute('data-shadow-show', 'false')
        }
        if(videoHolder.getAttribute("moveX") - videoHolder.getAttribute("touchX") < -5)
        {
            window.dispatchEvent(keyLeftDown);
            window.dispatchEvent(keyLeftUp);
            videoHolder.setAttribute("touchX", videoHolder.getAttribute("moveX"))
            shadowProgress.setAttribute('data-shadow-show', 'false')
        }  
    })  
})