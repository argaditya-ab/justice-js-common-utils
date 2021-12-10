"use strict";
/*
 *
 *  Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 *  This is licensed software from AccelByte Inc, for limitations
 *  and restrictions contact your company contract manager.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../../../types/types");
exports.LetterCaseEnum = types_1.Enum("lowercase", "uppercase", "mixed", "any");
exports.CharacterLocationEnum = types_1.Enum("anywhere", "middle");
var UNICODE_PATTERN = "^[\\pL\\pN\\pM]*$";
var NUMBER_PATTERN = "0-9";
var LOWERCASE_PATTERN = "a-z";
var UPPERCASE_PATTERN = "A-Z";
var ANYCASE_PATTERN = "A-Za-z";
exports.DEFAULT_USERNAME_RULE = {
    regex: "()",
    maxRepeatingAlphaNum: 0,
    maxRepeatingSpecialCharacter: 0,
    minCharType: 0,
    letterCase: exports.LetterCaseEnum.any,
    specialCharacterLocation: exports.CharacterLocationEnum.middle,
    allowUnicode: false,
    allowLetter: true,
    allowDigit: true,
    allowSpace: false,
    isCustomRegex: false,
    specialCharacters: ["_", "-"],
};
exports.DEFAULT_DISPLAYNAME_RULE = {
    regex: "()",
    maxRepeatingAlphaNum: 0,
    maxRepeatingSpecialCharacter: 1,
    minCharType: 0,
    letterCase: exports.LetterCaseEnum.any,
    specialCharacterLocation: exports.CharacterLocationEnum.middle,
    allowUnicode: false,
    allowLetter: true,
    allowDigit: true,
    allowSpace: true,
    isCustomRegex: false,
    specialCharacters: ["'", ",", ".", "-"],
};
exports.DEFAULT_PASSWORD_RULE = {
    regex: "()",
    maxRepeatingAlphaNum: 2,
    maxRepeatingSpecialCharacter: 2,
    minCharType: 3,
    letterCase: exports.LetterCaseEnum.mixed,
    specialCharacterLocation: exports.CharacterLocationEnum.anywhere,
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
        '\\"',
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
};
exports.generatePattern = function (_a) {
    var regex = _a.regex, maxRepeatingAlphaNum = _a.maxRepeatingAlphaNum, maxRepeatingSpecialCharacter = _a.maxRepeatingSpecialCharacter, minCharType = _a.minCharType, letterCase = _a.letterCase, specialCharacterLocation = _a.specialCharacterLocation, allowUnicode = _a.allowUnicode, allowLetter = _a.allowLetter, allowDigit = _a.allowDigit, allowSpace = _a.allowSpace, isCustomRegex = _a.isCustomRegex, specialCharacters = _a.specialCharacters;
    if (isCustomRegex)
        return regex;
    if (allowUnicode)
        return UNICODE_PATTERN;
    var allowedCharacterList = [];
    var allowedCharacterString = "";
    if (allowLetter) {
        switch (letterCase) {
            case exports.LetterCaseEnum.uppercase:
                allowedCharacterString += UPPERCASE_PATTERN;
                allowedCharacterList = allowedCharacterList.concat([createPositiveLookahead(UPPERCASE_PATTERN)]);
                break;
            case exports.LetterCaseEnum.lowercase:
                allowedCharacterString += LOWERCASE_PATTERN;
                allowedCharacterList = allowedCharacterList.concat([createPositiveLookahead(LOWERCASE_PATTERN)]);
                break;
            case exports.LetterCaseEnum.mixed:
                allowedCharacterString += UPPERCASE_PATTERN;
                allowedCharacterString += LOWERCASE_PATTERN;
                allowedCharacterList = allowedCharacterList.concat([
                    createPositiveLookahead(UPPERCASE_PATTERN),
                    createPositiveLookahead(LOWERCASE_PATTERN),
                ]);
                break;
            case exports.LetterCaseEnum.any:
                allowedCharacterString += ANYCASE_PATTERN;
                allowedCharacterList = allowedCharacterList.concat([createPositiveLookahead(ANYCASE_PATTERN)]);
                break;
            default:
                allowedCharacterString += "";
        }
    }
    if (allowDigit) {
        allowedCharacterString += NUMBER_PATTERN;
        allowedCharacterList = allowedCharacterList.concat([createPositiveLookahead(NUMBER_PATTERN)]);
    }
    var specialChars = "";
    var allowedSpecialChars = "";
    if (specialCharacters.length > 0) {
        specialChars = specialCharacters.join("");
        var quantifier = "*";
        if (maxRepeatingSpecialCharacter === 1) {
            quantifier = "?";
        }
        switch (specialCharacterLocation) {
            case exports.CharacterLocationEnum.anywhere:
                allowedCharacterString += specialChars;
                break;
            case exports.CharacterLocationEnum.middle:
                allowedSpecialChars = createCharacterSet(specialChars) + quantifier;
                break;
            default:
                allowedCharacterString += specialChars;
        }
    }
    allowedCharacterList = allowedCharacterList.concat([createPositiveLookahead(specialChars)]);
    allowedCharacterString = createCharacterSet(allowedCharacterString);
    var combinations = createCombination(allowedCharacterList, minCharType);
    var result = "^";
    if (combinations.length > 0) {
        result += createNonCapturingGroup(combinations.join("|"));
    }
    var capturingGroupNum = 1;
    if (maxRepeatingAlphaNum > 0) {
        result += "(?!.*([A-Za-z0-9])\\" + capturingGroupNum.toString() + "{" + maxRepeatingAlphaNum.toString() + ",})";
        capturingGroupNum++;
    }
    if (allowSpace) {
        if (!allowedSpecialChars) {
            allowedSpecialChars = createCharacterSet(" ") + "?";
        }
        else {
            allowedSpecialChars = createCharacterSet(" ") + "?" + "|" + allowedSpecialChars;
        }
    }
    var allowedChars = allowedCharacterString;
    if (!!allowedSpecialChars) {
        allowedChars += createCapturingGroup(allowedSpecialChars) + "?";
        allowedChars += allowedCharacterString + "+|" + allowedCharacterString;
    }
    if (maxRepeatingSpecialCharacter > 0) {
        var specials = specialCharacters.join("");
        result += "(?!.*([" + specials + "])\\" + capturingGroupNum.toString() + "{" + maxRepeatingSpecialCharacter.toString() + ",})";
    }
    result += createCapturingGroup(allowedChars);
    result += "*$";
    return result;
};
var createCharacterSet = function (input) {
    if (!input)
        return input;
    return "[" + input + "]";
};
var createPositiveLookahead = function (input) {
    if (!input)
        return input;
    return "(?=.*" + createCharacterSet(input) + ")";
};
var createNonCapturingGroup = function (input) {
    if (!input)
        return input;
    return "(?:" + input + ")";
};
var createCapturingGroup = function (input) {
    if (!input)
        return input;
    return "(" + input + ")";
};
var createCombination = function (pool, length) {
    var result = [];
    var combinationLength = length;
    var poolLength = pool.length;
    if (combinationLength > poolLength)
        return result;
    if (length === 0)
        combinationLength = 1;
    var indices = Array(combinationLength).fill(0);
    for (var i = 0; i < indices.length; i++) {
        indices[i] = i;
    }
    var combined = "";
    for (var i = 0; i < indices.length; i++) {
        combined += pool[i];
    }
    result = result.concat([combined]);
    while (true) {
        var idx = -1;
        for (var i = combinationLength - 1; i > -1; i--) {
            if (indices[i] !== i + poolLength - combinationLength) {
                idx = i;
                break;
            }
        }
        if (idx === -1) {
            break;
        }
        indices[idx]++;
        for (var j = idx + 1; j < combinationLength; j++) {
            indices[j] = indices[j - 1] + 1;
        }
        combined = "";
        for (var _i = 0, indices_1 = indices; _i < indices_1.length; _i++) {
            var i = indices_1[_i];
            combined += pool[i];
        }
        result = result.concat([combined]);
    }
    return result;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnZXhHZW5lcmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2lucHV0LXZhbGlkYXRpb24vdXRpbHMvcmVnZXhHZW5lcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7QUFFSCw4Q0FBNEM7QUFFL0IsUUFBQSxjQUFjLEdBQUcsWUFBSSxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBRWhFLFFBQUEscUJBQXFCLEdBQUcsWUFBSSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUdoRSxJQUFNLGVBQWUsR0FBRyxtQkFBbUIsQ0FBQztBQUM1QyxJQUFNLGNBQWMsR0FBRyxLQUFLLENBQUM7QUFDN0IsSUFBTSxpQkFBaUIsR0FBRyxLQUFLLENBQUM7QUFDaEMsSUFBTSxpQkFBaUIsR0FBRyxLQUFLLENBQUM7QUFDaEMsSUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDO0FBQ3BCLFFBQUEscUJBQXFCLEdBQUc7SUFDbkMsS0FBSyxFQUFFLElBQUk7SUFDWCxvQkFBb0IsRUFBRSxDQUFDO0lBQ3ZCLDRCQUE0QixFQUFFLENBQUM7SUFDL0IsV0FBVyxFQUFFLENBQUM7SUFDZCxVQUFVLEVBQUUsc0JBQWMsQ0FBQyxHQUFHO0lBQzlCLHdCQUF3QixFQUFFLDZCQUFxQixDQUFDLE1BQU07SUFDdEQsWUFBWSxFQUFFLEtBQUs7SUFDbkIsV0FBVyxFQUFFLElBQUk7SUFDakIsVUFBVSxFQUFFLElBQUk7SUFDaEIsVUFBVSxFQUFFLEtBQUs7SUFDakIsYUFBYSxFQUFFLEtBQUs7SUFDcEIsaUJBQWlCLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO0NBQzlCLENBQUE7QUFDWSxRQUFBLHdCQUF3QixHQUFHO0lBQ3RDLEtBQUssRUFBRSxJQUFJO0lBQ1gsb0JBQW9CLEVBQUUsQ0FBQztJQUN2Qiw0QkFBNEIsRUFBRSxD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