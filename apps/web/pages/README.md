# pages (비워 둠)

이 폴더는 **비어 있어야 한다.** 라우팅은 `app/`(App Router)에서만 한다.

Next.js는 앱 루트에 `app/`이나 `pages/`가 있으면 `src/` 안의 같은 이름 폴더를 라우팅 폴더로 보지 않는다.
이 빈 폴더가 있어야 FSD의 `src/pages`(화면 계층)를 Next가 Pages Router로 오인하지 않는다.
