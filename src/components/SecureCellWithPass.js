import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import { initialize, SecureCellSeal } from 'wasm-themis';
import { Buffer } from 'buffer';

import { displayBytesAsHex } from "./utils/DisplayBytesAsHex";


export const SecureCellWithPassphrase = () => {

    const [value, setValue] = useState('');
    const [encryptedValue, setEncryptedValue] = useState('');

    const contextRef = useRef(null);
    const passwordRef = useRef(null);

    useEffect(() => {
        async function init() {
            try {
                return await initialize();
            } catch (error) {
                console.log(error);
            }
        }
        init();
    }, []);

    const handleSubmitEncrypt = (e) => {
        e.preventDefault();
        // We can skip validation here because of HTML5 validation activated
        // by the "required" and "pattern" attributes.

        const contextPlainText = contextRef.current.value;
        const passwordPlainText = passwordRef.current.value;
        const messagePlainText = value;

        // create Secure Cell object in Seal mode to encrypt
        const cell = SecureCellSeal.withPassphrase(passwordPlainText);

        // prepare bytes array for encryption
        const plaintext = new Uint8Array(Buffer.from(messagePlainText));
        const context = new Uint8Array(Buffer.from(contextPlainText));

        try {
            const encrypted = cell.encrypt(plaintext, context);
            setEncryptedValue(encrypted);
        }
        catch (error) {
            alert(error);
        }
    }

    const handleSubmitDecrypt = (e) => {
        // We can not skip validation here, but we want to show the error here
        const contextPlainText = contextRef.current.value;
        const passwordPlainText = passwordRef.current.value;

        // create Secure Cell object in Seal mode to encrypt
        try {
            const cell = SecureCellSeal.withPassphrase(passwordPlainText);
            // prepare bytes array for encryption
            const context = new Uint8Array(Buffer.from(contextPlainText));
            const decryptedBytes = cell.decrypt(encryptedValue, context);
            const decrypted = Buffer.from(decryptedBytes).toString();
            setValue(decrypted);
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
                        SecureCell with the passphrase
                    </h1>
                </Col>
            </Row>
            <Row>
                <Col>
                <Container>
                    <Form onSubmit={ e => handleSubmitEncrypt(e)}>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Context</Form.Label>
                                    <Form.Control ref={ contextRef } type="text" placeholder="Optional context"/>
                                    <Form.Text className="text-muted">
                                            Context is an optional parameter. You can leave it empty.
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control ref={ passwordRef } type="text" placeholder="Password" required="required" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant="primary" type="submit">
                                    Encrypt
                                </Button>
                            </Col>
                            <Col>
                                <Button variant="primary" onClick={ () => handleSubmitDecrypt()}>
                                    Decrypt
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    </Container>
                </Col>
            </Row>
            <Row>
                <Col>
                    <textarea className="textarea" value={ value }
                        onChange={ e => setValue(e.target.value) } />
                </Col>
                <Col>
                    <textarea className="textarea" value={ displayBytesAsHex(encryptedValue) } disabled/>
                </Col>

            </Row>

        </Container>
    )
}