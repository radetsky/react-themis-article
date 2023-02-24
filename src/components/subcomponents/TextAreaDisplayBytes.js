import { Button } from 'react-bootstrap';
import { Buffer } from 'buffer';


const TextAreaDisplayBytes = ({ displayBytes, btnLabel, onSubmit }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    const displayBytesAsHex = () => {
        if (displayBytes === undefined || displayBytes === null) {
            return "";
        }
        const hex = Buffer.from(displayBytes).toString('hex');
        return hex;
    }


    return (
        <form onSubmit={ e => handleSubmit(e) }>
            <div>
                <textarea className="textarea" disabled={ true }
                    value={ displayBytesAsHex() } />
            </div>
            <div>
                <Button variant="primary" type="submit">
                    { btnLabel }
                </Button>
            </div>
        </form>
    );
};

export default TextAreaDisplayBytes;