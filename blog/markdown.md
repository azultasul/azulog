---
title: 마크다운
date: date
---
# 마크다운 예제

::: warning 주의하세요!
마크다운 문법은 표준이 없습니다.  
기본적인 사용법은 크게 다르지 않지만, 마크다운을 해석하는 도구에 따라 결과가 다르게 보여질 수 있습니다.  
여기서는 marked.js를 기준으로 설명합니다.
:::  
## 제목(Heading)
> **출력**  
> # h1 Heading
> ## h2 Heading
> ### h3 Heading
> #### h4 Heading
> ##### h5 Heading
> ###### h6 Heading  
## 구문 장식
> **출력**  
> **강조** __강조__  
> *이택릭* _이탤릭_  
> ~~취소선~~  
> 인라인 `코드`  
## 링크(Link)
> **출력**  
> 1. [내부 링크](/guide/)
> 2. [내부 링크](/guide/footer/index.html)
> 3. [외부 링크](https://www.google.com)  
## 이미지(Image)
> **출력**  
> ![대체 텍스트](https://media.giphy.com/media/pO4UHglOY2vII/giphy.gif)  
> ![대체 텍스트](https://media.giphy.com/media/2RF2GfrnbPdXa/giphy.gif "타이틀")  
> <img src="https://media.giphy.com/media/AMqCTHuCMFpM4/giphy.gif" alt="대체 텍스트" width="400px" />  
## 가로 구분선(Horizontal Rule)
> **출력**  
> 텍스트
> 
> ---
> 텍스트
> ___
> 텍스트
> ***
> 텍스트
::: info
`---`의 경우 줄바꿈을 추가하지 않은 상태에서 사용하면 구분선이 아닌 위 문자열을 `제목(h2)`으로 출력합니다.  
비슷한 예로 `===`는 단독으로 사용해도 구분선이 출력되진 않지만, 마찬가지로 줄바꿈을 추가하지 않은 상태로 사용하면 위 문자열을 `제목(h1)`으로 출력합니다.
:::  

## 그룹핑  
### 코드 블럭(Code Blocks)
> **출력**  
> ```
> markdown: {
>   lineNumbers: true
> }
> ```  
### 문법 강조(Syntax Highlighting)
> **출력**  
> ```js
> let foo = 'bar'
> console.log(foo)
> // bar
> ```  
### 경고(Alert)
> **출력**  
> ::: info
> 알아두면 유용합니다.  
> 수고하세요.
> :::
> 
> ::: warning
> 눈 뜨고 코 베입니다.  
> 조심하세요.
> :::
> 
> ::: danger
> 이불 밖은 위험합니다.  
> 나가지 마세요.
> :::
> 
> ::: success
> 당첨을 축하드립니다.  
> 이 메시지는 영국에서 최초로 시작되어 일년에 한바퀴를 돌면서...
> :::
> 
> ::: success (경)당첨(축)
> 당첨을 축하드립니다.  
> 이 메시지는 영국에서 최초로 시작되어 일년에 한바퀴를 돌면서...
> :::  
### 불릿(Bullet)
> **출력**  
> - 첫번째
>   - 두번째
>     - 세번째
> 
> * 첫번째
>   + 두번째
>     - 세번째  
### 목록(Lists)
> **출력**  
> 1. 첫번째
>    1. 일번
>    2. 이번
> 2. 두번째
> 3. 세번째
::: info
들여쓰기의 경우 불릿과는 달리 공백 2칸이 아닌 3칸을 사용합니다.
:::
  
### 작업 목록(Task List)
> **출력**  
> - [ ] 간지나게 자기
> - [x] 작살나게 밥먹기  
### 인용(Blockquotes)
> **출력**  
>> 인용<br>
>> 인용
>>> 인용 내의 인용
>> 
>> 인용
::: info
인용의 경우 공백 2칸과 줄바꿈을 적용했을 때 기대한 것과 다르게 출력되는 경우가 많습니다.  
이 경우 `<br>` 태그 사용도 고려해 보시기 바랍니다.
:::
  
## 기타  
### 테이블(Tables)
> **출력**
> 
> | Number | Description |
> | ------ | ----------- |
> | 1      | Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod |
> | 2      | tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam |
> | 3      | quis nostrud exercitation ullamco |
> 
> 정렬
> 
> | Number | Description |
> | :----: | -----------:|
> | 1      | Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod |
> | 2      | tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam |
> | 3      | quis nostrud exercitation ullamco |  
### 줄 바꿈(Line Breaks)
> **출력**  <br>
> 줄 바꿈이
> 적용되지 않습니다.  
> 줄 바꿈이 필요한 라인의 뒤에 공백 2칸을 추가해주세요.    
> 이렇게.  
### 인라인 HTML(Inline HTML)
> **출력**  
> 맥의 잠금 화면 단축키는 <kbd>⌃</kbd> + <kbd>⌘</kbd> + <kbd>Q</kbd>입니다.  
### 주석(Comments)
> **출력**  
> 이 것은 주석이 아닙니다.
> 
> [//]: # "주석입니다."