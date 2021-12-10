/*
 * Copyright (c) 2021. AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */
import { matches } from "validator";
import XRegExp from "xregexp";
import { Enum } from "../../types/types";
import { CommonValidationErrorType } from "./constant/errorType";
export var ValidateRegexErrorType = Enum(CommonValidationErrorType.invalidFormat);
export var validateRegex = function (value, regex, _a) {
    var _b = (_a === void 0 ? {} : _a).allowUnicode, allowUnicode = _b === void 0 ? false : _b;
    if (allowUnicode && !XRegExp(regex).test(value)) {
        return ValidateRegexErrorType.invalidFormat;
    }
    if (!allowUnicode && !matches(value, regex)) {
        return ValidateRegexErrorType.invalidFormat;
    }
    return null;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGVSZWdleC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvaW5wdXQtdmFsaWRhdGlvbi92YWxpZGF0ZVJlZ2V4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3BDLE9BQU8sT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUM5QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDekMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFakUsTUFBTSxDQUFDLElBQU0sc0JBQXNCLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBT3BGLE1BQU0sQ0FBQyxJQUFNLGFBQWEsR0FBRyxVQUFDLEtBQWEsRUFBRSxLQUFhLEVBQUUsRUFBbUQ7UUFBakQsMkNBQW9CLEVBQXBCLHlDQUFvQjtJQUNoRixJQUFJLFlBQVksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDL0MsT0FBTyxzQkFBc0IsQ0FBQyxhQUFhLENBQUM7S0FDN0M7SUFFRCxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRTtRQUMzQyxPQUFPLHNCQUFzQixDQUFDLGFBQWEsQ0FBQztLQUM3QztJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQyxDQUFDIn0=