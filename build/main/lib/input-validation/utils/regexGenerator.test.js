"use strict";
/*
 * Copyright (c) 2021. AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var validateRegex_1 = require("../validateRegex");
var regexGenerator_1 = require("./regexGenerator");
var mockValidateRegex = jest.fn(validateRegex_1.validateRegex);
afterEach(mockValidateRegex.mockClear);
afterAll(mockValidateRegex.mockRestore);
var usernameRegex = regexGenerator_1.generatePattern(regexGenerator_1.DEFAULT_USERNAME_RULE);
var displayNameRegex = regexGenerator_1.generatePattern(regexGenerator_1.DEFAULT_DISPLAYNAME_RULE);
var displayNameRegexWithUnicode = regexGenerator_1.generatePattern(__assign({}, regexGenerator_1.DEFAULT_DISPLAYNAME_RULE, { allowUnicode: true }));
var passwordRegex = regexGenerator_1.generatePattern(regexGenerator_1.DEFAULT_PASSWORD_RULE);
describe("validateRegex returns correct output", function () {
    // Username validation test
    it("returns empty error string when given valid username", function () {
        mockValidateRegex("name-123", usernameRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(null);
    });
    it("returns empty error string when given username with repeating letters", function () {
        mockValidateRegex("nameeee", usernameRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(null);
    });
    it("returns empty error string when given valid username with mixed case, and repeating special character", function () {
        mockValidateRegex("Name--name", usernameRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(null);
    });
    it("returns empty error string when given valid username with only lowercase", function () {
        mockValidateRegex("name", usernameRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(null);
    });
    it("returns invalidFormat error string when given username started with special character", function () {
        mockValidateRegex("-name123", usernameRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(validateRegex_1.ValidateRegexErrorType.invalidFormat);
    });
    it("returns invalidFormat error string when given username ended with special character", function () {
        mockValidateRegex("-name123", usernameRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(validateRegex_1.ValidateRegexErrorType.invalidFormat);
    });
    it("returns invalidFormat error string when given username with invalid special character", function () {
        mockValidateRegex("name@@@123", usernameRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(validateRegex_1.ValidateRegexErrorType.invalidFormat);
    });
    it("returns invalidFormat error string when given username with space", function () {
        mockValidateRegex("name name", usernameRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(validateRegex_1.ValidateRegexErrorType.invalidFormat);
    });
    // Display Name validation test
    it("returns empty error string when given displayName with lowercase, number, and special character", function () {
        mockValidateRegex("name-123", displayNameRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(null);
    });
    it("returns empty error string when given displayName with uppercase, and special character", function () {
        mockValidateRegex("NAME.NAME", displayNameRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(null);
    });
    it("returns empty error string when given displayName with mixed case, and space in the middle", function () {
        mockValidateRegex("Name Name", displayNameRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(null);
    });
    it("returns empty error string when given displayName with only lowercase", function () {
        mockValidateRegex("name", displayNameRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(null);
    });
    it("returns empty error string when given displayName with japanese character", function () {
        mockValidateRegex("ジョンドー", displayNameRegexWithUnicode, { allowUnicode: true });
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(null);
    });
    it("returns invalidFormat error string when given displayName with japanese character without allowUnicode", function () {
        mockValidateRegex("ジョンドー", displayNameRegexWithUnicode);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(validateRegex_1.ValidateRegexErrorType.invalidFormat);
    });
    it("returns invalidFormat error string when given displayName with space followed by special character -", function () {
        mockValidateRegex("name -123", displayNameRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(validateRegex_1.ValidateRegexErrorType.invalidFormat);
    });
    it("returns invalidFormat error string when given displayName started with special character", function () {
        mockValidateRegex("-name123", displayNameRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(validateRegex_1.ValidateRegexErrorType.invalidFormat);
    });
    it("returns invalidFormat error string when given displayName ended with special character", function () {
        mockValidateRegex("Name123-", displayNameRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(validateRegex_1.ValidateRegexErrorType.invalidFormat);
    });
    it("returns invalidFormat error string when given displayName ended with space", function () {
        mockValidateRegex("nn ", displayNameRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(validateRegex_1.ValidateRegexErrorType.invalidFormat);
    });
    it("returns invalidFormat error string when given displayName with double space", function () {
        mockValidateRegex("name  -123", displayNameRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(validateRegex_1.ValidateRegexErrorType.invalidFormat);
    });
    // Password validation test
    it("returns empty error string when given password with mixed case, number, and special character", function () {
        mockValidateRegex("Password@123", passwordRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(null);
    });
    it("returns empty error string when given password with repeating letters", function () {
        mockValidateRegex("Password@!$123", passwordRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(null);
    });
    it("returns invalidFormat error string when given password with letters exceed max repeating count", function () {
        mockValidateRegex("Passsword@123", passwordRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(validateRegex_1.ValidateRegexErrorType.invalidFormat);
    });
    it("returns invalidFormat error string when given password with only lowercase", function () {
        mockValidateRegex("newpassword", passwordRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(validateRegex_1.ValidateRegexErrorType.invalidFormat);
    });
    it("returns invalidFormat error string when given password with only lower case and number", function () {
        mockValidateRegex("newpass123", passwordRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(validateRegex_1.ValidateRegexErrorType.invalidFormat);
    });
    // tslint:disable-next-line:max-line-length
    it("returns invalidFormat error string when given password with special characters exceed max repeating count", function () {
        mockValidateRegex("Password@@@123", passwordRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(validateRegex_1.ValidateRegexErrorType.invalidFormat);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnZXhHZW5lcmF0b3IudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvaW5wdXQtdmFsaWRhdGlvbi91dGlscy9yZWdleEdlbmVyYXRvci50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHOzs7Ozs7Ozs7Ozs7O0FBRUgsa0RBQXlFO0FBQ3pFLG1EQUkwQjtBQUUxQixJQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsNkJBQWEsQ0FBQyxDQUFDO0FBQ2pELFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN2QyxRQUFRLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7QUFFeEMsSUFBTSxhQUFhLEdBQUcsZ0NBQWUsQ0FBQyxzQ0FBcUIsQ0FBQyxDQUFDO0FBQzdELElBQU0sZ0JBQWdCLEdBQUcsZ0NBQWUsQ0FBQyx5Q0FBd0IsQ0FBQyxDQUFDO0FBQ25FLElBQU0sMkJBQTJCLEdBQUcsZ0NBQWUsY0FBTSx5Q0FBd0IsSUFBRSxZQUFZLEVBQUUsSUFBSSxJQUFHLENBQUM7QUFDekcsSUFBTSxhQUFhLEdBQUcsZ0NBQWUsQ0FBQyxzQ0FBcUIsQ0FBQyxDQUFDO0FBRTdELFFBQVEsQ0FBQyxzQ0FBc0MsRUFBRTtJQUMvQywyQkFBMkI7SUFDM0IsRUFBRSxDQUFDLHNEQUFzRCxFQUFFO1FBQ3pELGlCQUFpQixDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUM3QyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRCxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyRCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx1RUFBdUUsRUFBRTtRQUMxRSxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFD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