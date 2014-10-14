(function($){
    /*
     *  获得初始值
     * */
    var _windowWidth = $(window).width();

    //设置rightCanva
    var _leftMenuWidth = $("#leftMaterial").width();
    $("#rightCanva")
        .width( _windowWidth - _leftMenuWidth )
        .css("left",_leftMenuWidth);
    
    var _newTop = $("#rightCanva").height() * 0.2;
    $("#rightCanva")
        .click(function(){
            $("#popPanel")
                .css("top",_newTop)
                .toggle( "bounce", { times: 1 ,distance: 10}, "fast" ); 
        })

    $(window).resize(function(){
        console.log("window.resize");
    })
})(jQuery)

