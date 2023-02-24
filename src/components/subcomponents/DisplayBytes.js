import { displayBytesAsHex } from "../utils/DisplayBytesAsHex";

const DisplayBytes = ({ bytes, maxlen = 0 }) => {
    const hexString = displayBytesAsHex(bytes);
    if (maxlen === 0) {
        return (
            <div>
                <p className="text-monospace">{hexString}</p>
            </div>
        );
    }
    // spllit hexString into chunks of maxlen characters
    const chunks = hexString.match(new RegExp(`.{1,${maxlen}}`, 'g'));
    if (!chunks) {
        return (
            <div>
                <p className="text-monospace">{hexString}</p>
            </div>
        );
    }
    return (
        <div>
            {chunks.map((chunk, index) => {
                return (
                    <p key={index} className="text-monospace-with-chunks">{chunk}</p>
                );
            }
            )}
        </div>
    );
}

export default DisplayBytes;