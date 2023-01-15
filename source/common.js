window.addEventListener('load', () =>
{
    var video = document.querySelector('video')
    console.log(video)
    document.addEventListener("touchstart", e => {
        if(e.changedTouches.length == 1){
            ;[...e.changedTouches].forEach(touch=>{
            video.setAttribute("touchX", touch.clientX)
            console.log(video.getAttribute("touchX"))
            }) 
        }
    //第三个参数 true or false 是指事件发生之后，事件会先逐层进入各层元素，直至最底层，然后冒泡出来，事件监听器中的函数是在进去还是出来的过程中执行,false 是在冒泡中执行
    },true)

    document.addEventListener("touchmove", e => {
        console.log("catch move")
        // e.preventDefault()
        // e.stopPropagation()
        if(e.targetTouches.length == 1){

            ;[...e.changedTouches].forEach(touch=>{
            video.setAttribute("moveX", touch.clientX)
            console.log(video.getAttribute("moveX"))
            console.log(video.currentTime)
            video.currentTime += 0.1*(video.getAttribute("moveX") - video.getAttribute("touchX"))
            video.setAttribute("touchX", video.getAttribute("moveX"));
            console.log(video.currentTime)
            video.play()
            } ) 
        }
    },true)

})

