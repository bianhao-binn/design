(function($){
    
    // 默认的初始值
    _windowHeight = $(window).height();
    // 获取到的canvaDocument宽高,数量
    _oldCanvaWidth = 400;
    _oldCanvaHeight = 500;
    _oldCanvaNum = 1;
    // 设置canvaDocument的留空
    _leftBlank = 100;
    _rightBlank = 100;
    _topBlank = 100;
    _bottomBlank = 100;
    // 在拖拉页面时,inner的大小不会发生改变
    _minInnerHeight = _windowHeight;
    _minInnerWidth = 0;
    // 进入页面先设置部分div的宽高
    sizeSet();
    // 设置inner的宽高
    $("#inner")
        .css({
            "height" : _minInnerHeight,
            "width" : _minInnerWidth,
        });
    $("#rightCanva")
        .mouseenter(function(){
            $(this).css("overflow","auto");
        })
        .mouseleave(function(){
            $(this).css("overflow","hidden");
        });
    // 设置canvaDocument的大小和位置
    canvaDocumentPosition();

    $(".materialWrapSon").height( _windowHeight );
    $("#materialWrap").css( "top" , -_windowHeight );

    // 页面大小改变重新设置div的宽高
    $(window).resize(function(){
        sizeSet();
    });
    
    // 点击materialMenuBtn显示meterialWrap的切换
    $(".materialMenuBtn").click(function(){
        $(".materialMenuBtnHover").removeClass("materialMenuBtnHover");
        $(this).addClass("materialMenuBtnHover");
        $("#materialWrap").stop();
        var _btnIndex = $(".materialMenuBtn").index(this);
        console.log(_btnIndex);
        $("#materialWrap").animate( { top : -_btnIndex * _windowHeight } )
    });
    
    // 测试
    var _newTop = $("#rightCanva").height() * 0.2;
    $("#rightCanva")
        .click(function(){
            $("#popPanel")
                .css( "top" , _newTop )
                .toggle( "bounce", { times: 1 ,distance: 10}, "fast" ); 
        });
    
    
})(jQuery)


/*
 *  设置页面部分div的宽高
 * */
function sizeSet(){
    // 获取我初始值
    var _windowWidth = $(window).width();
    // 设置rightCanva
    var _leftMaterialWidth = $("#leftMaterial").width();
    var _rightCanvaWidth = _windowWidth - _leftMaterialWidth;
    if( _minInnerWidth == 0 ) _minInnerWidth = _rightCanvaWidth;
    console.log( _minInnerWidth + "    " + _rightCanvaWidth );
    $("#rightCanva")
        .width( _rightCanvaWidth )
        .css( "left" , _leftMaterialWidth );
    // 设置materialWrap
    var _materialMenuWidth = $("#materialMenu").width();
    var _materialWrapWidth = _leftMaterialWidth - _materialMenuWidth;
    $("#materialWrap").width(_materialWrapWidth);
    // 默认的materialWrapBlank留白
    var _materialWrapSonBlank = {
        "top" : 90,
        "bottom" : 0,
        "left" : 10,
        "right" : 20,
    }
    var _materialWrapContentWidth = $(".materialWrapSon").width() - _materialWrapSonBlank.left - _materialWrapSonBlank.right;
    // 设置materialWrapContent的宽
    $(".materialWrapContent").width(_materialWrapContentWidth);
    // chooseMaterialLi的最小宽度为80
    var _minChooseMaterialLiWidth = 80;
    if( _materialWrapContentWidth / _minChooseMaterialLiWidth < 3 )
        $(".chooseMaterialLi")
            .css({
                "width" : ( _materialWrapContentWidth / 2 ) - 10,
                "height" : ( _materialWrapContentWidth / 2 ) - 10,
            });
    else
        $(".chooseMaterialLi")
            .css({
                "width" : ( _materialWrapContentWidth / 3 ) - 10,
                "height" : ( _materialWrapContentWidth / 3 ) - 10,
            });

    // chooseMaterialLi click事件
    $(".chooseMaterialLi").click(function(){
        var _chooseKind = $(".chooseMaterialLi").index(this);
        alert(_chooseKind);
    });
    // 设置canvaDocument大小位置
    var _rightCanvaWidth = $("#rightCanve").width();
    var _rightCanvaHeight = $("#rightCanva").height();
}

/*
 *  canvaDocument的定位
 * */
function canvaDocumentPosition(){
    var _canvaDocumentSpaceWidth = $("#inner").width() - _leftBlank - _rightBlank;
    var _canvaDocumentSpaceHeight = $("#inner").height() - _topBlank - _bottomBlank;
    var _canvaWidthScale = _canvaDocumentSpaceWidth / _oldCanvaWidth;
    var _canvaHeightScale = _canvaDocumentSpaceHeight / _oldCanvaHeight;
    var _canvaTop = ( $("#inner").height() - _oldCanvaHeight * _canvaWidthScale ) / 2;
    var _canvaLeft = ( $("#inner").width() - _oldCanvaWidth * _canvaHeightScale ) / 2;
    if( _canvaWidthScale > _canvaHeightScale )
        $(".canvaDocument")
            .css({
                "height" : _canvaDocumentSpaceHeight,
                "width" : _oldCanvaWidth * _canvaHeightScale,
                "top" : "100px",
                "left" : _canvaLeft,
            });
    else 
        $(".canvaDocument")
            .css({
                "height" : _oldCanvaHeight * _canvaWidthScale,
                "width" : _canvaDocumentSpaceWidth,
                "top" : _canvaTop,
                "left" : "100px",
            });
}
