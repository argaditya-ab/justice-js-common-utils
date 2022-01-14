/*
 * Copyright (c) 2021. AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { validateRegex, ValidateRegexErrorType } from "../validateRegex";
import {
  DEFAULT_DISPLAYNAME_RULE,
  DEFAULT_PASSWORD_RULE, DEFAULT_USERNAME_RULE,
  generatePattern,
} from "./regexGenerator";

const mockValidateRegex = jest.fn(validateRegex);
afterEach(mockValidateRegex.mockClear);
afterAll(mockValidateRegex.mockRestore);

const usernameRegex = generatePattern(DEFAULT_USERNAME_RULE);
const displayNameRegex = generatePattern(DEFAULT_DISPLAYNAME_RULE);
const displayNameRegexWithUnicode = generatePattern({ ...DEFAULT_DISPLAYNAME_RULE, allowUnicode: true });
const passwordRegex = generatePattern(DEFAULT_PASSWORD_RULE);

describe("validateRegex returns correct output", () => {
  // Username validation test
  it("returns empty error string when given valid username", () => {
    mockValidateRegex("name-123", usernameRegex);
    expect(mockValidateRegex).toHaveBeenCalledTimes(1);
    expect(mockValidateRegex).toHaveReturnedWith(null);
  });

  it("returns empty error string when given username with repeating letters", () => {
    mockValidateRegex("nameeee", usernameRegex);
    expect(mockValidateRegex).toHaveBeenCalledTimes(1);
    expect(mockValidateRegex).toHaveReturnedWith(null);
  });

  it("returns empty error string when given valid username with mixed case, and repeating special character", () => {
    mockValidateRegex("Name--name", usernameRegex);
    expect(mockValidateRegex).toHaveBeenCalledTimes(1);
    expect(mockValidateRegex).toHaveReturnedWith(null);
  });

  it("returns empty error string when given valid username with only lowercase", () => {
    mockValidateRegex("name", usernameRegex);
    expect(mockValidateRegex).toHaveBeenCalledTimes(1);
    expect(mockValidateRegex).toHaveReturnedWith(null);
  });

  it("returns invalidFormat error string when given username started with special character", () => {
    mockValidateRegex("-name123", usernameRegex);
    expect(mockValidateRegex).toHaveBeenCalledTimes(1);
    expect(mockValidateRegex).toHaveReturnedWith(ValidateRegexErrorType.invalidFormat);
  });

  it("returns invalidFormat error string when given username ended with special character", () => {
    mockValidateRegex("-name123", usernameRegex);
    expect(mockValidateRegex).toHaveBeenCalledTimes(1);
    expect(mockValidateRegex).toHaveReturnedWith(ValidateRegexErrorType.invalidFormat);
  });

  it("returns invalidFormat error string when given username with invalid special character", () => {
    mockValidateRegex("name@@@123", usernameRegex);
    expect(mockValidateRegex).toHaveBeenCalledTimes(1);
    expect(mockValidateRegex).toHaveReturnedWith(ValidateRegexErrorType.invalidFormat);
  });

  it("returns invalidFormat error string when given username with space", () => {
    mockValidateRegex("name name", usernameRegex);
    expect(mockValidateRegex).toHaveBeenCalledTimes(1);
    expect(mockValidateRegex).toHaveReturnedWith(ValidateRegexErrorType.invalidFormat);
  });

  // Display Name validation test
  it("returns empty error string when given displayName with lowercase, number, and special character", () => {
    mockValidateRegex("name-123", displayNameRegex);
    expect(mockValidateRegex).toHaveBeenCalledTimes(1);
    expect(mockValidateRegex).toHaveReturnedWith(null);
  });

  it("returns empty error string when given displayName with uppercase, and special character", () => {
    mockValidateRegex("NAME.NAME", displayNameRegex);
    expect(mockValidateRegex).toHaveBeenCalledTimes(1);
    expect(mockValidateRegex).toHaveReturnedWith(null);
  });

  it("returns empty error string when given displayName with mixed case, and space in the middle", () => {
    mockValidateRegex("Name Name", displayNameRegex);
    expect(mockValidateRegex).toHaveBeenCalledTimes(1);
    expect(mockValidateRegex).toHaveReturnedWith(null);
  });

  it("returns empty error string when given displayName with only lowercase", () => {
    mockValidateRegex("name", displayNameRegex);
    expect(mockValidateRegex).toHaveBeenCalledTimes(1);
    expect(mockValidateRegex).toHaveReturnedWith(null);
  });

  it("returns empty error string when given displayName with japanese character", () => {
    mockValidateRegex("ジョンドー", displayNameRegexWithUnicode, { allowUnicode: true });
    expect(mockValidateRegex).toHaveBeenCalledTimes(1);
    expect(mockValidateRegex).toHaveReturnedWith(null);
  });

  it("returns invalidFormat error string when given displayName with japanese character without allowUnicode", () => {
    mockValidateRegex("ジョンドー", displayNameRegexWithUnicode);
    expect(mockValidateRegex).toHaveBeenCalledTimes(1);
    expect(mockValidateRegex).toHaveReturnedWith(ValidateRegexErrorType.invalidFormat);
  });

  it("returns invalidFormat error string when given displayName with space followed by special character -", () => {
    mockValidateRegex("name -123", displayNameRegex);
    expect(mockValidateRegex).toHaveBeenCalledTimes(1);
    expect(mockValidateRegex).toHaveReturnedWith(ValidateRegexErrorType.invalidFormat);
  });

  it("returns invalidFormat error string when given displayName started with special character", () => {
    mockValidateRegex("-name123", displayNameRegex);
    expect(mockValidateRegex).toHaveBeenCalledTimes(1);
    expect(mockValidateRegex).toHaveReturnedWith(ValidateRegexErrorType.invalidFormat);
  });

  it("returns invalidFormat error string when given displayName ended with special character", () => {
    mockValidateRegex("Name123-", displayNameRegex);
    expect(mockValidateRegex).toHaveBeenCalledTimes(1);
    expect(mockValidateRegex).toHaveReturnedWith(ValidateRegexErrorType.invalidFormat);
  });

  it("returns invalidFormat error string when given displayName ended with space", () => {
    mockValidateRegex("nn ", displayNameRegex);
    expect(mockValidateRegex).toHaveBeenCalledTimes(1);
    expect(mockValidateRegex).toHaveReturnedWith(ValidateRegexErrorType.invalidFormat);
  });

  it("returns invalidFormat error string when given displayName with double space", () => {
    mockValidateRegex("name  -123", displayNameRegex);
    expect(mockValidateRegex).toHaveBeenCalledTimes(1);
    expect(mockValidateRegex).toHaveReturnedWith(ValidateRegexErrorType.invalidFormat);
  });

  // Password validation test
  it("returns empty error string when given password with mixed case, number, and special character", () => {
    mockValidateRegex("Password@123", passwordRegex);
    expect(mockValidateRegex).toHaveBeenCalledTimes(1);
    expect(mockValidateRegex).toHaveReturnedWith(null);
  });

  it("returns empty error string when given password with repeating letters", () => {
    mockValidateRegex("Password@!$123", passwordRegex);
    expect(mockValidateRegex).toHaveBeenCalledTimes(1);
    expect(mockValidateRegex).toHaveReturnedWith(null);
  });

  it("returns invalidFormat error string when given password with letters exceed max repeating count", () => {
    mockValidateRegex("Passsword@123", passwordRegex);
    expect(mockValidateRegex).toHaveBeenCalledTimes(1);
    expect(mockValidateRegex).toHaveReturnedWith(ValidateRegexErrorType.invalidFormat);
  });

  it("returns invalidFormat error string when given password with only lowercase", () => {
    mockValidateRegex("newpassword", passwordRegex);
    expect(mockValidateRegex).toHaveBeenCalledTimes(1);
    expect(mockValidateRegex).toHaveReturnedWith(ValidateRegexErrorType.invalidFormat);
  });

  it("returns invalidFormat error string when given password with only lower case and number", () => {
    mockValidateRegex("newpass123", passwordRegex);
    expect(mockValidateRegex).toHaveBeenCalledTimes(1);
    expect(mockValidateRegex).toHaveReturnedWith(ValidateRegexErrorType.invalidFormat);
  });

  // tslint:disable-next-line:max-line-length
  it("returns invalidFormat error string when given password with special characters exceed max repeating count", () => {
    mockValidateRegex("Password@@@123", passwordRegex);
    expect(mockValidateRegex).toHaveBeenCalledTimes(1);
    expect(mockValidateRegex).toHaveReturnedWith(ValidateRegexErrorType.invalidFormat);
  });
});
