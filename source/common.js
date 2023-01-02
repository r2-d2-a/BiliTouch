
const video = document.querySelector("video")


document.addEventListener("touchstart", e => {
    console.log("entered")
    if(e.changedTouches.length == 1){
        // e.preventDefault()
        // e.stopPropagation()
        ;[...e.changedTouches].forEach(touch=>{
        if(video == null)
        {
            var video = document.querySelector('video')
        }
        //无法协调单击播放/暂停，以及双击全屏
        //(touch事件被自动识别为click, 所以播放器上的按钮有效且双击全屏，最后加的touchend监听器可以阻止这一自动识别,但如果启用播放器中的按钮会失效)
        // if(video.getAttribute("touchWorldTime") != null && 
        //     video.getAttribute("touchX") != null &&
        //     video.getAttribute("touchY") != null)
        // {
        //     console.log("enter 1")
        //     if(new Date().getTime() - video.getAttribute("touchWorldTime") < 800 && 
        //         touch.clientX - video.getAttribute("touchX") < 20 &&
        //         touch.clientY - video.getAttribute("touchY") < 20 )
        //     {
               
        //         if(video.paused)
        //         {
        //             video.play()
        //         }
        //         else
        //         {
        //             video.pause()
        //         }
        //          e.preventDefault();

        //     }
        // }
        
        video.setAttribute("touchWorldTime", new Date().getTime())
        video.setAttribute("touchVideoTime", video.currentTime)
        video.setAttribute("touchX", touch.clientX)
        video.setAttribute("touchY", touch.clientY)
        })
        
        
    }
//第三个参数 true or false 是指事件发生之后，事件会先逐层进入各层元素，直至最底层，然后冒泡出来，事件监听器中的函数是在进去还是出来的过程中执行
},true)

video.addEventListener("touchmove", e => {
    // e.preventDefault()
    // e.stopPropagation()
    if(e.targetTouches.length == 1){

        ;[...e.changedTouches].forEach(touch=>{
        if(video == null)
        {
            var video = document.querySelector('video')
        }
        video.setAttribute("moveX", touch.clientX)
        console.log(video.currentTime)
        console.log(video.getAttribute("touchVideoTime"))
        console.log(video.getAttribute("moveX") - video.getAttribute("touchX"))
        video.currentTime = parseFloat(video.getAttribute("touchVideoTime")) + 0.06*(video.getAttribute("moveX") - video.getAttribute("touchX"))
        video.play()
        } ) 
    }
},true)

//可以阻止把touch系列事件直接识别为click from stackoverflow
// document.addEventListener('touchend', e => {
//     e.preventDefault();
// },true);