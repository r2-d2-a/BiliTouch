//console.log("loaded")
const container = document.getElementById("page-manager")
const video = document.querySelector("video")

//youtube 会出现container 是null的情况，所以用函数包裹起来，做一下检查

function fun() {
    //sometims there is a mistake: container is null, fun() is used for check
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
            //Youtube has a native function to  be forward or backward if you click the right or left side of the player part.
            //It conflicts a little bit with the function by touchmove. The best way I thought is by cancelling the second touch 
            //in double touch. So the website can not receive double click. After double click, the video will also stop or play as
            //it thought it is a single click
            //把双击（双touch)中的第二次touch无效化，因为youtube自带双击前进或者后退，这样就只有单击了，双击也会实现视频播放或者暂停
            if(video.getAttribute("touchWorldTime") != null && 
                video.getAttribute("touchX") != null&&
                video.getAttribute("touchY") != null)
            {   //调试用 for debugs
                // console.log("entered first")
                // console.log("prev touchTime", video.getAttribute("touchWorldTime"))
                // console.log("current touchTime", new Date().getTime())
                // console.log("转化后的currentTime属性", parseFloat(video.getAttribute("touchWorldTime")))
                // console.log(new Date().getTime() - video.getAttribute("touchWorldTime"))
                if(new Date().getTime() - video.getAttribute("touchWorldTime") < 1000 && 
                    touch.clientX - video.getAttribute("touchX") < 100 &&
                    touch.clientY - video.getAttribute("touchY") < 100 )
                {
                    e.preventDefault(); 
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    return false;
                    
                }
            }
            video.setAttribute("touchWorldTime", new Date().getTime())
            video.setAttribute("touchY", touch.clientY)
            video.setAttribute("touchVideoTime", video.currentTime)
            video.setAttribute("touchX", touch.clientX)
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
            video.setAttribute("touchVideoTime", video.currentTime)
            video.play()
            })  
        }
        return false;
        
    },true)
    
    // container.addEventListener('touchend', e => {
    //     e.preventDefault();
    // },true);
}
fun();