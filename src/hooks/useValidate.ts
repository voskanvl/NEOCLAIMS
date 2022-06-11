import { useState } from "react";

export enum Valid {
    invalid = 0,
    valid,
    undefined,
}

export const useValidate = () => {
    const [valid, setValid] = useState<Valid>(Valid.undefined);
    const validate = (val: string, pattern: RegExp) => {
        const result = pattern.test(val);
        setValid(+!!result);
    };
    return { valid, validate };
};
