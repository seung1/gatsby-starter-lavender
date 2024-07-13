---
title: "[Javascript] 이벤트"
date: "2024-03-06"
description: "모던 자바스크립트 Deep Dive 40"
tags: [Study]
hashtags:
  [
    javascript,
    event,
    eventhandler,
    click,
    submit,
    attribute,
    property,
    addEventListener,
    removeEventListener,
  ]
# thumbnail: /thumbnails/hello-world.jpg
# order: 32
---

> ### [공부자료 : 모던 자바스크립트 Deep Dive - 이웅모](https://poiemaweb.com/)
>
> 주 1회, 진도를 정해서 그룹 스터디를 진행했습니다.
>
> 책을 기반하여 제가 이해하기 쉽게 정리했습니다.
>
> 진행날짜 : 2024-03-06

### 이벤트 핸들러

이벤트 핸들러 : 이벤트가 발생했을때 호출될 함수

이벤트 핸들러 등록 : 이벤트가 발생했을때 브라우저에게 이벤트 핸들러의 호출을 위임

→ 이벤트가 발생하면 브라우저에 의해 이벤트 핸들러가 호출된다.

### 이벤트 드리븐 프로그래밍

이벤트 중심으로 제어하는 프로그래밍 방식

### 이벤트 타입

- 마우스
  - click
  - dbclick
  - mouseup
  - mouseenter
- 키보드
  - keydown
  - keypress
  - keyup
- 포커스
  - focus
  - blur
- 폼
  - submit
  - reset
- DOM mutation Event
  - DOMContentLoaded
- 뷰
  - resize
  - scroll
- 리소스
  - load
  - unload
  - abort
  - error

## 이벤트 핸들러 등록

### 1. 어트리뷰트 방식

on + 이벤트타입으로 이루어진 어트리뷰트값으로 함수 호출문 등의 문을 할당하는 것

```jsx
<button onclick='sayHi("Seung")'>Click</button>
```

함수 참조가 아닌 함수 호출문을 할당한다.

이때 어트리뷰트 값은 암묵적으로 생성될 이벤트 핸들러의 함수 몸체를 의미한다.

```jsx
function onclick(event) {
  sayHi("Seung"); // <- 이 부분
}
```

이벤트 핸들러(이벤트 발생시 호출되는 함수)에 인수를 전달하기 위해서 이러한 방식으로 동작한다.

```jsx
<button onclick='sayHi("seung"); sayHi("won");'>Click</button>;

// 여러개의 문을 할당할 수도 있다.

function onclick(event) {
  sayHi("seung");
  sayHi("won");
}
```

어트리뷰트 방식은 HTML과 자바스크립트가 혼재된 방식

하지만 모던 자바스크립트에서는 뷰를 구성하기 위한 구성요소로 보기에 관심사가 다르다고 생각하지 않는다.

- Angular / React / Svelte / Vue

### 2. 프로퍼티 방식

노드 객체는 이벤트 핸들러 프로퍼티를 가지고 있다.

이벤트 핸들러 프로퍼티에 함수를 바인딩하여 이벤트 핸들러를 등록하는 방식이다.

```jsx
const $button = document.querySelector("button");

$button.onclick = function () {
  console.log("버튼이 클릭됨 !");
};
```

- 이벤트 타깃 : $button
- 이벤트 타입 : onclick
- 이벤트 핸들러 : function () { … }

### 이벤트 핸들러 어트리뷰트 방식도 결국 이벤트 핸들러 프로퍼티로 변환된다.

따라서 두 방식은 동작은 동일하지만 표현방식만 다른 것이다.

프로퍼티 방식은 HTML과 자바스크립트가 분리된다.

프로퍼티 방식은 하나의 이벤트 핸들러만 바인딩 할수 있다.

```jsx
const $button = document.querySelector("button");

$button.onclick = function () {
  console.log("버튼이 클릭됨 !");
};

$button.onclick = function () {
  console.log("이건 두번째 함수야");
};

// 재할당 되어 이벤트 발생시 두번째 함수만 실행된다.
```

### 3. addEventListener 메서드 방식

프로퍼티 방식과 달리 이벤트 타입에 on을 붙이지 않는다.

```jsx
EventTarget.addEventListener('eventType',function(){...});

$button.addEventListener('click',function() {
	console.log('클릭되었습니다');
})
```

### 프로퍼티방식과 차이점

1. 프로퍼티 방식은 프로퍼티에 이벤트 핸들러를 바인딩하지만, addEventListener는 이벤트 핸들러를 인수로 전달한다.

2. 두 방식을 동시에 사용하게 될경우, addEventListener는 프로퍼티에 바인딩된 이벤트 핸들러에 영향을 주지 않고 두 방식의 이벤트 핸들러는 모두 호출된다.

3. 프로퍼티 방식은 재할당이 되어버리지만, addEventListener방식은 하나 이상의 이벤트 핸들러를 등록할 수 있다.

```jsx
$button.addEventListener("click", function () {
  console.log("클릭 첫번째 함수");
});

$button.addEventListener("click", function () {
  console.log("클릭 두번째 함수");
});

// <--- 클릭 이벤트 발생 --->

// 클릭 첫번째 함수
// 클릭 두번째 함수
```

### 이벤트 핸들러 제거 removeEventListener

addEventListener 메서드로 등록한 이벤트 핸들러는 removeEventListener로 제거할 수 있다.

**addEventListener에 전달한 인수와 동일하지 않으면 제거되지 않는다.**

```jsx
const handleClick = () => console.log("클릭");

$button.addEventListener("click", handleClick);

$button.removeEventListener("click", handleClick, true); // 제거 실패
$button.removeEventListener("click", handleClick); // 제거됨
```

**무명함수를 인수로 넘길 경우에도 제거할 수 없다.**

```jsx
$button.addEventListener("click", () => console.log("클릭"));
```

**이벤트 핸들러를 제거하려면 이벤트 랜들러의 참조를 변수나 자료구조에 저장하고 있어야한다.**

### 이벤트 핸들러 내부에서 removeEventListener를 이용하여 제거 가능

단, 기명함수에 한하여 가능하다.

```jsx
$button.addEventListener("click", function 기명_함수() {
  console.log("클릭 두번째 함수");

  $button.removeEventListener("click", 기명_함수);
});
```

> 프로퍼티 방식으로 등록된 이벤트 핸들러는 removeEventListener를 이용하여 제거불가

### 이벤트 객체

이벤트가 발생하면 이벤트 객체가 동적으로 생성된다.

이벤트 객체는 이벤트 핸들러의 첫번째 인수로 전달된다.

```jsx
const $button = document.querySelector("button");

$button.onclick = function (e) {
  console.log("이벤트 객체 : ", e);
};
```

### 어트리뷰트 방식의 경우는 이벤트 객체를 event로 지칭해야만 한다

암묵적으로 생성되는 이벤트 핸들러 함수의 몸체로 실행되는 것이기 때문에 event로 하지 않으면 전달받지 못한다.

```jsx
<button onclick='sayHi("seung"); sayHi("won");'>Click</button>;

function onclick(event) {
  sayHi("seung");
  sayHi("won");
}
```
