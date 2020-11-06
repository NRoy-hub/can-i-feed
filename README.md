# Can I feed?
반려견이 먹어도 되는 간식인지 검색하는 사이트

## 설치


먼저 `backend` 폴더와 `frontend` 각각의 폴더에 라이브러리를 설치해주세요.

`/backend`
```
npm install
```

`/frontend`
```
npm install
```

---

## 빌드

`/frontend`
```
npm run build
```

---

## 환경변수 설정

* `Postgresql` 을 설치합니다.
* 설치된 DB에 **superuser** 를 만듭니다.
* `canifeed` 데이터베이스를 생성해줍니다.
* `/backend` 폴더에 `.env` 파일을 만들어서 아래의 데이터를 넣어줍니다. (`.env_temp` 파일 참고)


```
// superuser 생성 SQL
CREATE USER [유저이름] WITH superuser password [패스워드]';

// 데이터베이스 생성 SQL
CREATE DATABASE canifeed;

```

`.env`
```json
DB_HOST= [데이터베이스 주소]
DB_USER= [만든 superuser 이름]
DB_PASSWORD= [만든 superuser 비밀번호]
NODEMAILER_USER= [보내는사람 이메일]
NODEMAILER_PASS= [보내는 사람 이메일의 패스워드]
COOKIE_SALT= [쿠키 인코딩 salt]

```


---

## 데이터베이스 테이블 생성

`/backend`
```
npm run create_db
```


---

## 실행

`/backend`
```
npm run start
```