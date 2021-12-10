import { Enum } from "../../types/types";
export declare const ValidateRegexErrorType: Readonly<{
    invalidFormat: "invalidFormat";
}>;
export declare type ValidateRegexErrorType = Enum<typeof ValidateRegexErrorType>;
export interface ValidateRegexOptions {
    allowUnicode?: boolean;
}
export declare const validateRegex: (value: string, regex: string, { allowUnicode }?: ValidateRegexOptions) => "invalidFormat" | null;
