---
title: "[React study] 서버사이드 렌더링을 위한 리액트 API 살펴보기"
date: 2024-04-24
description: "[2024-04-24] 모던 리액트 Deep Dive 4.2"
tags: [React, Study]
# thumbnail: /thumbnails/hello-world.jpg
# order: 2
---

## 리액트에서 제공하는 서버에서 렌더링하는 API

`react-dom/server.js` 에서 제공한다.

```jsx
// 17.0.2

// react/packages/react-dom/server.node.js

export {
  renderToString,
  renderToStaticMarkup,
  renderToNodeStream,
  renderToStaticNodeStream,
  version,
} from "./src/server/ReactDOMServerNode";
```

책에서 말하는 함수는 예전버전인거 같고 가장 최신 [24.04.24 기준] 18.2.0 버전에서는 살짝 달라졌다.

```jsx
// 18.2.0

// react/packages/react-dom/server.node.js

import ReactVersion from "shared/ReactVersion";
export { ReactVersion as version };

export function renderToString() {
  return require("./src/server/ReactDOMLegacyServerNode").renderToString.apply(
    this,
    arguments
  );
}

export function renderToStaticMarkup() {
  return require("./src/server/ReactDOMLegacyServerNode").renderToStaticMarkup.apply(
    this,
    arguments
  );
}

export function renderToPipeableStream() {
  return require("./src/server/react-dom-server.node").renderToPipeableStream.apply(
    this,
    arguments
  );
}

export function resumeToPipeableStream() {
  return require("./src/server/react-dom-server.node").resumeToPipeableStream.apply(
    this,
    arguments
  );
}
```

## <span style="color:orange">renderToString</span>

인수로 넘겨받은 리액트 컴포넌트를 렌더링해 HTML 문자열로 반환하는 함수

최초의 페이지를 HTML로 먼저 렌더링

```jsx
import ReactDOMServer from 'react-dom/server'

function ChildrenComponent({ fruits }: { fruits: Array<string> }) {
	useEffect(()=>{
		console.log(fruits)
	},[fruits])

	const handleClick = () => {
		console.log('click')
	}

	return (
		<ul>
			{fruits.map((fruit)=>(
				<li key={fruit} onClick={handelClick}>
					{fruit}
				</li>
			))}
		</ul>
	)
}

function SampleComponent() {
	return (
		<>
			<div>hello</div>
			<ChildrenComponent fruits={['apple','banana','orange']} />
		</>
	)
}

const result = ReactDOMServer.renderToString(
	React.createElement('div', { id: 'root }, <SampleComponent /> ),
)
```

```jsx
// result

<div id="root" data-reactroot="">
  <div>hello</div>
  <ul>
    <li>apple</li>
    <li>banana</li>
    <li>orange</li>
  </ul>
</div>
```

### 1. useEffect와 같은 훅이나 handleClick과 같은 이벤트 핸들러는 결과물에 포함되지 않았다.

인수로 주어진 리액트 컴포넌트(<SampleComponent />)를 기준으로 빠르게 브라우저가 렌더링할 수 있는 HTML을 제공하는데 목적이 있는 함수

- 즉 클라이언트에서 실행되는 자바스크립트 코드를 포함시키거나 렌더링하는 역할을 해주지는 않는다.

클라이언트에서 실행되지 않고 먼저 완성된 HTML을 서버에서 제공해 줄 수 있으므로 초기 렌더링에서 뛰어난 성능을 보인다.

SEO에서도 유리

### 2. 단순히 빠르게 그려주는 게 목적이다

사용자는 완성된 HTML을 빠르게 볼 수는 있지만 useEffect나 이벤트 핸들러는 포함되어 있지 않으므로 사용자와 인터렉션을 바로 할 수 있는 상태는 아니다.

### 3. 리액트 컴포넌트를 식별한다

data-reactroot 속성을 통해 리액트 컴포넌트의 루트 엘리먼트가 무엇인지 식별한다

이는 다음에 나올 renderToStaticMarkup과 구별되는 특징이다.

## <span style="color:orange">renderToStaticMarkup</span>

renderToString과 같이 HTML 문자열을 만든다.

차이점은 앞서 말한 data-reactroot 와 같은 리액트에서만 사용하는 추가적인 DOM속성을 만들지 않는다.

→ 이는 리액트에서만 사용하는 속성들을 제거하여 결과물 HTML의 크기를 아주 약간이라도 더 줄일수 있다는 장점이 있다.

```jsx
...

const result = ReactDOMServer.renderToStaticMarkup(
	React.createElement('div', { id: 'root }, <SampleComponent /> ),
)
```

```jsx
// result

<div id="root">
  <div>hello</div>
  <ul>
    <li>apple</li>
    <li>banana</li>
    <li>orange</li>
  </ul>
</div>
```

### 1. 이 함수를 사용하여 렌더링하게 될경우 브라우저 API를 절대로 실행할 수 없다.

리액트에서 제공하는 useEffect나 브라우저API를 실행할 수 없다.

결과물은 `hydrate`를 수행하지 않는다는 가정하에 순수한 HTML만 반환하기 때문이다.

### 2. 리액트의 이벤트 리스너가 필요없는 순수한 HTML을 만들때만 사용한다

이는 리액트의 속성을 제거한 결과물을 만드므로 속도나 용량 측면에서 유리하다.

블로그 글이나 상품의 약관 정보같이 아무런 브라우저 액션이 없는 정적인 내용만 필요한 경우에 유용하다.

## <span style="color:orange">renderToNodeStream</span>

### 1. 브라우저에서 사용하는 것이 완전히 불가능

Nodejs 환경에서 사용해야한다.

