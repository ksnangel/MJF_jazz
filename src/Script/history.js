//window.ready 보다 document.ready 가 먼저 실행됩니다.
//window.ready 는 페이지 내의 이미지를 포함하여 모든 리소스가 로드 되고나서 실행되고
//document.ready 는 태그 등의 세팅이 완료 되었을 때 실행되기 때문입니다

$(document).ready(() => { //가장 먼저 실행


 // => { window.addEventListener('load',function (){
// window.addEventListener('load',function (){   //브라우져에 그려지고(리소스들이 로딩이 완료되면!!)
  //load 이벤트는 리소스와 그것에 의존하는 리소스들의 로딩이 완료되면 실행됩니다.

//window.onload: 문서의 모든 콘텐츠(img,script, css등)가 로드된 후에 발생하는 이벤트
//window.addEventListener()함수로 DOM로드 기능을 사용(window.onload보다 속도가 빠름)
//window : 현재 스크립트가 작동 중인 창 = DOM문서를 담은 창

/*
  // Trigger Navigation toggle button
  //JQuery - animation 이벤트(toggleClass(), trigger())
  $('.trigger').on('click', function () {
    $(this).toggleClass('active')
    $('.gnb').toggleClass('active')
  })
  // Trigger .gnb a 클릭 시 해당 위치로 스크롤 후 네비게이션 닫힘.
  $('.gnb a').on('click', function () {
    $('.gnb, .trigger').removeClass('active')
  })

  // jQuery.scrollTo
  $('.gnb a, .goToTop').on('click', function (e) {
    $.scrollTo(this.hash || 0, 800) //window.scrollTo(x-좌표, y-좌표)
    e.preventDefault()
  })

  // scroll down 시 active class 추가
  $(window).on('scroll', () => {
    $(window).scrollTop() > 50 ? $('header, .goToTop').addClass('active') : $('header, .goToTop').removeClass('active')
  })

*/

//history 리뷰 시작========================================================================================================

 

// Fetch the items from the JSON file
// JSON 파일에서 항목(아이템들)을 동적으로  가져오기
 function loadItems() {
  return fetch('/src/data/data.json') //브라우져 API 중 하나인 fetch를 통해  data.json에 접근 ("fetch"  :페치는 파일의 경로나  url 적어주면 네트워크를 통해 데이터를 받아온다)
    .then(response => response.json())//.그리고나서 then을 통해( 비동기 결과값을 얻고 싶으면then) - 성공적으로 받아오면 response를 얻을 수 있다.
                                     //( response.json()을 하면 json형태로 변환된다) 
                                     //Response는 HTTP 응답 전체를 나타내는 객체로, JSON 본문 콘텐츠를 추출하기 위해서는 json()메서드를 호출해야 합니다.
    .then(json =>json.items);//그리고나서 전체 json을 return하지 않고 json에 있는 items만 받아오기 위해 json.items을 사용
   
}

//items 콘솔에 출력 확인
loadItems()
.then((items) =>{
console.log(items);
});



// Update the list with the given items
// 지정된 항목으로 목록 업데이트(받아온 items를 display화면에 보여주기) 
//==> displayItems함수를 선언하여 화면에 출력: displayItems에 받아온 items을 html요소로 변환해서 페이지에 표기가 되게 만들어주기
function displayItems(items) { //json으로 받아온 items  
  const container = document.querySelector('.items');//먼저 HTML에 ul로 items를 선택
  container.innerHTML = items.map(item => createHTMLString(item)).join('');// 각각 아이템을 join('')(붙여서)넣어준다. (//container.innerHTML로 items.map에 item을 createHTMLString(item))
  //items object를 html 형태로 넣어주기 위해  createHTMLString함수를 선언하고 li형태로 return 받은 후 join을 사용해 붙여준다.
  //( container.innerHTML을 통해  각각의 요소를  html의 요소 li 태그 (createHTMLString)로 그려준다.)
  // 그러면 HTML class가 items인 ul 태그 안에 li 태그들이 추가되면서 화면에 보여지게 된다.
}

// Create HTML list item from the given data item
// item(ul->li생성)을 HTML 목록 항목 생성 ==> items object를 HTML li 형태로 리턴 (각각 item을 받아와서 li 태그로 만든다)
function createHTMLString(item) {  
  return `
    <li class="item">
        <img src="${item.image}" alt="${item.title}" class="item__thumbnail" />
        <div class ="barDiv"></div>
        <button> ${item.year} </button>
        <br>
        <span class="item__description">${item.content}</span>
    </li>
    `;
}


// 필터링  함수(.buttons중에서 item 필터링)
function onButtonClick(event, items) { 
  const dataset = event.target.dataset;//(이벤트 타겟 -데이터 속성 사용하기):이벤트 타겟이된 dataset객체속성에 접근해서 읽어와 dataset에 저장 
  const key = dataset.key;             //dataset에 key값을 저장
  const value = dataset.value;         //dataset에 value값을저장
  console.log(key);

  if (key == null || value == null) {
    return;                           //만약 key가 null 이거나 value가 null이면 그냥 return해서 끝!!
  }

  displayItems(items.filter(item => item[key] === value));
                                      //  displayItems함수에서 필터링  ==> key(title)와 값(해당년도)이  같은 아이템 필터링
}

//onButtonClick로컬 함수는 
//event.target.dataset에서 필요한 정보를 가져와서 
//filter한 배열을 displayItems함수에 매개변수로 전달한다. 
//(이러면 전체적으로 업데이트 되니까 filter해서 보여지고, 
//나머지는 보여지지 않게 하는 방법도 있음)



 //setEventListeners()에 items 인자로 가져와서 
//==>클릭되면 전체(items) or 선택된 아이템(item) 클릭시 화면출력

function setEventListeners(items) {
  const btnAll = document.querySelector('.btnAllHistory');    // All 버튼 클래스 선택
  const buttons = document.querySelector('.buttons');         //.buttons 클래스 선택
  btnAll.addEventListener('click', () => displayItems(items));//All 버튼-클릭되면 전체 아이템들을 화면에 출력(displayItems(items))
  buttons.addEventListener('click', event => onButtonClick(event, items));//클릭되면 해당 아이템만 화면에 출력onButtonClick(event, items)
}

//addEventListener  (EventTarget 인터페이스의 addEventListener() 메서드)는 
//지정한 유형의 이벤트를 대상이 수신할 때마다 호출할 함수를 설정합니다.



// main   : items을 동적으로 받아오기  (전체 코드 그림)
loadItems()  // 1. loadItems() 함수로 JSON 파일에서 아이템들을 동적으로  가져와서 전달해주게 실행
  .then(items => { // A.   성공이면  ==> 아이템을 받아올것 :   displayItems(items);   &s setEventListeners(items)실행 (데이터를 가져오려면 시간이 걸린다=비동기  promise가 성공 )
   displayItems(items);                     //화면출력(받아온 items를 함수에 전달)   
   setEventListeners(items);                //버튼을 누르면 필터링
  })
  .catch(console.log); //B.  실패하면==>  콘솔에 출력 : catch를 이용해서 콘솔에 출력() error 메세지를 메시지등을 사용자에게 보여줄수 있게)


 // 1. loadItems : fetch API로 json 파일을 가져와서, response를 json형태로 파싱하고, 
      //items의 배열을 가져온다.
 // 2.items의 배열을 displayItems, setEventListeners 함수에 매개변수로 전달해준다.

})//close  ==>  //close  ==>$(document).ready(() =============================>>>>>>>>>전체 끝!!!!












  // var cat = '{"name": "나비 ", "age": 2, "weight": 2.4}';
  //var items = '{"title": "2022", "year" :"2022", "content": "MONT REUX JAZZ FESTIVAL WHERE LEGENDS ARE BORN ","image": "../Assets/images/historyimg/2022 LARGE-1800x0-c-default.jpg"}';


  // var jsonData = JSON.parse(cat); // js 객체를 문자열로 변환
  // document.getElementById("json").innerHTML = jsonData.image + "의 나이는 " + jsonData.content + "살 입니다.";


