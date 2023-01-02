//const videoHolder = document.getElementById("playerWrap")
const videoHolder = document.getElementById("bilibili-player")
//const video = document.querySelector('bwp-video')
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

var spaceDown = new KeyboardEvent('keydown', {
    key:"Space",
    keyCode: "32"
});

var spaceUp = new KeyboardEvent('keyup', {
    key:"Space",
    keyCode: "32"
});

videoHolder.addEventListener("touchstart", e => {
    console.log("touched")
    if(e.changedTouches.length == 1){
        //e.preventDefault()
        ;[...e.changedTouches].forEach(touch=>{
        if(videoHolder.getAttribute("touchWorldTime") != null && 
            videoHolder.getAttribute("touchX") != null &&
            videoHolder.getAttribute("touchY") != null)
        {
            if(new Date().getTime() - videoHolder.getAttribute("touchWorldTime") < 800 && 
                touch.clientX - videoHolder.getAttribute("touchX") < 20 &&
                touch.clientY - videoHolder.getAttribute("touchY") < 20 )
            {
                e.preventDefault();
                e.stopPropagation();
                
            }
        }
        videoHolder.setAttribute("touchWorldTime", new Date().getTime())
        videoHolder.setAttribute("touchY", touch.clientY)
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
        if(videoHolder.getAttribute("moveX") - videoHolder.getAttribute("touchX") > 50)
        {
            console.log(videoHolder.getAttribute("touchX"))
            console.log(videoHolder.getAttribute("moveX"))
            window.dispatchEvent(keyRightDown);
            window.dispatchEvent(keyRightUp);
            videoHolder.setAttribute("touchX", videoHolder.getAttribute("moveX"));
            shadowProgress.setAttribute('data-shadow-show', 'false')
        }
        if(videoHolder.getAttribute("moveX") - videoHolder.getAttribute("touchX") < -50)
        {
            window.dispatchEvent(keyLeftDown);
            window.dispatchEvent(keyLeftUp);
            videoHolder.setAttribute("touchX", videoHolder.getAttribute("moveX"));
            shadowProgress.setAttribute('data-shadow-show', 'false')
        }  
    })  
})

//会让下方的按键（开始、暂停、全屏）无效化，这些按键应该是只有点击的接口，没有触摸的接口
// videoHolder.addEventListener('touchend', e => {
//     e.preventDefault();
// },true);
