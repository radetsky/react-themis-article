import { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';


const TextAreaWithSingleButton = ({text, btnLabel, textareaDisabled, onSubmit}) => {

    const [value, setValue] = useState(text);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(value);

    }

    useEffect(() => {
        if (text !== '' && text !== value) {
            setValue(text);
        }
    }, [text]);

    return (
        <form onSubmit={ e => handleSubmit(e) }>
            <div>
                <textarea className="textarea" disabled={textareaDisabled}
                value={ value }
                onChange={ e => setValue(e.target.value) } />
            </div>
            <div>
                <Button variant="primary" type="submit">
                    {btnLabel}
                </Button>
            </div>
        </form>
    )
}

export default TextAreaWithSingleButton;