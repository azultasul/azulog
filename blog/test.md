---
title: 타이틀
date: date
---

# npx create-next-app my
---

`npx create-next-app my-app`을 사용하면 기본으로 설정된 dependencies가 자동으로 설치된다. 하지만 타입스크립트, 절대경로 등 프로젝트 생성 후 설정을 추가하거나 파일을 지우고 생성하는 등 추가 과정이 필요하다. 나는 그 과정을 거치는 것 보다 처음부터 원하는 설정을 하는 것을 선호한다.

# npx create-next-app@latest
---

`npx create-next-app@latest`로 프로젝트를 생성하면 순서대로 *project name, TypeScript, ESLint, ‘src/’ directory, experimental ‘app/’ directory, import alias*을 사용할 것인지 묻는다. 나는 아래처럼 설정했다. 

![스크린샷 2023-03-08 오전 10.43.24.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/eed35617-e37f-4b21-96a4-f9a3cbf88ff7/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-03-08_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_10.43.24.png)

## 📍 ESLint

*ES(Ecma Script) + Lint*

자바스크립트 문법의 에러를 표시해주는 도구다. 에러의 기준을 직접 설정할 수 있고 tab 칸 수, `;`여부 등 협업 시 코딩 컨벤션을 정해 설정할 수도 있다. 

## 📍 ‘src/’ directory

‘src/’ 디렉토리는 취향 차이로 사용 여부를 판단하면 좋을 것 같다. `src/pages`를 사용해도 `pages`를 루트에 두는 것과 동일하다. 나는 폴더 구조를 깔끔하게 하기 위해 api, components, pages, utils 등을 src 하위로 넣어주려고 사용했다.

## 📍 experimental ‘app/’ directory

 버전 13에서 새로 추가된 개념으로 아직은 베타 버전으로 지원된다. 현재 Next.js는 ‘pages/’ 하위의 구조를 기반으로 라우팅하는 방식이다. 이 방식을 좀 더 향상시키는 것이 ‘app/’ 디렉토리인 것 같다. 자세한 건 잘 모르겠지만… 공식문서를 보면 아래처럼 설명 되어있다.

> ‘app/’ 디렉토리는 layouts, nested routes를 지원하고 Server Components를 기본으로 사용한다. ‘app/’ 안에서, 레이아웃 내부의 전체 애플리케이션에 대한 fetch 데이터를 가져올 수 있다.
> 

나는 Next.js가 처음이고 내 개인 페이지를 만드는데 베타 버전은 조금 모험인 것 같아서 사용하지 않았다. ‘app/’ 디렉토리에 대해 따로 알아보고 시도해봐야 겠다.

## 📍 import alias

절대경로 설정으로, 프로젝트 생성 중 설정하지 못했다면 `jsconfig.json`파일에 아래처럼 추가하면된다. import할 때 `./src/`기준으로 `~/name` 방식으로 경로를 넣어주면 된다.


```jsx
{
  "compilerOptions": {
    "paths": {
      "~/*": ["./src/*"]
    }
		// 또는 아래. 프로젝트 폴더 구조에 맞게 원하는 값으로 설정하면 된다. 
    "paths": {
      "@/*": ["/*"]
    },
  }
}
```