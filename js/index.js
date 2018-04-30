// let loadingRender = (function(){
//     let $loadingBox=$('.loadingBox');
//     let $run = $loadingBox.find('.run');
//
//     let imgList = ["img/icon.png","img/zf_concatAddress.png","img/zf_concatInfo.png","img/zf_concatPhone.png","img/zf_course.png","img/zf_course1.png","img/zf_course2.png","img/zf_course3.png","img/zf_course4.png","img/zf_course5.png","img/zf_course6.png","img/zf_cube1.png","img/zf_cube2.png","img/zf_cube3.png","img/zf_cube4.png","img/zf_cube5.png","img/zf_cube6.png","img/zf_cubeBg.jpg","img/zf_cubeTip.png","img/zf_emploment.png","img/zf_messageArrow1.png","img/zf_messageArrow2.png","img/zf_messageChat.png","img/zf_messageKeyboard.png","img/zf_messageLogo.png","img/zf_messageStudent.png","img/zf_outline.png","img/zf_phoneBg.jpg","img/zf_phoneDetail.png","img/zf_phoneListen.png","img/zf_phoneLogo.png","img/zf_return.png","img/zf_style1.jpg","img/zf_style2.jpg","img/zf_style3.jpg","img/zf_styleTip1.png","img/zf_styleTip2.png","img/zf_teacher1.png","img/zf_teacher2.png","img/zf_teacher3.jpg","img/zf_teacher4.png","img/zf_teacher5.png","img/zf_teacher6.png","img/zf_teacherTip.png"]
//
//     let total = imgList.length;
//     let cur = 0;
//     let computed=function(){
//         imgList.forEach(function(item){
//             let tempImg = new Image;
//             tempImg.src = item;
//             tempImg.onload = function(){
//                 cur++;
//                 runFn();
//
//             }
//
//         })
//     };
//
//     let runFn = function(){
//         $run.css('width',cur/total*100+'%');
//         if(cur>=total){
//             setTimeout(function(){
//                 $loadingBox.remove();
//             },5000);
//             //$loadingBox.remove();
//             //phoneRender.init();
//         }
//     };
//     return {
//         init:function(){
//             $loadingBox.css('display','none');
//             computed();
//
//         }
//     }
// })();
// loadingRender.init();
//
// let phoneRender=(function($){
//     let $phoneBox = $(".phoneBox");
//     let $time=$phoneBox.find('.time');
//     let $listen=$phoneBox.find('.listen');
//     let $listenTouch=$listen.find('.touch');
//     let $detail=$phoneBox.find('.detail');
//     let $detailTouch=$detail.find('.touch');
//
//     let audioBell=$('#audioBell')[0];
//     let audioSay=$('#audioSay')[0];
//
//     let $phonePlan = $.Callbacks();
//     $phonePlan.add(function(){
//         $listen.remove();
//         $detail.css('transform','translateY(0)');
//     });
//
//     //控制say播放
//     $phonePlan.add(function(){
//         audioBell.pause();
//         audioSay.play();
//         //audioSay.volume=0;
//
//         $time.css('display','block');
//
//         console.dir(audioSay);
//         let sayTimer = setInterval(()=>{
//             let duration = audioSay.duration;
//             let current=audioSay.currentTime;
//
//             let minute = Math.floor(current/60);
//             let second = Math.floor(current-minute*60);
//
//             minute<10?minute='0'+minute:null;
//             second<10?second='0'+second:null;
//             $time.html(`${minute}:${second}`);
//
//             //播放结束
//             if(current >= duration){
//                 clearInterval(sayTimer);
//                 enterNext();
//             }
//         },1000);
//     });
//
//     //Detail touch
//     $phonePlan.add(()=>$detailTouch.click(enterNext));
//
//     //listen-touch
//     // let listenTouch=function(){
//     //     $listenTouch.click(function(){
//     //         $listen.remove();
//     //         $detail.css('transform','translateY(0)');
//     //     })
//     // };
//
//     //进入到下一个区（MESSAGE)
//     let enterNext = function(){
//         audioSay.pause();
//         $phoneBox.remove();
//         messageRender.init();
//
//
//     };
//
//     return {
//         init: function(){
//             $phoneBox.css('display','block');
//
//             //控制bell播放
//             audioBell.play();
//            // audioBell.volume=0;
//
//             $listenTouch.click($phonePlan.fire)
//         }
//     }
// })(Zepto);
// phoneRender.init();
//
// let messageRender = (function($){
//  let $messageBox = $('.messageBox'),
//      $talkBox = $messageBox.find('.talkBox'),
//      $talkList = $talkBox.find('li'),
//      $keybordBox = $messageBox.find('.keybordBox'),
//      $keybordText = $keybordBox.find('span'),
//      $submit = $keybordBox.find('.submit');
//
//  let $plan = $.Callbacks();
//     return {
//         init:function(){
//             // $messageBox.css('display','block');
//             // $plan.fire();
//         }
//     }
// })(Zepto);

