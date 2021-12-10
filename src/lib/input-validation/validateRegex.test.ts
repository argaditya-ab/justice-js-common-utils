/*
 * Copyright (c) 2021. AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { validateRegex, ValidateRegexErrorType } from "./validateRegex";

const mockValidateRegex = jest.fn(validateRegex);
afterEach(mockValidateRegex.mockClear);
afterAll(mockValidateRegex.mockRestore);

describe("validateRegex returns correct output", () => {
  it("returns empty error string when given value that fulfill the regex", () => {
    mockValidateRegex("somevalue", "^[a-zA-Z0-9]{6,10}$");
    expect(mockValidateRegex).toHaveBeenCalledTimes(1);
    expect(mockValidateRegex).toHaveReturnedWith(null);
  });

  it("returns empty error string when given japanese value that fulfill the regex with allowUnicode", () => {
    mockValidateRegex("ジョンドー", "^[\\pL\\pN\\pM]*$", { allowUnicode: true });
    expect(mockValidateRegex).toHaveBeenCalledTimes(1);
    expect(mockValidateRegex).toHaveReturnedWith(null);
  });

  it("returns error string 'invalidFormat' when given a japanese string without allowUnicode", () => {
    mockValidateRegex("ジョンドー", "^[\\pL\\pN\\pM]*$");
    expect(mockValidateRegex).toHaveBeenCalledTimes(1);
    expect(mockValidateRegex).toHaveReturnedWith(ValidateRegexErrorType.invalidFormat);
  });

  it("returns error string 'invalidFormat' when given a string that didn't fulfill the regex", () => {
    mockValidateRegex("some", "^[a-zA-Z0-9]{6,10}$");
    expect(mockValidateRegex).toHaveBeenCalledTimes(1);
    expect(mockValidateRegex).toHaveReturnedWith(ValidateRegexErrorType.invalidFormat);
  });
});
