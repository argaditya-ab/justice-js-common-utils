"use strict";
/*
 * Copyright (c) 2021. AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var validateRegex_1 = require("./validateRegex");
var mockValidateRegex = jest.fn(validateRegex_1.validateRegex);
afterEach(mockValidateRegex.mockClear);
afterAll(mockValidateRegex.mockRestore);
describe("validateRegex returns correct output", function () {
    it("returns empty error string when given value that fulfill the regex", function () {
        mockValidateRegex("somevalue", "^[a-zA-Z0-9]{6,10}$");
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(null);
    });
    it("returns empty error string when given japanese value that fulfill the regex with allowUnicode", function () {
        mockValidateRegex("ジョンドー", "^[\\pL\\pN\\pM]*$", { allowUnicode: true });
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(null);
    });
    it("returns error string 'invalidFormat' when given a japanese string without allowUnicode", function () {
        mockValidateRegex("ジョンドー", "^[\\pL\\pN\\pM]*$");
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(validateRegex_1.ValidateRegexErrorType.invalidFormat);
    });
    it("returns error string 'invalidFormat' when given a string that didn't fulfill the regex", function () {
        mockValidateRegex("some", "^[a-zA-Z0-9]{6,10}$");
        expect(mockValidateRegex).toHaveBeenCalledTimes(1);
        expect(mockValidateRegex).toHaveReturnedWith(validateRegex_1.ValidateRegexErrorType.invalidFormat);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGVSZWdleC50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9pbnB1dC12YWxpZGF0aW9uL3ZhbGlkYXRlUmVnZXgudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRzs7QUFFSCxpREFBd0U7QUFFeEUsSUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLDZCQUFhLENBQUMsQ0FBQztBQUNqRCxTQUFTLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDdkMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBRXhDLFFBQVEsQ0FBQyxzQ0FBc0MsRUFBRTtJQUMvQyxFQUFFLENBQUMsb0VBQW9FLEVBQUU7UUFDdkUsaUJBQWlCLENBQUMsV0FBVyxFQUFFLHFCQUFxQixDQUFDLENBQUM7UUFDdEQsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckQsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsK0ZBQStGLEVBQUU7UUFDbEcsaUJBQWlCLENBQUMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDeEUsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckQsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsd0ZBQXdGLEVBQUU7UUFDM0YsaUJBQWlCLENBQUMsT0FBTyxFQUFFLG1CQUFtQixDQUFDLENBQUM7UUFDaEQsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsa0JBQWtCLENBQUMsc0NBQXNCLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDckYsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsd0ZBQXdGLEVBQUU7UUFDM0YsaUJBQWlCLENBQUMsTUFBTSxFQUFFLHFCQUFxQixDQUFDLENBQUM7UUFDakQsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsa0JBQWtCLENBQUMsc0NBQXNCLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDckYsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9