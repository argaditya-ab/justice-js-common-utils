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
import { validateRegex, ValidateRegexErrorType } from "../validateRegex";
import { DEFAULT_DISPLAYNAME_RULE, DEFAULT_PASSWORD_RULE, DEFAULT_USERNAME_RULE, generatePattern, } from "./regexGenerator";
var mockValidateRegex = jest.fn(validateRegex);
afterEach(mockValidateRegex.mockClear);
afterAll(mockValidateRegex.mockRestore);
var usernameRegex = generatePattern(DEFAULT_USERNAME_RULE);
var displayNameRegex = generatePattern(DEFAULT_DISPLAYNAME_RULE);
var displayNameRegexWithUnicode = generatePattern(__assign({}, DEFAULT_DISPLAYNAME_RULE, { allowUnicode: true }));
var passwordRegex = generatePattern(DEFAULT_PASSWORD_RULE);
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
        expect(mockValidateRegex).toHaveReturnedWith(ValidateRegexErrorType.invalidFormat);
    });
    it("returns invalidFormat error string when given username ended with special character", function () {
        mockValidateRegex("-name123", usernameRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(ValidateRegexErrorType.invalidFormat);
    });
    it("returns invalidFormat error string when given username with invalid special character", function () {
        mockValidateRegex("name@@@123", usernameRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(ValidateRegexErrorType.invalidFormat);
    });
    it("returns invalidFormat error string when given username with space", function () {
        mockValidateRegex("name name", usernameRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(ValidateRegexErrorType.invalidFormat);
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
        expect(mockValidateRegex).toHaveReturnedWith(ValidateRegexErrorType.invalidFormat);
    });
    it("returns invalidFormat error string when given displayName with space followed by special character -", function () {
        mockValidateRegex("name -123", displayNameRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(ValidateRegexErrorType.invalidFormat);
    });
    it("returns invalidFormat error string when given displayName started with special character", function () {
        mockValidateRegex("-name123", displayNameRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(ValidateRegexErrorType.invalidFormat);
    });
    it("returns invalidFormat error string when given displayName ended with special character", function () {
        mockValidateRegex("Name123-", displayNameRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(ValidateRegexErrorType.invalidFormat);
    });
    it("returns invalidFormat error string when given displayName ended with space", function () {
        mockValidateRegex("nn ", displayNameRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(ValidateRegexErrorType.invalidFormat);
    });
    it("returns invalidFormat error string when given displayName with double space", function () {
        mockValidateRegex("name  -123", displayNameRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(ValidateRegexErrorType.invalidFormat);
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
        expect(mockValidateRegex).toHaveReturnedWith(ValidateRegexErrorType.invalidFormat);
    });
    it("returns invalidFormat error string when given password with only lowercase", function () {
        mockValidateRegex("newpassword", passwordRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(ValidateRegexErrorType.invalidFormat);
    });
    it("returns invalidFormat error string when given password with only lower case and number", function () {
        mockValidateRegex("newpass123", passwordRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(ValidateRegexErrorType.invalidFormat);
    });
    // tslint:disable-next-line:max-line-length
    it("returns invalidFormat error string when given password with special characters exceed max repeating count", function () {
        mockValidateRegex("Password@@@123", passwordRegex);
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(ValidateRegexErrorType.invalidFormat);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnZXhHZW5lcmF0b3IudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvaW5wdXQtdmFsaWRhdGlvbi91dGlscy9yZWdleEdlbmVyYXRvci50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7Ozs7Ozs7Ozs7OztBQUVILE9BQU8sRUFBRSxhQUFhLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN6RSxPQUFPLEVBQ0wsd0JBQXdCLEVBQ3hCLHFCQUFxQixFQUFFLHFCQUFxQixFQUM1QyxlQUFlLEdBQ2hCLE1BQU0sa0JBQWtCLENBQUM7QUFFMUIsSUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2pELFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN2QyxRQUFRLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7QUFFeEMsSUFBTSxhQUFhLEdBQUcsZUFBZSxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDN0QsSUFBTSxnQkFBZ0IsR0FBRyxlQUFlLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUNuRSxJQUFNLDJCQUEyQixHQUFHLGVBQWUsY0FBTSx3QkFBd0IsSUFBRSxZQUFZLEVBQUUsSUFBSSxJQUFHLENBQUM7QUFDekcsSUFBTSxhQUFhLEdBQUcsZUFBZSxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFFN0QsUUFBUSxDQUFDLHNDQUFzQyxFQUFFO0lBQy9DLDJCQUEyQjtJQUMzQixFQUFFLENBQUMsc0RBQXNELEVBQUU7UUFDekQsaUJBQWlCLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25ELE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLGtCQUFrQixD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LENBQUMseUZBQXlGLEVBQUU7UUFDNUYsaUJBQWlCLENBQUMsV0FBVyxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDakQsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckQsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsNEZBQTRGLEVBQUU7UUFDL0YsaUJBQWlCLENBQUMsV0FBVyxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDakQsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckQsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsdUVBQXVFLEVBQUU7UUFDMUUsaUJBQWlCLENBQUMsTUFBTSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDNUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckQsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsMkVBQTJFLEVBQUU7UUFDOUUsaUJBQWlCLENBQUMsT0FBTyxFQUFFLDJCQUEyQixFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDaEYsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckQsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsd0dBQXdHLEVBQUU7UUFDM0csaUJBQWlCLENBQUMsT0FBTyxFQUFFLDJCQUEyQixDQUFDLENBQUM7UUFDeEQsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsa0JBQWtCLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDckYsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsc0dBQXNHLEVBQUU7UUFDekcsaUJBQWlCLENBQUMsV0FBVyxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDakQsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsa0JBQWtCLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDckYsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsMEZBQTBGLEVBQUU7UUFDN0YsaUJBQWlCLENBQUMsVUFBVSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDaEQsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsa0JBQWtCLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDckYsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsd0ZBQXdGLEVBQUU7UUFDM0YsaUJBQWlCLENBQUMsVUFBVSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDaEQsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsa0JBQWtCLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDckYsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsNEVBQTRFLEVBQUU7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