let cubeRender = (function(){
    let $cubeBox = $('.cubeBox');
    let $box = $cubeBox.find('.box');

    let touchBegin = function(e){
        //=>this:box
        console.log(e);
        let point = e.changedTouches[0];
        $(this).attr({
            strX:point.clientX,
            strY:point.clientY,
            isMove:false,
            changeX:0,
            changeY:0,
        })

    };

    let touching = function(e){
        let point = e.changedTouches[0];
        let $this = $(this);

        let changeX = point.clientX -parseFloat($this.attr('strX')),
            changeY = point.clientY -parseFloat($this.attr('strY'));

        if(Math.abs(changeX)>10 || Math.abs(changeY)>10){
            $this.attr({
                isMove:true,
                changX:changeX,
                changY:changeY
            })
        }
    };

    let touchEnd = function(e){
        let point = e.changedTouches[0],
            $this = $(this);
        let isMove = $this.attr('isMove'),
            changX = parseFloat($this.attr('changX')),
            changY = parseFloat($this.attr('changY')),
            rotateX = parseFloat($this.attr('rotateX')),
            rotateY = parseFloat($this.attr('rotateY'));

        if(isMove==='false') return;
        rotateX = rotateX-changY/3;
        rotateY = rotateY+changX/3;
        $this.css(`transform`,`scale(.6) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`).attr({
            rotateX:rotateX,
            rotateY:rotateY
        })
    };

    return{
        init:function(){
            $cubeBox.css('display','block');

            //事件绑定实现相关效果
            $box.attr({
                rotateX:-30,
                rotateY:45
            }).on({
                touchstart:touchBegin,
                touchmove:touching,
                touchend:touchEnd
            });

            //每个页面点击操作
            $box.find('li').click(function(){
                $cubeBox.css('display','none');
                let index = $(this).index();
                detailRender.init(index);

            })
        }
    }
})();

cubeRender.init();


/*--Detail--*/
let detailRender = (function(){
    let $detailBox = $('.detailBox');
    let $cubeBox = $('.cubeBox');
    let $returnLink = $detailBox.find('.returnLink');
    let swiperExample=null;
    let $makisuBox = $('#makisuBox');

    let change = function(example){
        //example.activeIndex 当前活动索引
        //example.slides 数组存储了当前所有活动块
        //example.slides[example.activeIndex] 当前活动块
        let slideAry = example.slides;
        let activeIndex=example.activeIndex;

        //page单独处理
        if(activeIndex===0){
            $makisuBox.makisu({
                selector:'dd',
                overlap:0.6,
                speed:.8,
            });
            $makisuBox.makisu('open');
        }else{
            $makisuBox.makisu({
                selector:'dd',
                overlap:0,
                speed:.0,
            });
            $makisuBox.makisu('close');
        }

        //=>给当前活动快设置ID，其他活动块移除ID
        [].forEach.call(slideAry,function(item,index){
            if(index===activeIndex){
                item.id="page"+(index+1);
                return;
            }
            item.id=null;
        })
    };

    return {
        init:function(index=0){
            $detailBox.css('display','block');

            //=return
            $returnLink.click(()=>{
                $detailBox.css('display','none');
                $cubeBox.css('display','block');
            });

            //INIT swiper
            if(!swiperExample){
                swiperExample =  new Swiper('.swiper-container',{
                    effect:'coverflow',
                    onInit:change,
                    onTransitionEnd:change
                });
            }
          index=index>5?5:index;
          swiperExample.slideTo(index,0);
        }
    }
})();
detailRender.init();
