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
    console.log(video)
    //const video1 = `<bwp-video src="blob:https://www.bilibili.com/05f0aeec-aaef-4eac-a744-f19312811361" touchworldtime="1673193120508" touchy="387.5" touchx="603"></bwp-video>`
    video.addEventListener("touchstart", e => {
        // console.log("touched")
        // console.log(window.player.getVolume())
        // console.log(video)
        // console.log(video.currentTime)
        // console.log(video1.currentTime)
        // console.log(document.querySelector("#bilibili-player > div > div > div.bpx-player-primary-area > div.bpx-player-video-area > div.bpx-player-video-perch > div > bwp-video").currentTime)
        // console.log(video._data)
        // console.log(video.duration)
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
        console.log("enter move")
        if(e.targetTouches.length == 1)
        e.preventDefault()
        e.stopPropagation()
        ;[...e.changedTouches].forEach(touch=>{
            video.setAttribute("moveX", touch.clientX)
            if (document.querySelector('bwp-video') == null)
            { 
                video.currentTime += (parseFloat(video.getAttribute("moveX")) - parseFloat(video.getAttribute("touchX")))
            }
            else
            {
                if(video.getAttribute("moveX") - video.getAttribute("touchX") > 15)
                {
                    // console.log(videoHolder.getAttribute("touchX"))
                    // console.log(videoHolder.getAttribute("moveX"))
                    window.dispatchEvent(keyRightDown);
                    window.dispatchEvent(keyRightUp);
                }
                if(video.getAttribute("moveX") - video.getAttribute("touchX") < -15)
                {
                    window.dispatchEvent(keyLeftDown);
                    window.dispatchEvent(keyLeftUp);
                }     
                }
            
            video.setAttribute("touchX", video.getAttribute("moveX"));
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
