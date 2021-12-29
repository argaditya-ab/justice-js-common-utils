/*
 *
 *  Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 *  This is licensed software from AccelByte Inc, for limitations
 *  and restrictions contact your company contract manager.
 *
 */

import { Enum } from "../../../types/types";

export const LetterCaseEnum = Enum("lowercase", "uppercase", "mixed", "any");
export type LetterCaseType = keyof typeof LetterCaseEnum;
export const CharacterLocationEnum = Enum("anywhere", "middle");
export type CharacterLocationType = keyof typeof CharacterLocationEnum;

const UNICODE_PATTERN = "^[\\pL\\pN\\pM]*$";
const NUMBER_PATTERN = "0-9";
const LOWERCASE_PATTERN = "a-z";
const UPPERCASE_PATTERN = "A-Z";
const ANYCASE_PATTERN = "A-Za-z";
export const DEFAULT_USERNAME_RULE = {
  regex: "()",
  maxRepeatingAlphaNum: 0,
  maxRepeatingSpecialCharacter: 0,
  minCharType: 0,
  letterCase: LetterCaseEnum.any,
  specialCharacterLocation: CharacterLocationEnum.middle,
  allowUnicode: false,
  allowLetter: true,
  allowDigit: true,
  allowSpace: false,
  isCustomRegex: false,
  specialCharacters: ["_", "-"],
}
export const DEFAULT_DISPLAYNAME_RULE = {
  regex: "()",
  maxRepeatingAlphaNum: 0,
  maxRepeatingSpecialCharacter: 1,
  minCharType: 0,
  letterCase: LetterCaseEnum.any,
  specialCharacterLocation: CharacterLocationEnum.middle,
  allowUnicode: false,
  allowLetter: true,
  allowDigit: true,
  allowSpace: true,
  isCustomRegex: false,
  specialCharacters: ["'", ",", ".", "-"],
}
export const DEFAULT_PASSWORD_RULE = {
  regex: "()",
  maxRepeatingAlphaNum: 2,
  maxRepeatingSpecialCharacter: 2,
  minCharType: 3,
  letterCase: LetterCaseEnum.mixed,
  specialCharacterLocation: CharacterLocationEnum.anywhere,
  allowUnicode: false,
  allowLetter: true,
  allowDigit: true,
  allowSpace: false,
  isCustomRegex: false,
  specialCharacters: [
    "!",
    "~",
    "<",
    ">",
    ",",
    ";",
    ":",
    "_",
    "=",
    "?",
    "*",
    "+",
    "#",
    ".",
    "\"",
    "&",
    "§",
    "%",
    "°",
    "(",
    ")",
    "\\|",
    "\\[",
    "\\]",
    "\\-",
    "\\$",
    "\\^",
    "\\@",
    "\\/",
  ],
}

export interface RegexGeneratorParam {
  regex: string;
  maxRepeatingAlphaNum: number;
  maxRepeatingSpecialCharacter: number;
  minCharType: number;
  letterCase: LetterCaseType;
  specialCharacterLocation: CharacterLocationType;
  allowUnicode: boolean;
  allowLetter: boolean;
  allowDigit: boolean;
  allowSpace: boolean;
  isCustomRegex: boolean;
  specialCharacters: string[];
}

