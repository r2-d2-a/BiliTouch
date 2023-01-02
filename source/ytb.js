console.log("loaded")
const container = document.getElementById("page-manager")
const video = document.querySelector("video")

//youtube 会出现container 是null的情况，所以用函数包裹起来，做一下检查
function fun() {
    if (container == null)
    {
        var container = document.getElementById("page-manager")
    }
    container.addEventListener("touchstart", e => {
        // console.log("touched")
        // console.log(player)
        if(e.changedTouches.length == 1){
            //e.preventDefault()
            ;[...e.changedTouches].forEach(touch=>{
            if(video == null)
            {
                var video = document.querySelector('video')
            }
            if(video.getAttribute("touchWorldTime") != null && 
                video.getAttribute("touchX") != null&&
                video.getAttribute("touchY") != null)
            {
                // console.log("entered first")
                // console.log("prev touchTime", video.getAttribute("touchWorldTime"))
                // console.log("current touchTime", new Date().getTime())
                // console.log("转化后的currentTime属性", parseFloat(video.getAttribute("touchWorldTime")))
                // console.log(new Date().getTime() - video.getAttribute("touchWorldTime"))
                if(new Date().getTime() - video.getAttribute("touchWorldTime") < 500 && 
                    touch.clientX - video.getAttribute("touchX") < 15 &&
                    touch.clientY - video.getAttribute("touchY") < 15 )
                {
                    e.preventDefault(); 
                    
                    if(video.paused)
                    {
                        // console.log("video play")
                        // video.play()
                        e.preventDefault(); 
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                        return false;
                    }
                    else
                    {
                        // console.log("video pause")
                        // video.pause()
                        e.preventDefault(); 
                        e.stopPropagation();
                        return false;
                    }
                }
            }
            video.setAttribute("touchWorldTime", new Date().getTime())
            video.setAttribute("touchVideoTime", video.currentTime)
            video.setAttribute("touchX", touch.clientX)
            video.setAttribute("touchY", touch.clientY)
            })
            
        }
    },true)
    
    container.addEventListener("touchmove", e => {
        // console.log("moved")
        // e.preventDefault();
        // e.stopPropagation();
        if(e.targetTouches.length == 1){
    
            ;[...e.changedTouches].forEach(touch=>{
            if(video == null)
            {
                var video = document.querySelector('video')
            }
            video.setAttribute("moveX", touch.clientX)
            video.currentTime =  parseFloat(video.getAttribute("touchVideoTime")) + 0.1*(video.getAttribute("moveX") - video.getAttribute("touchX"))
            video.play()
            })  
        }
        return false;
        
    },true)
    
    container.addEventListener('touchend', e => {
        e.preventDefault();
    },true);
}
fun();