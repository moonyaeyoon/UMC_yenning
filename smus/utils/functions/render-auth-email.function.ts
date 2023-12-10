/**
 * 이메일을 보내기 위한 html 양식을 리턴합니다.
 * @param code 인증 번호
 */
export function renderAuthEmail(code: string): string {
  return `
  <html>
    <body>
      <h1>안녕하세요! 스뮤즈를 이용해 주셔서 감사합니다!</h1>
      <div style="height: 20px"></div>
      <div style="font-size: 13px">
        <p>회원가입을 위한 인증 이메일 입니다.</p>
        <p>다음의 코드를 회워가입 페이지에 입력하여 인증해주시기 바랍니다.</p>
      </div>
      <div style="height: 10px"></div>
      <div style="font-size: 20px">
        <p>인증 번호 : <b>${code}</b></p>
      </div>
    </body>
  </html>
  `;
}