export const generatePattern = ({
  regex,
  maxRepeatingAlphaNum,
  maxRepeatingSpecialCharacter,
  minCharType,
  letterCase,
  specialCharacterLocation,
  allowUnicode,
  allowLetter,
  allowDigit,
  allowSpace,
  isCustomRegex,
  specialCharacters,
}: RegexGeneratorParam): string => {
  if (isCustomRegex) return regex;
  if (allowUnicode) return UNICODE_PATTERN;

  let allowedCharacterList: string[] = [];
  let allowedCharacterString: string = "";

  if (allowLetter) {
    switch (letterCase) {
      case LetterCaseEnum.uppercase:
        allowedCharacterString += UPPERCASE_PATTERN;
        allowedCharacterList = [...allowedCharacterList, createPositiveLookahead(UPPERCASE_PATTERN)];
        break;
      case LetterCaseEnum.lowercase:
        allowedCharacterString += LOWERCASE_PATTERN;
        allowedCharacterList = [...allowedCharacterList, createPositiveLookahead(LOWERCASE_PATTERN)];
        break;
      case LetterCaseEnum.mixed:
        allowedCharacterString += UPPERCASE_PATTERN;
        allowedCharacterString += LOWERCASE_PATTERN;
        allowedCharacterList = [
          ...allowedCharacterList,
          createPositiveLookahead(UPPERCASE_PATTERN),
          createPositiveLookahead(LOWERCASE_PATTERN),
        ];
        break;
      case LetterCaseEnum.any:
        allowedCharacterString += ANYCASE_PATTERN;
        allowedCharacterList = [...allowedCharacterList, createPositiveLookahead(ANYCASE_PATTERN)];
        break;
      default:
        allowedCharacterString += "";
    }
  }

  if (allowDigit) {
    allowedCharacterString += NUMBER_PATTERN;
    allowedCharacterList = [...allowedCharacterList, createPositiveLookahead(NUMBER_PATTERN)];
  }

  let specialChars: string = "";
  let allowedSpecialChars: string = "";

  if (specialCharacters.length > 0) {
    specialChars = specialCharacters.join("");
    let quantifier = "*";
    if (maxRepeatingSpecialCharacter === 1) {
      quantifier = "?";
    }

    switch (specialCharacterLocation) {
      case CharacterLocationEnum.anywhere:
        allowedCharacterString += specialChars;
        break;
      case CharacterLocationEnum.middle:
        allowedSpecialChars = createCharacterSet(specialChars) + quantifier;
        break;
      default:
        allowedCharacterString += specialChars;
    }
  }

  allowedCharacterList = [...allowedCharacterList, createPositiveLookahead(specialChars)];
  allowedCharacterString = createCharacterSet(allowedCharacterString);

  const combinations = createCombination(allowedCharacterList, minCharType);
  let result = "^";

  if (combinations.length > 0) {
    result += createNonCapturingGroup(combinations.join("|"));
  }

  let capturingGroupNum = 1;
  if (maxRepeatingAlphaNum > 0) {
    result += `(?!.*([A-Za-z0-9])\\${capturingGroupNum.toString()}{${maxRepeatingAlphaNum.toString()},})`;
    capturingGroupNum++;
  }

  if (allowSpace) {
    if (!allowedSpecialChars) {
      allowedSpecialChars = `${createCharacterSet(" ")}?`;
    } else {
      allowedSpecialChars = createCharacterSet(" ") + "?" + "|" + allowedSpecialChars;
    }
  }

  let allowedChars = allowedCharacterString;
  if (!!allowedSpecialChars) {
    allowedChars += `${createCapturingGroup(allowedSpecialChars)}?`;
    allowedChars += `${allowedCharacterString}+|${allowedCharacterString}`;
  }

  if (maxRepeatingSpecialCharacter > 0) {
    const specials = specialCharacters.join("");
    result += `(?!.*([${specials}])\\${capturingGroupNum.toString()}{${maxRepeatingSpecialCharacter.toString()},})`;
  }

  result += createCapturingGroup(allowedChars);
  result += "*$";

  return result;
};

const createCharacterSet = (input: string): string => {
  if (!input) return input;
  return `[${input}]`;
};

const createPositiveLookahead = (input: string): string => {
  if (!input) return input;
  return `(?=.*${createCharacterSet(input)})`;
};

const createNonCapturingGroup = (input: string): string => {
  if (!input) return input;
  return `(?:${input})`;
};

const createCapturingGroup = (input: string): string => {
  if (!input) return input;
  return `(${input})`;
};

const createCombination = (pool: string[], length: number) => {
  let result: string[] = [];
  let combinationLength = length;
  const poolLength = pool.length;

  if (combinationLength > poolLength) return result;
  if (length === 0) combinationLength = 1;

  const indices = Array(combinationLength).fill(0);

  for (let i = 0; i < indices.length; i++) {
    indices[i] = i;
  }

  let combined = "";

  for (let i = 0; i < indices.length; i++) {
    combined += pool[i];
  }

  result = [...result, combined];

  while (true) {
    let idx = -1;
    for (let i = combinationLength - 1; i > -1; i--) {
      if (indices[i] !== i + poolLength - combinationLength) {
        idx = i;
        break;
      }
    }

    if (idx === -1) {
      break;
    }

    indices[idx]++;
    for (let j = idx + 1; j < combinationLength; j++) {
      indices[j] = indices[j - 1] + 1;
    }

    combined = "";
    for (const i of indices) {
      combined += pool[i];
    }

    result = [...result, combined];
  }

  return result;
};
