/*
 *
 *  Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 *  This is licensed software from AccelByte Inc, for limitations
 *  and restrictions contact your company contract manager.
 *
 */
import { Enum } from "../../../types/types";
export var LetterCaseEnum = Enum("lowercase", "uppercase", "mixed", "any");
export var CharacterLocationEnum = Enum("anywhere", "middle");
var UNICODE_PATTERN = "^[\\pL\\pN\\pM]*$";
var NUMBER_PATTERN = "0-9";
var LOWERCASE_PATTERN = "a-z";
var UPPERCASE_PATTERN = "A-Z";
var ANYCASE_PATTERN = "A-Za-z";
export var DEFAULT_USERNAME_RULE = {
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
};
export var DEFAULT_DISPLAYNAME_RULE = {
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
};
export var DEFAULT_PASSWORD_RULE = {
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
};
export var generatePattern = function (_a) {
    var regex = _a.regex, maxRepeatingAlphaNum = _a.maxRepeatingAlphaNum, maxRepeatingSpecialCharacter = _a.maxRepeatingSpecialCharacter, minCharType = _a.minCharType, letterCase = _a.letterCase, specialCharacterLocation = _a.specialCharacterLocation, allowUnicode = _a.allowUnicode, allowLetter = _a.allowLetter, allowDigit = _a.allowDigit, allowSpace = _a.allowSpace, isCustomRegex = _a.isCustomRegex, specialCharacters = _a.specialCharacters;
    if (isCustomRegex)
        return regex;
    if (allowUnicode)
        return UNICODE_PATTERN;
    var allowedCharacterList = [];
    var allowedCharacterString = "";
    if (allowLetter) {
        switch (letterCase) {
            case LetterCaseEnum.uppercase:
                allowedCharacterString += UPPERCASE_PATTERN;
                allowedCharacterList = allowedCharacterList.concat([createPositiveLookahead(UPPERCASE_PATTERN)]);
                break;
            case LetterCaseEnum.lowercase:
                allowedCharacterString += LOWERCASE_PATTERN;
                allowedCharacterList = allowedCharacterList.concat([createPositiveLookahead(LOWERCASE_PATTERN)]);
                break;
            case LetterCaseEnum.mixed:
                allowedCharacterString += UPPERCASE_PATTERN;
                allowedCharacterString += LOWERCASE_PATTERN;
                allowedCharacterList = allowedCharacterList.concat([
                    createPositiveLookahead(UPPERCASE_PATTERN),
                    createPositiveLookahead(LOWERCASE_PATTERN),
                ]);
                break;
            case LetterCaseEnum.any:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnZXhHZW5lcmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2lucHV0LXZhbGlkYXRpb24vdXRpbHMvcmVnZXhHZW5lcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTVDLE1BQU0sQ0FBQyxJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFFN0UsTUFBTSxDQUFDLElBQU0scUJBQXFCLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUdoRSxJQUFNLGVBQWUsR0FBRyxtQkFBbUIsQ0FBQztBQUM1QyxJQUFNLGNBQWMsR0FBRyxLQUFLLENBQUM7QUFDN0IsSUFBTSxpQkFBaUIsR0FBRyxLQUFLLENBQUM7QUFDaEMsSUFBTSxpQkFBaUIsR0FBRyxLQUFLLENBQUM7QUFDaEMsSUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDO0FBQ2pDLE1BQU0sQ0FBQyxJQUFNLHFCQUFxQixHQUFHO0lBQ25DLEtBQUssRUFBRSxJQUFJO0lBQ1gsb0JBQW9CLEVBQUUsQ0FBQztJQUN2Qiw0QkFBNEIsRUFBRSxDQUFDO0lBQy9CLFdBQVcsRUFBRSxDQUFDO0lBQ2QsVUFBVSxFQUFFLGNBQWMsQ0FBQyxHQUFHO0lBQzlCLHdCQUF3QixFQUFFLHFCQUFxQixDQUFDLE1BQU07SUFDdEQsWUFBWSxFQUFFLEtBQUs7SUFDbkIsV0FBVyxFQUFFLElBQUk7SUFDakIsVUFBVSxFQUFFLElBQUk7SUFDaEIsVUFBVSxFQUFFLEtBQUs7SUFDakIsYUFBYSxFQUFFLEtBQUs7SUFDcEIsaUJBQWlCLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO0NBQzlCLENBQUE7QUFDRCxNQUFNLENBQUMsSUFBTSx3QkFBd0IsR0FBRztJQUN0QyxLQUFLLEVBQUUsSUFBSTtJQUNYLG9CQUFvQixFQUFFLENBQUM7SUFDdkIsNEJBQTRCLEVBQUUsQ0FBQztJQUMvQixXQUFXLEVBQUUsQ0FBQztJQUNkLFVBQVUsRUFBRSxjQUFjLENBQUMsR0FBRztJQUM5Qix3QkFBd0IsRUFBRSxxQkFBcUIsQ0FBQyxNQUFNO0lBQ3RELFlBQVksRUFBRSxLQUFLO0lBQ25CLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLGFBQWEsRUFBRSxLQUFLO0lBQ3BCLGlCQUFpQixFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0NBQ3hDLENBQUE7QUFDRCxNQUFNLENBQUMsSUFBTSxxQkFBcUIsR0FBRztJQUNuQyxLQUFLLEVBQUUsSUFBSTtJQUNYLG9CQUFvQixFQUFFLENBQUM7SUFDdkIsNEJBQTRCLEVBQUUsQ0FBQztJQUMvQixXQUFXLEVBQUUsQ0FBQztJQUNkLFVBQVUsRUFBRSxjQUFjLENBQUMsS0FBSztJQUNoQyx3QkFBd0IsRUFBRSxxQkFBcUIsQ0FBQyxRQUFRO0lBQ3hELFlBQVksRUFBRSxLQUFLO0lBQ25CLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLFVBQVUsRUFBRSxLQUFLO0lBQ2pCLGFBQWEsRUFBRSxLQUFLO0lBQ3BCLGlCQUFpQixFQUFFO1FBQ2pCLEdBQUc7UUFDSCxHQUFHO1FBQ0gsR0FBRztRQUNILEdBQUc7UUFDSCxHQUFHO1FBQ0gsR0FBRztRQUNILEdBQUc7UUFDSCxHQUFHO1FBQ0gsR0FBRztRQUNILEdBQUc7UUFDSCxHQUFHO1FBQ0gsR0FBRztRQUNILEdBQUc7UUFDSCxHQUFHO1FBQ0gsSUFBSTtRQUNKLEdBQUc7UUFDSCxHQUFHO1FBQ0gsR0FBRztRQUNILEdBQUc7UUFDSCxHQUFHO1FBQ0gsR0FBRztRQUNILEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO0tBQ047Q0FDRixDQUFBO0FBaUJELE1BQU0sQ0FBQyxJQUFNLGVBQWUsR0FBRyxVQUFDLEVBYVY7UUFacEIsZ0JBQUssRUFDTCw4Q0FBb0IsRUFDcEIsOERBQTRCLEVBQzVCLDRCQUFXLEVBQ1gsMEJBQVUsRUFDVixzREFBd0IsRUFDeEIsOEJBQVksRUFDWiw0QkFBVyxFQUNYLDBCQUFVLEVBQ1YsMEJBQVUsRUFDVixnQ0FBYSxFQUNiLHdDQUFpQjtJQUVqQixJQUFJLGFBQWE7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUNoQyxJQUFJLFlBQVk7UUFBRSxPQUFPLGVBQWUsQ0FBQztJQUV6QyxJQUFJLG9CQUFvQixHQUFhLEVBQUUsQ0FBQztJQUN4QyxJQUFJLHNCQUFzQixHQUFXLEVBQUUsQ0FBQztJQUV4QyxJQUFJLFdBQVcsRUFBRTtRQUNmLFFBQVEsVUFBVSxFQUFFO1lBQ2xCLEtBQUssY0FBYyxDQUFDLFNBQVM7Z0JBQzNCLHNCQUFzQixJQUFJLGlCQUFpQixDQUFDO2dCQUM1QyxvQkFBb0IsR0FBTyxvQkFBb0IsU0FBRSx1QkFBdUIsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFDLENBQUM7Z0JBQzdGLE1BQU07WUFDUixLQUFLLGNBQWMsQ0FBQyxTQUFTO2dCQUMzQixzQkFBc0IsSUFBSSxpQkFBaUIsQ0FBQztnQkFDNUMsb0JBQW9CLEdBQU8sb0JBQW9CLFNBQUUsdUJBQXVCLENBQUMsaUJBQWlCLENBQUMsRUFBQyxDQUFDO2dCQUM3RixNQUFNO1lBQ1IsS0FBSyxjQUFjLENBQUMsS0FBSztnQkFDdkIsc0JBQXNCLElBQUksaUJBQWlCLENBQUM7Z0JBQzVDLHNCQUFzQixJQUFJLGlCQUFpQixDQUFDO2dCQUM1QyxvQkFBb0IsR0FDZixvQkFBb0I7b0JBQ3ZCLHVCQUF1QixDQUFDLGlCQUFpQixDQUFDO29CQUMxQyx1QkFBdUIsQ0FBQyxpQkFBaUIsQ0FBQztrQkFDM0MsQ0FBQztnQkFDRixNQUFNO1lBQ1IsS0FBSyxjQUFjLENBQUMsR0FBRztnQkFDckIsc0JBQXNCLElBQUksZUFBZSxDQUFDO2dCQUMxQyxvQkFBb0IsR0FBTyxvQkFBb0IsU0FBRSx1QkFBdUIsQ0FBQyxlQUFlLENBQUMsRUFBQyxDQUFDO2dCQUMzRixNQUFNO1lBQ1I7Z0JBQ0Usc0JBQXNCLElBQUksRUFBRSxDQUFDO1NBQ2hDO0tBQ0Y7SUFFRCxJQUFJLFVBQVUsRUFBRTtRQUNkLHNCQUFzQixJQUFJLGNBQWMsQ0FBQztRQUN6QyxvQkFBb0IsR0FBTyxvQkFBb0IsU0FBRSx1QkFBdUIsQ0FBQyxjQUFjLENBQUMsRUFBQyxDQUFDO0tBQzNGO0lBRUQsSUFBSSxZQUFZLEdBQVcsRUFBRSxDQUFDO0lBQzlCLElBQUksbUJBQW1CLEdBQVcsRUFBRSxDQUFDO0lBRXJDLElBQUksaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNoQyxZQUFZLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLElBQUksVUFBVSxHQUFHLEdBQUcsQ0FBQztRQUNyQixJQUFJLDRCQUE0QixLQUFLLENBQUMsRUFBRTtZQUN0QyxVQUFVLEdBQUcsR0FBRyxDQUFDO1NBQ2xCO1FBRUQsUUFBUSx3QkFBd0IsRUFBRTtZQUNoQyxLQUFLLHFCQUFxQixDQUFDLFFBQVE7Z0JBQ2pDLHNCQUFzQixJQUFJLFlBQVksQ0FBQztnQkFDdkMsTUFBTTtZQUNSLEtBQUsscUJBQXFCLENBQUMsTUFBTTtnQkFDL0IsbUJBQW1CLEdBQUcsa0JBQWtCLENBQUMsWUFBWSxDQUFDLEdBQUcsVUFBVSxDQUFDO2dCQUNwRSxNQUFNO1lBQ1I7Z0JBQ0Usc0JBQXNCLElBQUksWUFBWSxDQUFDO1NBQzFDO0tBQ0Y7SUFFRCxvQkFBb0IsR0FBTyxvQkFBb0IsU0FBRSx1QkFBdUIsQ0FBQyxZQUFZLENBQUMsRUFBQyxDQUFDO0lBQ3hGLHNCQUFzQixHQUFHLGtCQUFrQixDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFFcEUsSUFBTSxZQUFZLEdBQUcsaUJBQWlCLENBQUMsb0JBQW9CLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDMUUsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDO0lBRWpCLElBQUksWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDM0IsTUFBTSxJQUFJLHVCQUF1QixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUMzRDtJQUVELElBQUksaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLElBQUksb0JBQW9CLEdBQUcsQ0FBQyxFQUFFO1FBQzVCLE1BQU0sSUFBSSx5QkFBdUIsaUJBQWlCLENBQUMsUUFBUSxFQUFFLFNBQUksb0JBQW9CLENBQUMsUUFBUSxFQUFFLFFBQUssQ0FBQztRQUN0RyxpQkFBaUIsRUFBRSxDQUFDO0tBQ3JCO0lBRUQsSUFBSSxVQUFVLEVBQUU7UUFDZCxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDeEIsbUJBQW1CLEdBQU0sa0JBQWtCLENBQUMsR0FBRyxDQUFDLE1BQUcsQ0FBQztTQUNyRDthQUFNO1lBQ0wsbUJBQW1CLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxtQkFBbUIsQ0FBQztTQUNqRjtLQUNGO0lBRUQsSUFBSSxZQUFZLEdBQUcsc0JBQXNCLENBQUM7SUFDMUMsSUFBSSxDQUFDLENBQUMsbUJBQW1CLEVBQUU7UUFDekIsWUFBWSxJQUFPLG9CQUFvQixDQUFDLG1CQUFtQixDQUFDLE1BQUcsQ0FBQztRQUNoRSxZQUFZLElBQU8sc0JBQXNCLFVBQUssc0JBQXdCLENBQUM7S0FDeEU7SUFFRCxJQUFJLDRCQUE0QixHQUFHLENBQUMsRUFBRTtRQUNwQyxJQUFNLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUMsTUFBTSxJQUFJLFlBQVUsUUFBUSxZQUFPLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxTQUFJLDRCQUE0QixDQUFDLFFBQVEsRUFBRSxRQUFLLENBQUM7S0FDakg7SUFFRCxNQUFNLElBQUksb0JBQW9CLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDN0MsTUFBTSxJQUFJLElBQUksQ0FBQztJQUVmLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMsQ0FBQztBQUVGLElBQU0sa0JBQWtCLEdBQUcsVUFBQyxLQUFhO0lBQ3ZDLElBQUksQ0FBQyxLQUFLO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDekIsT0FBTyxNQUFJLEtBQUssTUFBRyxDQUFDO0FBQ3RCLENBQUMsQ0FBQztBQUVGLElBQU0sdUJBQXVCLEdBQUcsVUFBQyxLQUFhO0lBQzVDLElBQUksQ0FBQyxLQUFLO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDekIsT0FBTyxVQUFRLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxNQUFHLENBQUM7QUFDOUMsQ0FBQyxDQUFDO0FBRUYsSUFBTSx1QkFBdUIsR0FBRyxVQUFDLEtBQWE7SUFDNUMsSUFBSSxDQUFDLEtBQUs7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUN6QixPQUFPLFFBQU0sS0FBSyxNQUFHLENBQUM7QUFDeEIsQ0FBQyxDQUFDO0FBRUYsSUFBTSxvQkFBb0IsR0FBRyxVQUFDLEtBQWE7SUFDekMsSUFBSSxDQUFDLEtBQUs7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUN6QixPQUFPLE1BQUksS0FBSyxNQUFHLENBQUM7QUFDdEIsQ0FBQyxDQUFDO0FBRUYsSUFBTSxpQkFBaUIsR0FBRyxVQUFDLElBQWMsRUFBRSxNQUFjO0lBQ3ZELElBQUksTUFBTSxHQUFhLEVBQUUsQ0FBQztJQUMxQixJQUFJLGlCQUFpQixHQUFHLE1BQU0sQ0FBQztJQUMvQixJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBRS9CLElBQUksaUJBQWlCLEdBQUcsVUFBVTtRQUFFLE9BQU8sTUFBTSxDQUFDO0lBQ2xELElBQUksTUFBTSxLQUFLLENBQUM7UUFBRSxpQkFBaUIsR0FBRyxDQUFDLENBQUM7SUFFeEMsSUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWpELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3ZDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDaEI7SUFFRCxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFFbEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDdkMsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNyQjtJQUVELE1BQU0sR0FBTyxNQUFNLFNBQUUsUUFBUSxFQUFDLENBQUM7SUFFL0IsT0FBTyxJQUFJLEVBQUU7UUFDWCxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNiLEtBQUssSUFBSSxDQUFDLEdBQUcsaUJBQWlCLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMvQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsVUFBVSxHQUFHLGlCQUFpQixFQUFFO2dCQUNyRCxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUNSLE1BQU07YUFDUDtTQUNGO1FBRUQsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDZCxNQUFNO1NBQ1A7UUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUNmLEtBQUssSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDaEQsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2pDO1FBRUQsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNkLEtBQWdCLFVBQU8sRUFBUCxtQkFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTyxFQUFFO1lBQXBCLElBQU0sQ0FBQyxnQkFBQTtZQUNWLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDckI7UUFFRCxNQUFNLEdBQU8sTUFBTSxTQUFFLFFBQVEsRUFBQyxDQUFDO0tBQ2hDO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFDIn0=