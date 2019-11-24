# 개고수

> 반려동물을 사랑하는 사람들의 소통 커뮤니티
- 반려동물의 행복한 일상을 공유하는 **펫스타그램** 서비스
- 근처 동물병원 **위치** , **유저 리뷰**와 **평점** 제공 서비스
- 유기동물 발견 시 **구조요청** 서비스

### Project log

프로젝트 진행 로그는 [이 곳](https://www.notion.so/Project-Team-Notion-Page-b7ceac21407c41ac852740b478bb7283)을 참고해 주세요.

<br/>

### `가입 및 로그인`

신규 사용자가 앱에 가입 및 로그인 하는 기능입니다. 개고수 자체 로그인 (이메일 인증) 과 카카오톡 소셜 로그인이 있습니다.
로그인에 성공했을때 서버로부터 토큰을 발급받으며, 토큰이 유효한 기간 동안은 앱을 켤 때 자동 로그인 됩니다.

![이메일중복확인](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbyL6bK%2FbtqzZKPBotP%2FhJA2Qx8yD5KD46oDQRgg41%2Fimg.gif)

![이메일인증](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbzYJzV%2FbtqzYDDS64z%2FTykZzNnzixPhMUwNSCyBwK%2Fimg.gif)

이미 가입된 유저를 확인하고 nodeMailer 를 통한 이메일 인증을 거친 후 회원가입이 진행됩니다.

![회원가입](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FdRkjCf%2FbtqzYpsnuJm%2FNG8vkICnvdt8huVab7doik%2Fimg.gif)

![카톡로그인](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbYcp9s%2FbtqzZKIQugy%2F6qEHrfhBpAVxiP3sLhVulK%2Fimg.gif)
카카오톡 소셜 회원가입 / 로그인 입니다. 
(일반 유저와 다르게 이메일과 패스워드를 따로 저장하지 않습니다. 닉네임은 카카오톡 닉네임을 가져오며 애플리케이션 안에서 변경이 가능합니다.)
