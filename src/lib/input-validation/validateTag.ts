/*
 * Copyright (c) 2019. AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { isEmpty, matches } from "validator";
import { Enum, ExtendEnum } from "../../types/types";
import { ErrorTypes } from "./constant/errorTypes";
import { validateLength, ValidateLengthErrorType } from "./validateLength";

export const ValidateTagErrorType = ExtendEnum(ValidateLengthErrorType, ErrorTypes.invalidFormat);
export type ValidateTagErrorType = Enum<typeof ValidateTagErrorType>;

export interface ValidateTagOptions {
  isRequired?: boolean;
}

export const validateTag = (value: string, { isRequired = true }: ValidateTagOptions = {}) => {
  const MAXIMUM_TAG_LENGTH = 30;
  const REGEX = "^[a-zA-Z0-9]+([_:-]{1}[a-zA-Z0-9]+)*$";
  if (isEmpty(value)) {
    if (!isRequired) {
      return null;
    }
    return ValidateTagErrorType.empty;
  }
  if (!matches(value, REGEX)) {
    return ValidateTagErrorType.invalidFormat;
  }
  return validateLength(value, { max: MAXIMUM_TAG_LENGTH });
};
