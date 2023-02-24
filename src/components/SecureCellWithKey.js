import { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { initialize, SecureCellSeal, SymmetricKey } from 'wasm-themis';
import { Buffer } from 'buffer';
import DisplayBytes from './subcomponents/DisplayBytes';
import { displayBytesAsHex } from './utils/DisplayBytesAsHex';


export const SecureCellWithKey = () => {
    const [symKey, setSymKey] = useState(undefined);
    const [clearTextValue, setClearTextValue] = useState('');
    const [encryptedValue, setEncryptedValue] = useState('');

    useEffect(() => {
        async function init() {
            await initialize();
            const symKey = new SymmetricKey();
            setSymKey(symKey);
        }
        init();
    }, []);

    const encrypt = (clearText, symmetric_key) => {
        // create Secure Cell object in Seal mode to encrypt
        const cell = SecureCellSeal.withKey(symmetric_key);
        // encrypt
        try {
            const encrypted = cell.encrypt(new Uint8Array(Buffer.from(clearText)));
            setEncryptedValue(encrypted);
        }
        catch (error) {
            alert(error);
        }
    }

    const decrypt = (encrypted, symmetric_key) => {
        // create Secure Cell object in Seal mode to decrypt
        const cell = SecureCellSeal.withKey(symmetric_key);
        // decrypt
        try {
            const decrypted = Buffer.from(cell.decrypt(encrypted)).toString();
            setClearTextValue(decrypted);
        }
        catch (error) {
            alert(error);
        }
    }

    return (
        <Container fluid>
            <Row>
                <Col>
                    <h1>
                        SecureCell with the key
                    </h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <DisplayBytes bytes={symKey} />
                    <Button onClick={() => {
                        setSymKey(new SymmetricKey())
                    }} variant="primary">Generate new key</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    Clear text data to encrypt with the key
                </Col>
                <Col>
                    Encrypted data to decrypt with the key
                </Col>
            </Row>
            <Row>
                <Col>
                    <textarea className="textarea"
                        value={ clearTextValue }
                        onChange={ e => setClearTextValue(e.target.value) } />
                    <Button onClick={ () => { encrypt(clearTextValue, symKey) } } variant="primary">Encrypt</Button>
                </Col>
                <Col>
                    <textarea className="textarea" disabled={ true }
                        value={ displayBytesAsHex(encryptedValue) } />
                    <Button onClick={ () => { decrypt(encryptedValue, symKey) } } variant="primary">Decrypt</Button>
                </Col>
            </Row>
        </Container>
    )
}