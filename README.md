# Project_00

![readmeImage](https://user-images.githubusercontent.com/95332666/179355949-ddc5fd00-9042-43bc-892e-eda3f1a732ad.png)

---

## !! 윈도우의 경우 터미널은 PowerShell이 아닌 CMD를 사용합니다.

## !! master branch에 직접 작업하지 마시고 신규 branch에 작업 진행해 주세요.

## !! commit은 기능 별로 자주, 자세하게 써서 push 해주세요.

## !! master merge 전, 후 항상 카톡으로 알려주셔야 합니다.

GitHub 협업 연습을 위한 간단한 웹사이트 입니다.
MJF 소개 페이지로 구성했습니다.

---

## Project 정보.

- HTML
- jQuery
- CSS
- font-awesome

---

## 새 브랜치 작업 방법

- git clone

```
$ git clone https://github.com/Skylar090807/Project_00.git
```

- 작업할 개인 브랜치 생성 후 해당 브랜치로 이동.

```
$ git checkout -b 개인브랜치이름
```

- 개인 브랜치에서 수행한 작업을 git에 올린다.

```
$ git add .
$ git commit -m "자세한 commit 내용"
$ git push origin 브랜치이름
```

- 다른 협업자가 원격 저장소의 master에 push를 진행해놓았을 수도 있다. 그러므로 로컬의 master 브랜치로 이동 후 master의 내용을 제일 최신으로 업데이트해준다.

```
(작업 중인 본인 브랜치 안에서 명령어 실행)
$ git checkout main
(master 브랜치 안에서 명령어 실행)
$ git pull origin master
```

- 다시 작업한 브랜치로 이동 후 로컬의 master 내용을 해당 브랜치에 merge!

```
(작업 중인 브랜치 안에서 명령어 실행)
$ git merge master
$ git push
```
