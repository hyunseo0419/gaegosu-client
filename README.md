# 개고수

> 반려동물을 사랑하는 사람들의 소통 커뮤니티
- 반려동물의 행복한 일상을 공유하는 **펫스타그램** 서비스
- 근처 동물병원 **위치** , **유저 리뷰**와 **평점** 제공 서비스
- 유기동물 발견 시 **구조요청** 서비스

### Project log

조금 더 선명한 시연 화면을 보고 싶으시다면 [이 곳](https://analogcoding.tistory.com/173)을 참고해 주세요.
프로젝트 진행 로그는 [이 곳](https://www.notion.so/Project-Team-Notion-Page-b7ceac21407c41ac852740b478bb7283)을 참고해 주세요.

<br/>

### `가입 및 로그인`

신규 사용자가 앱에 가입 및 로그인 하는 기능입니다. 개고수 자체 로그인 (이메일 인증) 과 카카오톡 소셜 로그인이 있습니다.
로그인에 성공했을때 서버로부터 토큰을 발급받으며, 토큰이 유효한 기간 동안은 앱을 켤 때 자동 로그인 됩니다.

<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbyL6bK%2FbtqzZKPBotP%2FhJA2Qx8yD5KD46oDQRgg41%2Fimg.gif' width='600' height='400' />

<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbzYJzV%2FbtqzYDDS64z%2FTykZzNnzixPhMUwNSCyBwK%2Fimg.gif' width='600' height='400' />

<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FdRkjCf%2FbtqzYpsnuJm%2FNG8vkICnvdt8huVab7doik%2Fimg.gif' width='600' height='400' />

이미 가입된 유저를 확인하고 nodeMailer 를 통한 이메일 인증을 거친 후 회원가입이 진행됩니다.

<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbYcp9s%2FbtqzZKIQugy%2F6qEHrfhBpAVxiP3sLhVulK%2Fimg.gif' width='600' height='400' />

카카오톡 **소셜 회원가입 / 로그인** 입니다. 이메일과 패스워드 대신 카카오톡에서 받은 정보를 저장합니다.


<br/>

### `펫스타그램`

펫스타그램 게시물의 모습입니다. 3x3 view 가 기본이며 더 많은 사진을 로드할 수 있습니다. 게시물을 작성하고 제목 , 내용 , 작성자로 **검색**할 수 있습니다.

<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fbg15K0%2FbtqzYMUUSo5%2Fc5LNh7VrzGibkDCASKuRY1%2Fimg.gif' width='600' height='400' />

<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FdO1skl%2Fbtqz0AFMd5Z%2FGQK9g8ArpzNKsPqyT22iAK%2Fimg.gif' width='600' height='400' />

<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FWDOGE%2FbtqzYVqyIQX%2FYYnS6NakJBRkwEmMXKZJiK%2Fimg.gif' width='600' height='400' />

게시물에 **댓글**을 달고 **좋아요** 를 누를 수 있습니다.

<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FQ7hxD%2Fbtqz0AFMfWq%2FMvxxQAo8qIuxbUsKk9DZVk%2Fimg.gif' width='600' height='400' />

<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FmwWPn%2FbtqzYU6fB5d%2FUNTfOqiT2CeB5LqdHQiDA1%2Fimg.gif' width='600' height='400' />

<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FYsccN%2FbtqzYT7nbWb%2FlrPw46G25VXLu0k9mqvbj0%2Fimg.gif' width='600' height='400' />

작성자 , 댓글을 단 유저 네임으로 해당 유저에 마이페이지로 이동할 수 있습니다.

<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FpHtrr%2FbtqzYDcRiou%2FXCwjeHxdRea5nVarH3jTh0%2Fimg.gif' width='600' height='400' />

<br/>

### `마이페이지`

유저 정보 , 프로필 사진을 변경할 수 있는 마이페이지입니다. 토큰을 확인해서 정보 변경이 가능합니다.

<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FnW3O2%2FbtqzZcr5f50%2FzF7h6jqQ6kkC43xkg4orOk%2Fimg.gif' width='600' height='400' />

<br/>

### `동물병원 정보 확인 및 리뷰 , 평점`

동물병원 위치와 평점

<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FVBypO%2FbtqzYMHqVNC%2FfwGEs57jeBn1jLNl9OJte1%2Fimg.gif' width='600' height='400' />

동물병원 리뷰

<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbPovYv%2FbtqzZKPD58P%2FPqcnFzEtaU4NaGT0E1aew0%2Fimg.gif' width='600' height='400' />

<br/>

### `유기동물 구조요청 , 확인`

<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FcTDt5R%2FbtqzYLV1uh9%2FkybXbNdnuGSzVjHQqGgLk1%2Fimg.gif' width='600' height='400' />

관리자는 요청된 정보를 확인하고 구조 유무로 완료를 처리할 수 있습니다.

<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FI0lW3%2FbtqzYLodOGH%2FqCHkebRmo54CJyKytmwugk%2Fimg.gif' width='600' height='400' />

## `Start`

```
npm install
npm start

```
