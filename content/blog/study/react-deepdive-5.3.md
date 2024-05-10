---
title: "[React] 상태 관리 라이브러리 Recoil, Jotai, Zustand 살펴보기"
date: "2024-05-09"
description: "모던 리액트 Deep Dive 5.3"
tags: [Study]
# thumbnail: /thumbnails/hello-world.jpg
# order: 2
---

## Recoil

- 페이스북에서 만든 상태 관리 라이브러리
  - 리액트에 최적화가 잘되어있다.
- Atom이라는 상태단위를 처음으로 선보였다.
  - 처음으로 → Jotai에서도 영감을 받아 Atom이라는 것을 사용한다.
- 배포 버전이 1.0.0이 되지 않았다.
  - 이는 정식버전 배포전이므로 마이너 버전의 변경에 따라 호환성이 깨지는 위험이 있음을 뜻한다.
  - 리액트 18에서 지원하는 기능을 포함하면 1.0.0으로 업그레이드하겠다고 밝힌바있다.
- 이 책의 쓰여진 시기는 22년 9월
  - 리액트 18의 출시일은 22년 3월
  - 24년 5월기준 Recoil의 마지막 릴리즈는 23년 4월, 버전은 0.77

### Recoil에 대한 4가지 핵심 키워드

- RecoilRoot
- atom
- useRecoilValue
- useRecoilState

### RecoilRoot

Recoil을 사용하기 위해 반드시 선언되어야한다.

RecoilRoot를 애플리케이션 최상단에 선언해둬야한다.

Recoil에서 생성되는 상태값을 저장하기 위한 스토어를 생성한다.

```jsx
export default function App() {
  return <RecoilRoot> {/* 프로젝트 코드 */} </RecoilRoot>;
}
```

감싸고 있는 영역에서만 스토어에 접근할수 있어 스토어에 저장된 상태를 공유한다.

상태가 변할때 이를 감지하여 하위 컴포넌트에 전파한다.

**한가지 특징**은 내부 상태들은 전부 ref로 선언되어있어 값이 변하더라도 렌더링이 자동으로 발생하지는 않으며 변했는지를 감지하여 수동으로? 명시적으로? 렌더링을 발생시킨다.

### atom

상태를 나타내는 Recoil의 최소 상태 단위

```jsx
const statemenetsAtom =
  atom <
  string >
  {
    key: "myState",
    default: "initValue",
  };
```

key값은 필수로 가진다.

- 이는 다른 atom과 구별하는 식별자 역할을 한다. → 유일한 값이어야하고 개발자가 직접 입력한다.
- default에 초기값을 넣어준다.
- 원시타입이 아닌 변수들도 가능하다.

### useRecoilValue

atom의 값을 읽어오는 훅

```jsx
const myState = useRecoilValue(statemenetsAtom);
```

신기한 패턴

```jsx
const [, forceUpdate] = useState([]);
```

- recoilValue가 변경되었을때 내부에서 선언된 forceUpdate를 호출하여 강제로 렌더링을 일으킨다.
- forceUpdate는 렌더링을 강제로 실행시키기 위한 함수
- 즉 내부에서 불필요하게 렌더링되는 것을 막고 필요시에 알아서 렌더링을 시켜준다.

### useRecoilState

useState와 비슷하게 현재 값을 가져오고 값을 변화시키는 setState함수를 가지고 있다.

```jsx
function useRecoilState<T>(recoilState: RecoilState<T>)
...
	return [useRecoilValue(recoilState), useSetRecoilState(recoilState)]
}
```

즉 atom의 값을 읽어오는 훅인 useRecoilValue을 내부에 포함하고 있으며

useSetRecoilState도 있는것으로 보아 상태만 호출하는 useRecoilValue 외에도

상태 변경시키는 함수만 호출하는 useSetRecoilState를 불러올 수 있는것으로 확인됨

값을 변화시킬수 있는 함수인 useSetRecoilState의 경우는

```jsx
function useSetRecoilState<T>(recoilState: RecoilState<T>)
...
	const storeRef = useStoreRef();
	...
		setRecoilValue(...)

```

내부에 스토어를 가져온다음에 setRecoilValue를 통해 값을 업데이트 하고 있다.

### 예제코드

```jsx
// app.js

import { RecoilRoot } from "recoil";

import "./App.css";
import Counter from "./Counter";

function App() {
  return (
    <RecoilRoot>
      <Counter />
    </RecoilRoot>
  );
}

export default App;
```

가장 최상단에 RecoilRoot를 선언해준다.

```jsx
// atom.js

import { atom } from "recoil";

let countState = atom({
  key: "counter",
  default: 0,
});

export default countState;
```

atom파일을 선언하여 그 안에 키값과 초기값을 선언한다.

