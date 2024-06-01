![Comatching Logo](https://i.imgur.com/8f9mrrI.png)

<p align="center">
  <strong>학교에서 나랑 맞는 사람을 쉽게 만나볼 수는 없을까?</strong><br>
  <strong>Comatching은 내가 직접 상대의 MBTI를 고를 수 있어 더 다양하고 쉬운 커플 매칭 서비스를 제공합니다.</strong><br>
  <strong>Comatching에서 새로운 인연을 만나보세요!</strong>
</p>

## 목차

- [프론트 회고록](#프론트-회로록)
- [개요](#개요)
- [서비스 설명](#서비스-설명)
- [페이지 설명](#페이지-설명)

## 프론트 회고록

저번년도 서비스 이후 여러가지 기능들을 추가하여 아우름제 기간동안(2024.05.23~24) 서비스 하였습니다.
추가된 기능으로는 OAuth 2.0도입, 입력 정보 추가(취미, 연락빈도), QR코드 제작 및 인식, AI를 활용한 매칭, 매칭 후 평가하기입니다.
서비스를 개발하다보니 개발 예상 시간보다 오래걸려 첫쨋날 제대로 서비스하지 못하였습니다 하지만 즉각적인 대응을 통해 백엔드와 AI의 뽑기 로직을 수정하여 2일차에 정상적으로 서비스를 진행하였습니다. 총 795명의 사용자를 받아서 서비스 완료하였습니다. 부족한 부분들을 느꼇기에 2학기 축제에 더 추가하여 서비스 할 계획입니다

- 추가되어야 할 내용들
  이미지 최적화
  React hoc 적용
  컴포넌트화
  클래스명 수정

## 개요

- **프로젝트 이름:** Comatching
- **개발 기간:** 2023.09~2023.11
- **개발 언어:** Java, React
- **멤버:**
<div align="center">
  <table>
    <colgroup>
      <col style="width: 25%;">
      <col style="width: 25%;">
      <col style="width: 25%;">
      <col style="width: 25%;">
    </colgroup>
    <tr>
      <td><img src="https://i.imgur.com/UORdypn.png" height="220" /></td>
      <td><img src="https://i.imgur.com/dqu7lFs.png" height="200" /></td>
      <td><img src="https://i.imgur.com/Iez91Tv.png" width="200" height="200" /></td>
      <td><img src="https://i.imgur.com/pYkotmQ.png" width="200" height="200" /></td>
    </tr>
    <tr>
      <td><strong><span style="font-size: 32pt;">서승준</span></strong><br> - Back-End (Spring)<br> - smdmim@gmail.com<br> - 00.02.29<br> - GitHub: greensnapback0229</td>
      <td><strong><span style="font-size: 32pt;">김규원</span></strong><br> - Front-End (React)<br> - gyuwon05@gmail.com<br> - 00.05.17<br> - GitHub: alpaka206</td>
      <td><strong><span style="font-size: 32pt;">박승원</span></strong><br> - Design (Figma/ CSS)<br> - iswpark99@gmail.com<br> - 99.04.22<br> - GitHub: winterizcoming</td>
      <td><strong><span style="font-size: 32pt;">박상준</span></strong><br> - Design (CSS)<br> - rodonight@gmail.com<br> - 00.03.05<br> - GitHub: Rodonight</td>
    </tr>
  </table>
</div>

## 서비스 설명

<div align="center">
  <table style="width: 80%;">
    <colgroup>
      <col style="width: 33.33%;">
      <col style="width: 33.33%;">
      <col style="width: 33.33%;">
    </colgroup>
    <tr>
      <td><img src="https://i.imgur.com/6YZ5U9X.png" height="300" /></td>
      <td><img src="https://i.imgur.com/DfJSD8G.png" height="300" /></td>
      <td><img src="https://i.imgur.com/Aq2e8T9.png" height="300" /></td>
    </tr>
    <tr>
      <td><strong>시작 화면</strong></td>
      <td><strong>Dashboard</strong></td>
      <td><strong>Result</strong></td>
    </tr>
  </table>
</div>

개인주의가 커져가는 시대에 따라 단체 생활의 빈도가 적어지고, 나와 맞는 사람을 학교 내에서 찾기 점점 어려워지고 있다는 생각에, MBTI를 이용한 랜덤 커플 매칭 서비스가 있었으면 좋겠다는 생각에 Comatching을 개발하게 되었습니다. 9월 가톨릭대학교 다맛제에 이미 시범 운영을 하여 이틀동안 700명이 넘는 이용자를 확보하였으며, 굉장히 뜨거운 반응을 얻었습니다. 좋았던 점, 고쳐야 할 점을 반영하여 시범 운영한 경험을 바탕으로 더욱 기능을 강화하여 버전 2.0을 출시하였습니다.

- **원하는 MBTI를 직접 선택하세요! 😃** <br>
  Comatching과 다른 서비스들과의 차별점은, 본인이 원하는 MBTI를 직접 선택할 수 있다는 것입니다. <br>직관적이고, 간단하게, 본인이 평소 선호하는 MBTI의 이성을 만나보세요! <br><br>
- **무슨 노래 좋아하세요? 🎧**<br>
  노래는 그 사람의 취향과 성격을 나타내기도 합니다. <br>MBTI 만으로 알 수 없는 상대의 성격을 좋아하는 노래로 미리 짐작해보세요! <br><br>
- **SHA-256 해시 함수 암호화로 안전하게! 🔒**<br>
  Comatching은 SHA-256 해시 함수 암호화를 사용하여 여러분의 개인 정보를 안전하게 보관합니다. <br>혹시라도 공격자가 중간에 정보를 탈취하려고 해도 아무 소용 없죠.<br><br>
- **누구나 쉽고 간단하게! 🤗**<br>
  가이드북을 제공하여 누구나 쉽게 이용할 수 있도록 친절하게 설명하고, 직관적으로 디자인하였습니다.<br><br>

## 페이지 설명

<div align="center">
  <table style="width: 80%;">
    <colgroup>
      <col style="width: 20%;">
      <col style="width: 20%;">
      <col style="width: 20%;">
      <col style="width: 20%;">
    </colgroup>
    <tr>
      <td><img src="https://i.imgur.com/6YZ5U9X.png" height="300" /></td>
      <td><img src="https://i.imgur.com/SfoKrRV.png" height="300" /></td>
      <td><img src="https://i.imgur.com/ldEaFWK.png" height="300" /></td>
      <td><img src="https://i.imgur.com/0FQ0qqU.png" height="300" /></td>
    </tr>
    <tr>
      <td><strong>시작 페이지</strong></td>
      <td><strong>Login</strong></td>
      <td><strong>Register</strong></td>
      <td><strong>Form</strong></td>
    </tr>
    <tr>
      <td>비로그인 시 시작 페이지</td>
      <td>로그인 화면</td>
      <td>개인정보 동의 후 로그인</td>
      <td>본인의 MBTI,<br> 좋아하는 노래 입력</td>
    </tr>
  </table>
</div>

<div align="center">
  <table style="width: 80%;">
    <colgroup>
      <col style="width: 20%;">
      <col style="width: 20%;">
      <col style="width: 20%;">
      <col style="width: 20%;">
    </colgroup>
    <tr>
      <td><img src="https://i.imgur.com/DfJSD8G.png" height="300" /></td>
      <td><img src="https://i.imgur.com/WsMvZwl.png" height="300" /></td>
      <td><img src="https://i.imgur.com/Aq2e8T9.png" height="300" /></td>
      <td><img src="https://i.imgur.com/4cd7NQ7.png" height="300" /></td>
    </tr>
    <tr>
      <td><strong>Dashboard</strong></td>
      <td><strong>매칭하기</strong></td>
      <td><strong>결과 창</strong></td>
      <td><strong>조회하기</strong></td>
    </tr>
    <tr>
      <td>로그인 시 시작 페이지</td>
      <td>원하는 MBTI <br> 2개 선택 후 매칭</td>
      <td>결과 확인</td>
      <td>본인이 뽑았던 내역 확인</td>
    </tr>
  </table>
</div>
