---
title: "[Javascript] 디스트럭처링 할당"
date: "2024-02-19"
description: "모던 자바스크립트 Deep Dive 36"
tags: [study]
hashtags: [javascript, destructuring, object, array]
# thumbnail: /thumbnails/hello-world.jpg
# order: 32
---

> ### [공부자료 : 모던 자바스크립트 Deep Dive - 이웅모](https://poiemaweb.com/)
>
> 주 1회, 진도를 정해서 그룹 스터디를 진행했습니다.
>
> 책을 기반하여 제가 이해하기 쉽게 정리했습니다.
>
> 진행날짜 : 2024-02-19

## 디스트럭처링 할당 (구조 분해 할당)

구조 분해 할당이란

구도화된 배열과 같은 이터러블 또는 객체를 비구조화, 파괴하여 1개 이상의 변수에 개별적으로 할당하는 것을 말한다.

필요한 값만 추출하여 변수에 할당할 때 유용하다.

## 배열 디스트럭처링 할당

### 선언과 할당을 분리 할 수 있다

하지만 const 키워드로 변수를 선언할 수 없으므로 권장하지 않는다.

```jsx
let x, y;

[x, y] = [1, 2];
```

### 순서대로 할당되고, 반드시 개수가 일치하지 않아도 된다

할당하는 쪽의 개수가 더 많으면 무시되고

할당받는 쪽의 개수가 더 많으면 undefined가 된다.

```jsx
const [a, b] = [1, 2, 3];

console.log(a, b); // 1 2

const [a, b, c] = [1];

console.log(a, b, c); // 1 undefined unedfined
```

### 기본 값 지정이 가능하다

```jsx
const [a, b = 3] = [2, 10];

console.log(a, b); // 2 10
```

### 명시적으로 작성하기에 좋다

인덱스를 이용하기보다 그 값이 가리키는 것을 명시적으로 할 수 있다.

```jsx
const today = "2024-02-19-MON";

// good
const [year, month] = today.split("-");

console.log(`${month}.${year}`); // 02.2024

// bad

console.log(`${today.split("-")[1]}.${today.split("-")[0]}`); // 02.2024
```

### 필요한 값만 뽑아서 사용하기에 좋다

```jsx
const today = "2024-02-19-MON";

const [, month, day] = today.split("-");

console.log(`${month}월 ${day}일`); // 02월 19일
```

### Rest 요소를 사용할 수 있다

```jsx
const [one, ...rest] = [1, 2, 3, 4, 5];

console.log(one, rest); // 1 [2, 3, 4, 5]
```

## 객체 디스트럭처링 할당

### 객체에 대한 간단한 퀴즈

```jsx
const userA = { name: "John", profile: { email: "john@email.com" } };
const userB = { ...userA };

userA.name = "Paul";
userA.profile.email = "paul@email.com";

console.log(userB); // ?

/*

1. { name: "John", profile: { email: "john@email.com" }

2. { name: "John", profile: { email: "paul@email.com" }

3. { name: "Paul", profile: { email: "john@email.com" }

4. { name: "Paul", profile: { email: "paul@email.com" }

*/
```