### 2. 결과물은 Nodejs의 ReadableStream 이다.

스트림은 큰 데이터를 다룰 때 데이터를 청크(chunk, 작은단위)로 분할해 조금씩 가져오는 방식을 의미한다.

→ renderToString을 사용하여 큰 크기의 HTML을 생성한다고 할때 크기가 큰 문자열을 한번에 메모리에 올려두고 응답을 수행해야해서 Nodejs가 실행되는 서버에 큰 부담이 될 수 있다.

스트림을 활용하면 이러한 큰 크기의 데이터를 청크 단위로 분리해 순차적으로 처리할 수 있다는 장점이 있다.

- 응답으로 오는 HTML이 여러 청크로 분리돼 내려온다.
- 대부분의 얼리 알려진 리액트 서버사이드 렌더링 프레임워크는 모두 renderToString 대신 renderToNodeStream을 채택하고 있다.

## <span style="color:orange">renderToStaticNodeStream</span>

renderToString과 renderToStaticMarkup의 차이처럼 리액트 자바스크립트에 필요한 리액트 속성이 제공되지 않는다.

따라서 순수 HTML결과물이 필요할때 사용한다.

## <span style="color:orange">hydrate 란?</span>

renderToString과 renderToNodeStream으로 생성된 HTML 콘텐츠에 자바스크립트 핸들러나 이벤트를 붙이는 역할을 한다.

renderToString의 결과물은 단순히 서버에서 렌더링한 결과물로 사용자에게 무언가 보여줄 수 있지만 사용자가 페이지와 인터렉션을 하는 것은 불가능하다.

이때 hydrate가 정적으로 생산된 HTML에 이벤트와 핸들러를 붙여 완전한 웹페이지 결과물을 만든다.

### VS render

```jsx
import * as ReactDOM from "react-dom";
import App from "./App";

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
```

render 함수는 컴포넌트와 HTML의 요소를 인자로 받는다.

HTML 요소에 해당 컴포넌트를 <span style="color:orange">**렌더링**</span>하며 <span style="color:orange">**이벤트 핸들러를 붙이는 작업**</span>까지 모두 한번에 수행한다.

### hydrate

```jsx
import * as ReactDOM from "react-dom";
import App from "./App";

// containerId란 사전에 서버에서 렌더링된 HTML의 특정위치를 의미한다.
const element = document.getElementById(containerId);

ReactDOM.hydrate(<App />, element);
```

hydrate는 이미 렌더링된 HTML이 있다는 가정하에 작업이 수행된다.

따라서 <span style="color:orange">**이벤트를 붙이는 작업만**</span> 실행한다.

### ! 만약 hydrate에 리액트 관련정보가 없는, renderToStaticMarkup등으로 생성된 HTML을 넘겨주면?

기본적으로 서버에서 넘겨준 HTML이 클라이언트의 결과물과 같을 것이라는 가정하에 실행된다.

경고문을 출력하긴하지만!

정상적으로 웹페이지를 만든다.

이는 hydrate가 단순히 이벤트를 추가하는 것 외에도

<span style="color:orange">렌더링을 한 번 수행하면서 hydrate가 수행한 렌더링 결과물 HTML과 인수로 넘겨받은 HTML을 비교하는 작업도 수행하기 때문이다.</span>

이때 불일치 하게되면 hydrate가 렌더링한 HTML을 기준으로 웹페이지를 그리게 된다.

→ 이렇게 렌더링 시키는게 올바른 사용법은 아니다.

→ 문제1 : 서버에서 한번 클라이언트에서 한번 총 두번 렌더링을 하게 된다.

→ 문제2 : 서버에서 빠르게 렌더링해서 보여주는 서버사이드 렌더링의 장점을 포기하는 것

### ! 그렇다면? 호출할때마다 달라지는 api의 경우, 계속 불일치한다고 판단하는가?

이 부분에서는 프레임워크마다 문제를 해결하는 방식이 다르다.

Nextjs의 경우 getServerSideProps라는 예약함수에서 한번만 호출한다.

그리고 이 결과를 HTML에 포함시킨다.

### 불가피한 경우

```jsx
<div>{new Date().getTime()}</div>
```

위와 같이 코드 수행하는 과정에서 시간이 흘러 서버와 클라이언트 차이가 발생한다.

이때는 suppressHydrationWarning을 추가해 경고를 끌 수 있다.

```jsx
<div suppressHydrationWarning>{new Date().getTime()}</div>
```

권장하지 않는 방법이며, useEffect등을 통해 클라이언트 로직상 변경하는 것이 좋다.

### 리액트의 서버사이드 렌더링 방식은 프레임워크를 이용할것

리액트 팀 또한 리액트 서버사이드 렌더링을 직접 구현해 사용하기보다는 Nextjs와 같은 프레임워크 사용을 권장

## <span style="color:orange">정리</span>

> 1.  리액트에서 제공하는 서버에서 렌더링하는 API 4가지 함수
>
> - renderToString, renderToStaticMarkup, renderToNodeStream, renderToStaticNodeStream
> - 순수한 HTML만 반환하는지 아닌지, 한번에 리턴하는지 나눠 리턴이 가능한지에 따라 나눌 수 있다.
>
> 2.  render는 렌더링과 이벤트 핸들러를 붙이는 작업까지 모두 수행하고 hydrate는 이벤트를 붙이는 작업만 수행한다.
>
> 3.  hydrate는 서버에서 넘겨준 HTML과 클라이언트에서 렌더링한것을 비교하여 다를 경우 클라이언트 기준으로 웹페이지를 그린다.
>
> 4.  리액트의 서버사이드 렌더링은 프레임워크를 이용하자!
