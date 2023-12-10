export const ERROR_MESSAGE = {
  NOT_MATCH_PASSWORD_CONFIRM: {
    code: 400,
    message: '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
  },
  FAIL_TO_REGISTER_SCHOOL_ID: {
    code: 400,
    message: '이미 가입된 학번입니다.',
  },
  FAIL_TO_REGISTER_NICKNAME: {
    code: 400,
    message: '이미 존재하는 닉네임입니다.',
  },
  NOT_AUTHORIZED_EMAIL: {
    code: 400,
    message: '이메일 인증을 다시 받아주세요.',
  },
  TIMEOUT_EMAIL_CODE: {
    code: 400,
    message: '이메일 인증시간이 초과되었습니다.',
  },
  NOT_EXIST_USER: {
    code: 400,
    message: '존재하지 않는 사용자입니다.',
  },
  NOT_EXIST_POST: {
    code: 400,
    message: '존재하지 않는 게시물입니다.',
  },
  NOT_EXIST_COMMENT: {
    code: 400,
    message: '존재하지 않는 댓글입니다.',
  },
  NOT_EXIST_BOARD: {
    code: 400,
    message: '존재하지 않는 게시판입니다.',
  },
  NO_AUTH: {
    code: 403,
    message: '권한이 없습니다.',
  },
} as const;
