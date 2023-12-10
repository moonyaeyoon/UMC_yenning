/**
 * 랜덤한 숫자를 생성합니다.
 * @param digit 자릿수
 */
export function generateRandomCode(digit: number): string {
  if (digit < 1) {
    throw new Error('자릿수는 1이상 이어야 합니다.');
  }

  let randomNumberCode = '';

  for (let i = 0; i < digit; i++) {
    randomNumberCode += Math.floor(Math.random() * 10);
  }

  return randomNumberCode;
}
