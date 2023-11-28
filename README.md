# firebase-integration
Firebase를 활용한 Google 로그인과 storage 업로드 및 다운로드

<br>

|Google 로그인/로그아웃|Storage 이미지 업로드/다운로드|
|:----------------:|:----------------:|
|![auth](https://github.com/yeontan0826/firebase-integration/blob/master/assets/screenshots/login_logout.gif)|![auth](https://github.com/yeontan0826/firebase-integration/blob/master/assets/screenshots/upload_download_image.gif)|

<br>

<hr>

### 사용방법

[Firebase](https://firebase.google.com/?hl=ko)에 접속하여 프로젝트를 생성합니다.

<br>

**Authentication**과 **Storage**를 설정하고 `google-services.json`과 `GoogleService-Info.plist` 파일을 다운받습니다.

다운받은 파일을 프로젝트 최상단 폴더에 넣어줍니다.

<br>

> 패키지명이 `com.testapp`이 아닌 다른 패키지명이라면 아래와 같이 수정해줍니다.

`app.json`
```
{
  "expo": {
    ...,
    "ios": {
      ...,
      "bundleIdentifier": "com.testapp"  // 수정할 부분(iOS 번들명)
    },
    "android": {
      ...,
      "package": "com.testapp"  // 수정할 부분(AOS 패키지명)
    },
    ...
  }
}
```

<br>

`expo prebuild`를 os 파일들을 생성해줍니다.

<br>

그 후, `expo run:ios` 또는 `expo run:android`를 통해 앱을 빌드합니다.
