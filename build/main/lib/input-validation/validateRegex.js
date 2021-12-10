"use strict";
/*
 * Copyright (c) 2021. AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("validator");
var xregexp_1 = __importDefault(require("xregexp"));
var types_1 = require("../../types/types");
var errorType_1 = require("./constant/errorType");
exports.ValidateRegexErrorType = types_1.Enum(errorType_1.CommonValidationErrorType.invalidFormat);
exports.validateRegex = function (value, regex, _a) {
    var _b = (_a === void 0 ? {} : _a).allowUnicode, allowUnicode = _b === void 0 ? false : _b;
    if (allowUnicode && !xregexp_1.default(regex).test(value)) {
        return exports.ValidateRegexErrorType.invalidFormat;
    }
    if (!allowUnicode && !validator_1.matches(value, regex)) {
        return exports.ValidateRegexErrorType.invalidFormat;
    }
    return null;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGVSZWdleC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvaW5wdXQtdmFsaWRhdGlvbi92YWxpZGF0ZVJlZ2V4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHOzs7OztBQUVILHVDQUFvQztBQUNwQyxvREFBOEI7QUFDOUIsMkNBQXlDO0FBQ3pDLGtEQUFpRTtBQUVwRCxRQUFBLHNCQUFzQixHQUFHLFlBQUksQ0FBQyxxQ0FBeUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQU92RSxRQUFBLGFBQWEsR0FBRyxVQUFDLEtBQWEsRUFBRSxLQUFhLEVBQUUsRUFBbUQ7UUFBakQsMkNBQW9CLEVBQXBCLHlDQUFvQjtJQUNoRixJQUFJLFlBQVksSUFBSSxDQUFDLGlCQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQy9DLE9BQU8sOEJBQXNCLENBQUMsYUFBYSxDQUFDO0tBQzdDO0lBRUQsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLG1CQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFO1FBQzNDLE9BQU8sOEJBQXNCLENBQUMsYUFBYSxDQUFDO0tBQzdDO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDLENBQUMifQ==