var video = null

var mouseOver = new MouseEvent('mouseover');

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
            //把双击（双touch)中的第二次touch无效化，因为youtube自带双击前进或者后退，这样就只有单击了，双击也会实现视频播放或者暂停
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
        
        // video.dispatchEvent( new MouseEvent('click', {
        //     bubbles: true,
        //     cancelable: true,
        //     view: window
        // }));
    },true)
        
    video.addEventListener("touchmove", e=>{
        e.preventDefault();
        e.stopPropagation()
        if(e.targetTouches.length == 1){
            ;[...e.changedTouches].forEach(touch=>{
            video.setAttribute("moveX", touch.clientX)
            video.currentTime += 0.2*(video.getAttribute("moveX") - video.getAttribute("touchX"))
            video.setAttribute("touchX", video.getAttribute("moveX"));
            //video.play()
            //if the progress bar is controlled by code, like below, the bar will show but not update with touchmove. The videotime in the leftdown side will update 
            // hideBar = document.querySelector("#movie_player")
            // hideBar.className = "html5-video-player ytp-transparent ytp-exp-bottom-control-flexbox ytp-exp-ppp-update ytp-fit-cover-video ytp-fine-scrubbing-exp ytp-rounded-miniplayer ytp-heat-map ytp-branding-shown ytp-autonav-endscreen-cancelled-state ad-created ytp-hide-info-bar playing-mode"
            // hideBar.className = "html5-video-player ytp-transparent ytp-exp-bottom-control-flexbox ytp-exp-ppp-update ytp-fit-cover-video ytp-fine-scrubbing-exp ytp-rounded-miniplayer ytp-heat-map ytp-branding-shown ytp-autonav-endscreen-cancelled-state ad-created ytp-hide-info-bar playing-mode ytp-autohide"
            // hideBar.className = "html5-video-player ytp-transparent ytp-exp-bottom-control-flexbox ytp-exp-ppp-update ytp-fit-cover-video ytp-fine-scrubbing-exp ytp-rounded-miniplayer ytp-heat-map ytp-branding-shown ytp-autonav-endscreen-cancelled-state ad-created ytp-hide-info-bar playing-mode"
            //If the progress bar is touched, the if loop will be triggered and video currenttime is going to follow the progress bar instead of touchmove
            })  
        }
    },true)
    // video.addEventListener('touchend', e => {
    //     video.play()
    // },true);
})
