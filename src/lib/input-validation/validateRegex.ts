/*
 * Copyright (c) 2021. AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { matches } from "validator";
import XRegExp from "xregexp";
import { Enum } from "../../types/types";
import { CommonValidationErrorType } from "./constant/errorType";

export const ValidateRegexErrorType = Enum(CommonValidationErrorType.invalidFormat);
export type ValidateRegexErrorType = Enum<typeof ValidateRegexErrorType>;

export interface ValidateRegexOptions {
  allowUnicode?: boolean
}

export const validateRegex = (value: string, regex: string, { allowUnicode = false }: ValidateRegexOptions = {}) => {
  if (allowUnicode && !XRegExp(regex).test(value)) {
    return ValidateRegexErrorType.invalidFormat;
  }

  if (!allowUnicode && !matches(value, regex)) {
    return ValidateRegexErrorType.invalidFormat;
  }

  return null;
};
