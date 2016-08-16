$.fn.extend({
    animateCss: function(animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

var Util = {
    getQueryString: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
}

var t1,t2;

var Index = {
    queryImage: function() {
        var ajaxSetting = {
            url: 'http://user.sightp.com/mobile/get-activity-info?id=' + Util.getQueryString('id'),
            dataType: 'jsonp',
        };

        $.ajax(ajaxSetting).done(function(data) {
            if ('0' === data.errorCode) {
                $('#new').attr('src',data.result.photo);
            }
        });
    },
    playImage: function() {
        var i = 0;
        t1 = setInterval(function() {
            $('.ablum-bg-img').hide();
            $('.t' + i).show();
            i++;
            if (i > 4) {
                i = 0;
            }
        }, 2000)
    },
    resetImage:function(){
      $('.ablum-bg-img').hide();
      $('.t0').show();
      clearInterval(t1);
      clearTimeout(t2);
    },
    startSwiper: function() {
        var swiper = new Swiper('.swiper-container', {
            paginationClickable: true,
            direction: 'vertical',
            onInit: function(swiper) { //Swiper2.x的初始化是onFirstInit
                swiperAnimateCache(swiper); //隐藏动画元素
                swiperAnimate(swiper); //初始化完成开始动画
                var i = 0,
                    t;
                t = setInterval(function() {
                    i++;
                    $('#progress').html(i + '%');
                    if (i == 100) {
                        clearInterval(t)
                    }
                }, 25)
            },
            onSlideChangeEnd: function(swiper) {
                swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
                if (swiper.activeIndex == 1) {
                  t2= setTimeout(function(){
                    Index.playImage();
                  },2000)
                }else{
                  Index.resetImage();
                }
                $('#cover').addClass('dn');
                // $('#old').removeClass('dn').next().addClass('dn');

                if(swiper.activeIndex == 2){
                  var src = $('#new').attr('src');
                  var margin = parseInt($('#targetImg').css('margin'));
                  $('#targetImg').css({
                    'backgroundImage':'url('+src+')',
                    'backgroundSize':'cover',
                    'height':$('#targetImg').parent().height()-margin*2,
                    'width':$('#targetImg').parent().width()-margin*2
                  });
                }
            }
        });
    },
    main: function() {
        Index.queryImage();
        Index.startSwiper();
        Index.center();
        $(document).on('click touchstart', '.slogan2', function() {
            $('#cover').removeClass('dn');
            // $('#old').addClass('dn').next().removeClass('dn');
        })
    },
    center: function() {
        var w = (0 - $('.step').width()) / 2;
        $('.step').css({
            'margin': '0 ' + w + 'px'
        })
    }
}

$(function() {
    Index.main();
})
