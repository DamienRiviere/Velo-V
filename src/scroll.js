function scroll() {
    document.querySelector('.navbar').addEventListener("click", (event) => {
        event.preventDefault();
        var offset = 0, y = 0, dy, call = setInterval(() => {
            if( Math.abs(dy=offset-y)>1 ) y += dy/8;
          else { clearInterval(call); y = offset; }
          document.documentElement.scrollTop = y;
        },10);
        offset = document.getElementById(event.srcElement.dataset.scroll).offsetTop;
            y = document.documentElement.scrollTop;
    });
}

export {scroll};
