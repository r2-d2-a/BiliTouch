//console.log("loaded")
window.addEventListener('load', () => {
    const video = document.querySelector('video')
    console.log(video)
    video.addEventListener("touchstart", e => {
        console.log("enter touch")
        if(e.changedTouches.length == 1){
            //e.preventDefault()
            ;[...e.changedTouches].forEach(touch=>{
            // console.log(touch.pageX)
            // console.log(touch.clientX)
            // console.log(touch.pageY)
            // console.log(touch.clientY)
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
            
            video.setAttribute("touchWorldTime", new Date().getTime())
            video.setAttribute("touchVideoTime", video.currentTime)
            video.setAttribute("touchY", touch.clientY)
            video.setAttribute("touchX", touch.clientX)
            return false
            })
        }
    
    },true)
    
    video.addEventListener("touchmove", e => {
        console.log("enter move")
        if(e.targetTouches.length == 1)
        e.preventDefault()
        e.stopPropagation()
        ;[...e.changedTouches].forEach(touch=>{
            video.setAttribute("moveX", touch.clientX)
            video.currentTime += 0.2*(parseFloat(video.getAttribute("moveX")) - parseFloat(video.getAttribute("touchX")))
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
    })
})