```jsx
// Counter.js

import React from 'react';
import { useRecoilState,
  useRecoilValue,
  useResetRecoilState
  useSetRecoilState,
} from 'recoil';

import countState from './Atoms';

function Counter() {
  const [counter, setCounter] = useRecoilState(countState);
  // useState와 같지만, useRecoilState을 사용하여 다른 파일에 있는 아톰을 읽을 수 있다.
  const currentCount = useRecoilValue(countState);  // Getter
  const counterHandler = useSetRecoilState(countState); // Setter
  const resetCounter = useResetRecoilState(countState); // 초기값으로 변경

  const plusCount = () => {
    counterHandler((pre) => pre + 1);
  };
  const minusCount = () => {
    counterHandler((pre) => pre - 1);
  };

return (
    <div>
     <div>
      <div>{counter}</div>
      <div>{currentCount}</div>
      {/* counter와 currentCount는 동일한 값을 나타낸다. (내부 구현 로직이 동일하다.) */}

      <button onClick={plusCount}>+</button>
      <button onClick={() => { setCounter((pre) => pre + 1); }}>+</button>
      {/* 위 두개 역시 동일한 결과를 나타내고 내부 구현 로직 역시 동일하다. */}

      <button onClick={resetCounter}>reset</button>
    </div>
  );
}

export default Counter;
```

실제로 실행하는 파일내부에서는 atom파일에서 선언한 상태 객체를 불러와서

필요에 맞게 useRecoilValue, useSetRecoilState, useRecoilState 등을 호출하여 사용한다.

### selector

```jsx
const isBiggerThan10 = selector({
  key: "above10State",
  get: ({ get }) => {
    return get(countState) >= 10;
  },
});
```

기존에 선언된 atom을 이용하여 새로운 상태를 선언할 수 있는데

이럴때는 atom이 아니라 selector라는 함수를 사용해야한다.

## Jotai

- Recoil의 영향을 받았다.
  - 그래서 단점을 보완했다
  - atom을 그대로 사용한다.
- 리액트 Context의 문제점인 불필요한 리렌더링 문제를 해결했다.
  - 메모이제이션이나 최적화를 거치지 않아도 리렌더링이 발생되지 않도록 설계되어 있다.
- 24년 5월기준 2.8.0까지 나온상태고 마지막 릴리즈는 24년 4월 8일

(최상단에 스토어에 있는 상태를 공유할 영역에 프로바이더를 선언해줘야하는 것은 동일하다)

### atom

recoil과 달리 key값을 설정하지 않아도된다.

```jsx
const counterAtom = atom(0); // 0은 초기값

console.log(counterAtom);
/*
	{
		init: 0,
		read: (get) => get(config),
		write: (get, set, update) =>
			set(config, typeof update === 'function' ? update(get(config)):update)
			
			// 업데이트에 함수가 들어가면 현재 값을 함수에 입력하고 값이 들어가면 그 값으로 바꾼다.
	}
*/
```

보면 내부에는 초기값과 읽는함수, 쓰는함수만 있을뿐 현재값을 저장하고 있지않다.

### useAtomValue

```jsx
export function useAtomValue<Value>
...
	const getAtomValue =
	...
		const atomState = store[READ_ATOM](atom, version)
```

1. atom의 값은 store에 존재한다.
2. key값이 필요하지 않은 이유는 store에서 atom끼리의 구분을 하는 식별자를 atom자체를 이용했다.
   1. 객체의 키값으로 객체를 이용할수 있는 방식을 활용했다.

### useAtom

useState와 동일한 형태로 리턴하여 값과 값을 업데이트할 수 있는 함수를 반환한다.

```jsx
const [count, setCount] = useAtom(counterState);
```

useAtomValue를 통해 값만 추출할수 있다.

### 특징

- Recoil에 비해
  - key값을 입력하지 않아도돼서 편리하다
  - 기존 atom을 이용하여 새로운 atom을 선언하려면 selector라는 새로운 함수를 사용했어야하는데 jotai는 그대로 atom을 사용해도된다.
  ```jsx
  const isBiggerThan10 = atom((get) => get(counterState) > 10);
  ```

## Zustand

- 리덕스의 영향을 받았다.
  - atom이라는 개념이 없다.
  - 하나의 스토어를 중앙집중형으로 활용한다.
- partial과 replace로 나뉘어져있어서 부분변경과 전체변경을 나누어 사용가능하다.
- 구현코드를 살펴보면
  - import가 전혀없다. → 리액트에 종속되어있지 않다. but 리액트 버전도 따로있다.
  - export는 createStore 단하나이다.

```jsx
// store.js

const useCounterStore = create<number>((set) => ({
	count: 0,
	inc: () => set((state) => ({ count: state.count + 1 })),
	dec: () => set((state) => ({ count: state.count - 1 })),
})
```

```jsx
const { count } = useCounterStore();
```

```jsx
const { count, inc } = useCounterStore();
```

```jsx
const { inc, dec } = useCounterStore();
```

필요한 것만 꺼내 쓸 수 있다.

### 특징

- 사용하기에 굉장히 간단함
- Context API + useReducer 대용으로 사용이 가능하다
- 최상단에 프로바이더로 감싸지 않아도 된다.
- devTool을 이용해서 현재 전역에서 사용하는 상태의 정보를 확인가능하다
  - 리액트쿼리의 캐시 확인과 비슷
  - [devTool 참고자료](https://velog.io/@real-bird/Zustand-%EA%B3%B5%EC%8B%9D-%EB%AC%B8%EC%84%9C%EB%A7%8C-%EB%B3%B4%EA%B3%A0-Zustand-%EC%A0%81%EC%9A%A9%ED%95%B4-%EB%B3%B4%EA%B8%B0#4-1-devtools)
