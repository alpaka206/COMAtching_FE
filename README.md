![Comatching Logo](https://i.imgur.com/8f9mrrI.png)

<p align="center">
  <strong>학교에서 나랑 맞는 사람을 쉽게 만나볼 수는 없을까?</strong><br>
  <strong>Comatching은 내가 직접 상대의 MBTI를 고를 수 있어 더 다양하고 쉬운 커플 매칭 서비스를 제공합니다.</strong><br>
  <strong>Comatching에서 새로운 인연을 만나보세요!</strong>
</p>

## 목차

- [프론트엔드 프로젝트 회고록](#프론트엔드-프로젝트-회고록)
- [개요](#개요)
- [서비스 설명](#서비스-설명)
- [페이지 설명](#페이지-설명)

## 프론트엔드 프로젝트 회고록

- **이룬점/잘한점**

1. OAuth 2.0 도입: Kakao 소셜 로그인을 활용하여 회원 가입 유저, 기존 유저, 관리자의 페이지를 구분.
2. 다양한 사용자 정보 추가: 취미, 연락 빈도 등의 추가 정보를 받아 매칭 시 더 넓은 선택지를 제공.
3. 사용자 편의성 증대: QR코드를 제작 및 인식하는 과정을 통해 아이디 입력을 대체.
4. AI 매칭 및 평가 기능 도입: 매칭 시 AI를 활용하고, 매칭 후 평가 기능 추가.
5. 포인트 제도 도입: 사용자가 입금한 금액을 자유롭게 사용하고 잔액을 확인할 수 있는 포인트 제도 도입.
6. 상태 관리: RECOIL을 사용하여 전역적으로 상태 관리.
7. 사용자 수: 총 795명의 사용자를 서비스.

- **잘못한 점**

1. 개발 지연: 백엔드와 AI 개발에 시간이 더 소요되어 초기 계획보다 일정이 미뤄짐.
2. 오류 발생: 1일차에 여러 오류로 인해 서비스가 제대로 진행되지 않아 조기 종료 및 환불 진행. 2일차에 수정하여 서비스 제공.
3. 초기 로딩 문제: 초기 로딩 시간이 길고 이미지가 많은 페이지에서 로딩 시간이 많이 걸림. Progressive JPEG를 시도했으나 유의미한 변화 없이 원래 상태로 진행.
4. OAuth 적용 방식 문제: OAuth를 통한 role에 따른 페이지 제한이 올바르지 않은 방법으로 진행됨.
5. 사용자 피드백: 잘못된 터치를 방지하고자 넣은 기능들이 오히려 불편하고 이해하기 어렵다는 지적을 받음.

- **배운점**

1. 테스트의 중요성: 실 서비스 전 테스트의 중요성을 깨달음. 앞으로는 개발 일정에 맞춰 테스트를 철저히 진행하여 사용자들에게 실망을 주지 않도록 노력할 것.
2. 사용자 편의성: 동작이 간단하지 않으면 사용자에게 불편을 줄 수 있다는 것을 인지.

- **해결해야 할 문제**

1. 이미지 로딩 최적화: 이미지 로딩 최적화 필요.
2. role에 따른 페이지 적용: role에 따른 페이지 접근 방식을 다시 적용해야 함.

- **개선 방안**

1. 이미지 로딩 최적화: Progressive JPEG를 재적용하고, 레이지 로딩과 스켈레톤 컴포넌트 등 다양한 방법을 논의하여 적용할 예정.
2. role 기반 페이지 제한: React HOC를 적용하여 개선할 예정.

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
