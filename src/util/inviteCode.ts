import * as randomstring from 'randomstring';

const CHARSET = 'NB6SICV9M2ALGRD87YPU1ETXZHKQWJF453';

export function generateCode(): string {
  const code = randomstring.generate({
    length: 6,
    charset: CHARSET,
    capitalization: 'uppercase',
  });
  return addVerificationCharactor(code);
}

export function isCodeValid(code: string): boolean {
  if (code.length !== 7) return false;

  for (let index = 0; index < code.length; index++) {
    if (!CHARSET.includes(code[index])) return false;
  }

  const charSum = code
    .slice(0, 6)
    .split('')
    .reduce((x, y) => x + y.charCodeAt(0), 0);
  return CHARSET[charSum % CHARSET.length] === code.slice(-1);
}

export function addVerificationCharactor(code: string): string {
  const charSum = code.split('').reduce((x, y) => x + y.charCodeAt(0), 0);
  return `${code}${CHARSET[charSum % CHARSET.length]}`;
}
