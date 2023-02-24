import { Buffer } from "buffer";

export const displayBytesAsHex = (displayBytes) => {
    if (displayBytes === undefined || displayBytes === null) {
        return "";
    }
    const hex = Buffer.from(displayBytes).toString('hex');
    return hex;
};

