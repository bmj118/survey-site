# 112통신대대 자유게시판

사건사고 위키·관리자 기능을 제외한 단일 자유게시판 버전입니다.

## 기능
- 누구나 글 작성 가능 (로그인 불필요)
- 닉네임 또는 익명으로 작성
- 게시글 목록, 검색, 새로고침
- 모바일 반응형

## Supabase 연결
1. https://supabase.com 에서 무료 프로젝트 생성
2. SQL Editor에서 `supabase.sql` 전체 실행
3. Project Settings → API에서 Project URL과 anon/public key 복사
4. `app.js` 상단의 `SUPABASE_URL`, `SUPABASE_ANON_KEY`에 입력
5. `service_role` 또는 secret key는 절대 넣지 마세요.

## GitHub Pages 배포
1. 기존 저장소 파일 백업
2. `index.html`, `style.css`, `app.js`를 저장소 최상위에 업로드
3. `supabase.sql`, `README.md`도 보관해 두세요.
4. Settings → Pages → Deploy from a branch → main / root 선택 후 저장

## 주의
이 버전은 공개 게시판입니다. 게시글 삭제·수정, 신고, 스팸 방지 기능은 아직 없습니다. 실제 공개 운영 전 CAPTCHA/속도 제한과 관리·삭제 기능을 추가하세요. 개인정보와 군사기밀, 작전·경계·통신망 관련 보안정보는 게시하지 마세요. 비공식 커뮤니티임을 명확히 표시하세요.
