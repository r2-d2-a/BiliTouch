var video = null
function addGlobalEventListener(type, seletor, callback){
    document.addEventListener(type, e => {
        if(e.target.matches(seletor))callback (e)
    })
}

addGlobalEventListener("touchstart", "video", e=>{
        video = document.querySelector('video')
        console.log(video)
})

window.addEventListener('touchstart', () => {
    if(video == null)
    {
        return;
    }
    video.addEventListener("touchstart", e => {
        if(e.changedTouches.length == 1){
            //e.preventDefault()
            ;[...e.changedTouches].forEach(touch=>{
            //双击全屏还是暂停/播放的区别
            //这个要写到touchcancel那里
            // if(video.getAttribute("touchWorldTime") != null && 
            // video.getAttribute("touchX") != null &&
            // video.getAttribute("touchY") != null)
            // {
            //     if(new Date().getTime() - video.getAttribute("touchWorldTime") < 200 && 
            //         touch.clientX - video.getAttribute("touchX") < 20 &&
            //         touch.clientY - video.getAttribute("touchY") < 20 )
            //     {
            //         console.log("double click cancel")
            //         e.stopImmediatePropagation();                   
            //         e.preventDefault();
            //         e.stopPropagation();    
            //     }
            // }
            video.setAttribute("touchWorldTime", new Date().getTime())
            video.setAttribute("touchY", touch.clientY)
            video.setAttribute("touchX", touch.clientX)
            })
        }
    },true)

    video.addEventListener("touchmove", e => {
        if(e.targetTouches.length == 1)
        // e.preventDefault()
        // e.stopPropagation()
        ;[...e.changedTouches].forEach(touch=>{
            video.setAttribute("moveX", touch.clientX)
            video.currentTime += 0.2*(video.getAttribute("moveX") - video.getAttribute("touchX"))
            video.setAttribute("touchX", touch.clientX)
            var shadowProgress = document.querySelector("#bilibili-player > div > div > div.bpx-player-primary-area > div.bpx-player-video-area > div.bpx-player-control-wrap > div.squirtle-controller.squirtle-pgc > div.squirtle-progress-wrap.squirtle-progress-common.ease")
            if(shadowProgress != null)
            {
                document.querySelector("#bilibili-player > div > div > div.bpx-player-primary-area > div.bpx-player-video-area > div.bpx-player-control-wrap > div.squirtle-controller.squirtle-pgc > div.squirtle-progress-wrap.squirtle-progress-common.ease").className = "squirtle-progress-wrap squirtle-progress-common"
                document.querySelector("#bilibili-player > div > div > div.bpx-player-primary-area > div.bpx-player-video-area > div.bpx-player-control-wrap > div.squirtle-controller.squirtle-pgc > div.squirtle-progress-wrap.squirtle-progress-common").setAttribute('style',"display: block;")
            }
            var shadowContent = document.querySelector("#bilibili-player > div > div > div.bpx-player-primary-area > div.bpx-player-video-area > div.bpx-player-control-wrap > div.squirtle-controller.squirtle-pgc > div.squirtle-controller-wrap")
            //shadowProgress.className = "squirtle-progress-wrap squirtle-progress-common"
            shadowContent.setAttribute('style', "display: flex;")
            
        })  
    },true)
})
