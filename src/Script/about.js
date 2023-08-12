window.addEventListener('load',function (){
  //=========배경화면정리==================
  let introBg=this.document.querySelector(".intro");
  introBg.style.backgroundImage=`url("")`;

//==슬라이드 사진 ==
  $(".sliderWrap").slick({
      slidesToShow: 1,
      centerMode: true,
      variableWidth: true,
      slidesToScroll: 1,
      autoplay: true,
      infinite : true, 
      autoplaySpeed: 5000,
      pauseOnHover : true,
      arrows: false
      // dots : true
  });
  
    //==============디데이========================
  function ddayView(){
    let dDayDiv=document.querySelector(".dDay > span");
    let today=new Date(); //현재 날짜
    let dday=new Date(" 1967-6-18 00:00:00").getTime(); //디데이 날짜 
    let gap=today-dday
    let gapDay =Math.floor(gap/(1000*60*60*24)); //내림 사용. 이건 일만 사용한거네! 1000밀리초=1초 *60 1분 *60 1시간 *24 일 
    let gapHour =(String)(Math.floor(gap/(1000*60*60)%24)).padStart(2,"0");   //시
    let gapMinute=(String)(Math.floor(gap/(1000*60)%60)).padStart(2,"0");   //분 
    let gapSecond=(String)(Math.floor(gap/(1000)%60)).padStart(2,"0");    //초 //얘는 나머지로 계산했네.
    dDayDiv.innerHTML=`From 1967-6-18 D+${gapDay} ${gapHour}:${gapMinute}:${gapSecond}`;
    // console.log("check");
  }
  ddayView();
  setInterval(ddayView, 1000);    //setInterval 

  //=====================전광판==================
  let marqueeDiv=document.querySelector(".marqueeDiv marquee");
  let singer="LINEUP:  David Bowie, James Brown, BB King, Geese Jarrett, Carlos Santana, Etta James, Patty Smith, Massive Attack, Viyok, Radiohead, Leonard Cohen, Deep Purple," 
  +"and Prince, Jack White, Questlove, Quincy Jones";
  function marquee(){
    marqueeDiv.innerText=singer;
  }
  marquee();

  //================이미지크게보기, 모달사용==================  
  let modalMain= document.querySelector(".galleryModal");   //전체모달
  //let delImg= document.querySelector(".gallery img"); 
  let closeModal= document.querySelector(".closeBtn");      //닫기버튼
  let innerImg= document.querySelectorAll(".inner_gallery img"); //버튼용, 이미 배열의 형태로 변경되어 있음 
  let modalImg= document.querySelector(".modalImg");

  
  // ======On==== for문 사용(쿼리 셀렉트All 배열형태 데이터를 반복문 사용)
  for (let i = 0; i < innerImg.length; i++) {
    innerImg[i].addEventListener("click", function(){
      innerImg[i].classList.add("hidden");
      let imgUrl=innerImg[i].src;
      modalImg.style.backgroundImage=`url("${imgUrl}")`;
      modalMain.style.display="flex";
      });
  }
    //======Off==== closeBtn위치를 상대위치로 변경하고 싶은데 구현불가
    closeModal.addEventListener("click", function() {
      modalMain.style.display="none";
      for (let i = 0; i < innerImg.length; i++) {
        innerImg[i].classList.remove("hidden");
      }
    });
    
});//close
  