export declare const LetterCaseEnum: Readonly<{
    any: "any";
    lowercase: "lowercase";
    uppercase: "uppercase";
    mixed: "mixed";
}>;
export declare type LetterCaseType = keyof typeof LetterCaseEnum;
export declare const CharacterLocationEnum: Readonly<{
    middle: "middle";
    anywhere: "anywhere";
}>;
export declare type CharacterLocationType = keyof typeof CharacterLocationEnum;
export declare const DEFAULT_USERNAME_RULE: {
    regex: string;
    maxRepeatingAlphaNum: number;
    maxRepeatingSpecialCharacter: number;
    minCharType: number;
    letterCase: "any";
    specialCharacterLocation: "middle";
    allowUnicode: boolean;
    allowLetter: boolean;
    allowDigit: boolean;
    allowSpace: boolean;
    isCustomRegex: boolean;
    specialCharacters: string[];
};
export declare const DEFAULT_DISPLAYNAME_RULE: {
    regex: string;
    maxRepeatingAlphaNum: number;
    maxRepeatingSpecialCharacter: number;
    minCharType: number;
    letterCase: "any";
    specialCharacterLocation: "middle";
    allowUnicode: boolean;
    allowLetter: boolean;
    allowDigit: boolean;
    allowSpace: boolean;
    isCustomRegex: boolean;
    specialCharacters: string[];
};
export declare const DEFAULT_PASSWORD_RULE: {
    regex: string;
    maxRepeatingAlphaNum: number;
    maxRepeatingSpecialCharacter: number;
    minCharType: number;
    letterCase: "mixed";
    specialCharacterLocation: "anywhere";
    allowUnicode: boolean;
    allowLetter: boolean;
    allowDigit: boolean;
    allowSpace: boolean;
    isCustomRegex: boolean;
    specialCharacters: string[];
};
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
export declare const generatePattern: ({ regex, maxRepeatingAlphaNum, maxRepeatingSpecialCharacter, minCharType, letterCase, specialCharacterLocation, allowUnicode, allowLetter, allowDigit, allowSpace, isCustomRegex, specialCharacters, }: RegexGeneratorParam) => string;
