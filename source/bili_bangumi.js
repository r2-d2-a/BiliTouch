var video = null
function addGlobalEventListener(type, seletor, callback){
    document.addEventListener(type, e => {
        if(e.target.matches(seletor))callback (e)
    })
}

function progressShadow(){
    var shadowProgress = document.querySelector("#bilibili-player > div > div > div.bpx-player-primary-area > div.bpx-player-video-area > div.bpx-player-control-wrap > div.squirtle-controller.squirtle-pgc > div.squirtle-progress-wrap.squirtle-progress-common")
    if(shadowProgress != null)
    {
        document.querySelector("#bilibili-player > div > div > div.bpx-player-primary-area > div.bpx-player-video-area > div.bpx-player-control-wrap > div.squirtle-controller.squirtle-pgc > div.squirtle-progress-wrap.squirtle-progress-common").className = "squirtle-progress-wrap squirtle-progress-common ease"
        
    }
    console.log(document.querySelector("#bilibili-player > div > div > div.bpx-player-primary-area > div.bpx-player-video-area > div.bpx-player-control-wrap > div.squirtle-controller.squirtle-pgc.squirtle-wide-screen > div.squirtle-progress-wrap.squirtle-progress-common.ease"))
    if(document.querySelector("#bilibili-player > div > div > div.bpx-player-primary-area > div.bpx-player-video-area > div.bpx-player-control-wrap > div.squirtle-controller.squirtle-pgc.squirtle-wide-screen > div.squirtle-progress-wrap.squirtle-progress-common.ease") != null)
    {  
        document.querySelector("#bilibili-player > div > div > div.bpx-player-primary-area > div.bpx-player-video-area > div.bpx-player-control-wrap > div.squirtle-controller.squirtle-pgc.squirtle-wide-screen > div.squirtle-progress-wrap.squirtle-progress-common.ease").setAttribute('style', "display: none;")
    }
    document.querySelector("#bilibili-player > div > div > div.bpx-player-primary-area > div.bpx-player-video-area > div.bpx-player-control-wrap > div.squirtle-controller.squirtle-pgc > div.squirtle-high-energy").className = "squirtle-high-energy ease"
    var shadowContent = document.querySelector("#bilibili-player > div > div > div.bpx-player-primary-area > div.bpx-player-video-area > div.bpx-player-control-wrap > div.squirtle-controller.squirtle-pgc > div.squirtle-controller-wrap")
    //shadowProgress.className = "squirtle-progress-wrap squirtle-progress-common"
    shadowContent.setAttribute('style', "display: none;")
    document.getElementById('bilibili_pbp').className = ""
    
}

addGlobalEventListener("touchstart", "video", e=>{
        video = document.querySelector('video')
        console.log(video)
})

document.addEventListener('touchstart', () => {
    if(video == null)
    {
        return;
    }
    video.addEventListener("touchstart", e => {
        if(e.changedTouches.length == 1){
            //e.preventDefault()
            ;[...e.changedTouches].forEach(touch=>{
            video.setAttribute("touchWorldTime", new Date().getTime())
            video.setAttribute("touchY", touch.clientY)
            video.setAttribute("touchX", touch.clientX)
            })
        }
    },true)

    video.addEventListener("touchmove", e => {
        if(e.targetTouches.length == 1)
        e.preventDefault()
        e.stopPropagation()
        ;[...e.changedTouches].forEach(touch=>{
            video.setAttribute("moveX", touch.clientX)
            video.currentTime += 0.1*(video.getAttribute("moveX") - video.getAttribute("touchX"))
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
    document.addEventListener("touchend", e => {
        if(e.targetTouches.length == 1)
        ;[...e.changedTouches].forEach(touch=>{
           if(e.target.matches('video'))
           {
                setTimeout('progressShadow()', 3000)
                //e.preventDefault()
                e.stopPropagation()
                e.stopImmediatePropagation()
           }     
        })
    })

})