> 답 2. { name: "John", profile: { email: "paul@email.com" }
>
> name 값은 값으로 복사되고
>
> profile이 가르키는 객체의 경우는 참조되는 것으로 복사된다.
>
> 따라서 userA가 바뀔때 userB는,
>
> 값을 복사한 name은 안 바뀌고 email은 바뀌게 된다.
>
> 이것은 const로 선언한 객체의 속성을 바꿀 수 있는 이유와 동일하다.
>
> 어떤 객체를 참조하는지는 변하지 않지만 안에 내용은 바뀔수 있는것에 대해 const가 보장해주지않는다.

> 위 코드에서 userB에 영향을 주지 않고 userA를 변경하고자 한다면
>
> `userA.profile = { email: "paul@email.com" }`

### 객체도 구조분해할당이 가능하다

```jsx
// 배열의 구조분해할당은 순서가 중요했지만, 객체는 프로퍼티 키가 중요하다.

const { name, age } = { age: 14, name: "seung1" };

// 위 표현은 아래 표현과 동치이며 축약 표현이다.

const { name: name, age: age } = { age: 14, name: "seung1" };
```

### 다른 이름으로 할당이 가능하고, 기본값 지정도 가능하다

```jsx
const { name: myName = "user", age: age } = { age: 14, name: "seung1" };
```

### 객체 배열인 경우, 배열 구조분해할당과 객체 구조분해할당을 혼용할 수 있다

```jsx
const todos = [
  { id: 1, completed: false },
  { id: 2, completed: true },
  { id: 3, completed: false },
];

const [, { id }] = todos;

console.log(id); // 2
```

### 객체 배열인 경우, 배열 구조분해할당과 객체 구조분해할당과 다른값으로 지정하며 기본값 설정까지

```jsx
const todos = [
  { id: 1, completed: false },
  { id: 2, completed: true },
  { id: 3, completed: false },
];

const [, { id: myId = 13 }] = todos;

console.log(myId); // 2
```

> 위 코드에서 myId가 2가 나오는 이유
>
> 우선 객체 배열에서 두번째 객체가 선택된다.
>
> 이때 id를 myId라는 다른 이름으로 변경하였다.
>
> 기본값은 13인데 값이 2이므로 기본값은 적용되지 않고 2가 된다.

### 객체 구조분해 할당 이해 퀴즈

```jsx
const myProfile = {
  name: "seung1",
  age: 24,
  todos: [
    { id: 1, completed: true },
    { id: 2, completed: true },
    { id: 3, completed: false },
  ],
};

// 1번 문제
const {
  todos: [, { id = 0 } = { id: 14 }],
} = myProfile;

console.log(id); // ?

// 2번 문제
const {
  todos: [, my = { id: 14 }],
} = myProfile;

console.log(my.completed); // ?
```

> 1번: 2
>
> 배열의 두번째 원소에 객체의 기본값과 id의 기본값이 모두 적용되었다.
>
> 하지만 두번째 객체가 있으므로 객체 기본값은 적용이 안되고 id값도 있어서 적용이 안된다.
>
> 따라서 주어진 값인 2만 적용된다.

> 2번: true
>
> 1번과 동일하게 기본값은 적용되지 않고 주어진 값인 true가 출력된다.

```jsx
const myProfile = {
  name: "seung1",
  age: 24,
  todos: [{ completed: true }, { completed: true }, { completed: false }],
};

// 1번 문제
const {
  todos: [, { id = 0 } = { id: 14 }],
} = myProfile;

console.log(id); // ?

// 2번 문제
const {
  todos: [, my = { id: 14 }],
} = myProfile;

console.log(my.id); // ?
```

> 1번: 0
>
> 객체의 기본값은 적용이 안되고 id값은 주어지지 않았으므로 기본값인 0이 적용된다.

> 2번: undefined
>
> 1번과 마찬가지로 객체의 기본값이 적용이 안되고 주어진 값에는 id값이 없으므로 undefined가 된다.

## 적용

### 사용자의 투두 리스트를 출력함에 있어 오류가 없게 하는 방법

```jsx
const myProfile = {
  name: "seung1",
  age: 24,
  todos: [{ completed: true }, { id: 2 }, { completed: false }],
};
```

### 구조분해할당을 알기전 나

map과 ||를 적극적으로 활용하였다.

```jsx
myProfile.todos.map((todo) => {
  const defaultTodo = {
    id: todo?.id || 0,
    completed: todo?.completed || false,
  };

  console.log(defaultTodo.id, defaultTodo.completed);
});
```

### 구조분해 할당을 알고 달라진 나

구조분해 할당을 사용하니 이해하기 쉬운 코드가 되었다.

```jsx
const { todos: todoList } = myProfile;

todoList.forEach(({ id = 0, completed = false }) => {
  console.log(id, completed);
});
```
