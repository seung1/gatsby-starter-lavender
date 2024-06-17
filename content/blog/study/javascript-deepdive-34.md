---
title: "[Javascript] 이터러블"
date: "2024-02-14"
description: "모던 자바스크립트 Deep Dive 34"
tags: [study]
hashtags: [javascript, iterator, iterable, array]
# thumbnail: /thumbnails/hello-world.jpg
# order: 32
---

> ### [공부자료 : 모던 자바스크립트 Deep Dive - 이웅모](https://poiemaweb.com/)
>
> 주 1회, 진도를 정해서 그룹 스터디를 진행했습니다.
>
> 책을 기반하여 제가 이해하기 쉽게 정리했습니다.
>
> 진행날짜 : 2024-02-14

## 이터러블 : 이터러블 프로토콜을 준수한 객체

- 이터러블을 [for...of], [전개 연산자], [비구조화] ..등, 이터러블이나 이터레이터 프로토콜을 따르는 연산자들과 함께 동작하도록 하는 약속된 규약을 의미한다.

- 이터러블 규약을 따르는 객체

- 이터레이터를 리턴하는 [Symbol.iterator]() 메서드를 가진 객체

- 이터러블인 배열의 경우(위 캡쳐) → [Symbol.iterator]()를 가진다.

```jsx
const arr = [1, 2, 3]; // arr는 그냥 평범한 배열

const iter = arr[Symbol.iterator]();
/*
 문법 파헤치기 : key값을 문자열이 아닌 변수로 주기위해 arr[변수] 형태를 가진다.
 위 사진에서 보듯이, Symbol.iterator 라는 key값을 가지고 value는 함수이다.
 이를 접근해서 함수실행() 시키면 이터레이터 객체가 반환되어 iter에 담기게 된다.
*/

iter.next(); // {value:1,done: false}
iter.next(); // {value:2, done: false},
iter.next(); // {value:3, done: false}
iter.next(); // {value: undefined, done: true}
```

## 이터레이터

{value : 값 , done : true/false} 형태의 이터레이터 객체를 리턴하는 next() 메서드를 가진 객체.

next 메서드로 순환 할 수 있는 객체다. [Symbol.iterator]() 안에 정의 되어있다.

## 이터러블이 아닌 객체를 이터러블 객체로 만드는 과정

이터러블 객체의 경우는 [Symbol.iterator]()가 존재한다.

```jsx
let range = {
  // 1) 객체 생성
  from: 1,
  to: 5,
};

range[Symbol.iterator] = function () {
  // 2) 새로운 키:밸류 를 추가한다. 키는 변수형태, 밸류는 함수이다.

  return {
    // 객체를 리턴한다. 그런데 좀 특벽할 형태의 객체
    current: this.from,
    last: this.to,

    next() {
      // 3) next() 정의
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
        // 4) {value : 값 , done : true/false} 형태의 이터레이터 객체를 리턴합니다.
      } else {
        return { done: true };
      }
    },
  };
};
```

```jsx
const obj = { a: 1, b: 2 };

console.log(Symbol.iterrator in obj);

// 이터러블이 아닌 일반객체는 for...of 문으로 순회할 수 없다.
for (const item of obj) {
  console.log(item);
}
```

이터러블의 Symbol.iterator 메서드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다.

이터러블의 Symbol.iterator 메서드가 반환한 이터레이터는 next 메서드를 갖는다.

```jsx
const array = [1, 2, 3];

const iterator = array.[Symbol.iterator]();

console.log(iterator.next()); // { vaule: 1, done: false }
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next()); // { vaule: undefined, done: true }
```

### for…in

[[Enumerable]]의 값이 true인 프로퍼티를 순회

### for…of

이터레이터의 next 메서드를 호출

done값이 false면 순회를 계속하고 true면 중단한다.

### 유사 배열 객체

배열처럼 인덱스로 프로퍼티 값에 접근

length 프로프터를 가진다.

이터러블이 아닌 일반객체이다.

- for … of 문으로 순회 불가

```jsx
const arrayLike = {
  0: 1,
  1: 2,
  2: 3,
  length: 3,
};

const arr = Array.from(arrayLike);
```

### arguments, NodeList, HTMLCollection

유사 배열 객체이면서 이터러블

ES6부터 이터러블이 도입되면서 위 객체 메서드에 Symbol.iterator가 구현

모든 유사배열 객체가 이터러블인것은 아니다 !

### 이터레이션 프로토콜의 중요성

배열, 문자열, 유사배열 객체 등다양한 데이터구조들이 for, for…in문, foreach문 등 다양한 방법으로 순회

비효율적

책 설명

데이터 구조는 이터레이션 프로토콜을 준수하도록 규정하고, 구현에서는 이터레이션 프로토콜을 지원하도록 한다.

즉, 이터레이션 프로토콜은 다양한 데이터 공급자가 하나의 순회방식을 갖도록 규정하여 데이터 소비자가 효율적으로 다양한 데이터 공급자를 사용할 수 있도록 데이터 소비자와 데이터 공급자를 연결하는 인터페이스 역할

정리하면

여러 데이터구조가 있고, 여러 순회방법들이 각각의 데이터 구조마다 존재한다.

이렇게 매번 다른 데이터 구조마다 다른 순회방법을 구현하는것은 비효율적

하나의 통일화된 인터페이스 → 이터레이션 프로토콜

### 사용자 정의 이터러블

이터레이션 프로토콜을 준수해야하므로 Symbol.iterator 메서드를 구현

next 메서드를 갖는 이터레이터를 반환하도록 구현

```jsx
const fibonacci = {
  [Symbol.iterator]() {
    let [pre, cur] = [0, 1];
    const max = 10;

    return {
      next() {
        [pre, cur] = [scur, pre + cur];
        return { value: cur, done: cur >= max };
      },
    };
  },
};
```

### 이터러블이면서 이터레이터인 객체

```jsx
const fiboFunc = function (max) {
  let [pre, cur] = [0, 1];
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      [pre, cur] = [scur, pre + cur];
      return { value: cur, done: cur >= max };
    },
  };
};

// 이터러블이면서 이터레이터이다
const iter = fiboFunc(10);

// 이터러블이므로 순회가능
for (const num of iter) {
  console.log(num);
}

// 이터레이터이므로 next 메소드 사용가능
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
```
