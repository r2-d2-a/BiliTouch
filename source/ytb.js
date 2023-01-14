var video = null

function addGlobalEventListener(type, seletor, callback){
    document.addEventListener(type, e => {
        if(e.target.matches(seletor))callback (e)
    })
}
addGlobalEventListener("touchstart", "video", e=>{
        video = document.querySelector('video')
})
window.addEventListener('touchstart', () => {
    if(video == null)
    {
        return;
    }
    video.addEventListener("touchstart", e =>{
        if(e.changedTouches.length == 1){
            ;[...e.changedTouches].forEach(touch=>{
            video.setAttribute("touchWorldTime", new Date().getTime())
            video.setAttribute("touchY", touch.clientY)
            video.setAttribute("touchX", touch.clientX)
            /*Youtube has a native function to  be forward or backward if you click the right or left side of the player.
                It conflicts a little bit with the function by touchmove. The best way I thought is cancelling the second touch 
                in double touch. So the website can not receive double click. After double click, the video will also stop or play as
                it thought it is a single click*/
            
            if(video.getAttribute("touchWorldTime") != null && 
                video.getAttribute("touchX") != null&&
                video.getAttribute("touchY") != null)
            {  
                if(new Date().getTime() - video.getAttribute("touchWorldTime") < 200 && 
                    touch.clientX - video.getAttribute("touchX") < 200 &&
                    touch.clientY - video.getAttribute("touchY") < 200 )
                {
                    e.preventDefault(); 
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    return false;   
                }
            }
            })
        }
        video.click()
    },true)
        
    video.addEventListener("touchmove", e=>{
        e.preventDefault();
        e.stopPropagation()
        if(e.targetTouches.length == 1){
            ;[...e.changedTouches].forEach(touch=>{
            video.setAttribute("moveX", touch.clientX)
            video.currentTime += 0.2*(video.getAttribute("moveX") - video.getAttribute("touchX"))
            video.setAttribute("touchX", video.getAttribute("moveX"));
            video.play()
            
            })  
        }
    },true)
    // video.addEventListener('touchend', e => {
    //    video.click()
    // },true);
})
