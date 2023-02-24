import { Container, Row, Col, Button } from "react-bootstrap";
import DisplayBytes from "./subcomponents/DisplayBytes";
import { initialize, KeyPair, SecureMessageSign, SecureMessageVerify, SecureMessage } from "wasm-themis";
import { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import { displayBytesAsHex } from "./utils/DisplayBytesAsHex";


export const SecureMessageEncryptExample = () => {
    const [aliceKeyPair, setAliceKeyPair] = useState(undefined);
    const [bobKeyPair, setBobKeyPair] = useState(undefined);
    const [aliceMessage, setAliceMessage] = useState("");
    const [bobMessage, setBobMessage] = useState("");
    const [aliceSignedMessage, setAliceSignedMessage] = useState(undefined);
    const [bobSignedMessage, setBobSignedMessage] = useState(undefined);

    useEffect(() => {
        async function init() {
            try {
                await initialize();
                const aliceKeyPair = new KeyPair();
                const bobKeyPair = new KeyPair();
                setAliceKeyPair(aliceKeyPair);
                setBobKeyPair(bobKeyPair);
            } catch (error) {
                console.log(error);
            }
        }
        init();
    }, []);

    const aliceToBob = () => {
        if (aliceKeyPair && bobKeyPair && aliceMessage) {
            // bobKeyPair.publicKey is the public key of Bob and received securely in real life
            const secureMessage = new SecureMessage(aliceKeyPair.privateKey, bobKeyPair.publicKey);
            const message = new Uint8Array(Buffer.from(aliceMessage));
            const signedMessage = secureMessage.encrypt(message);
            setBobSignedMessage(signedMessage);
        }
    };
    const bobToAlice = () => {
        if (aliceKeyPair && bobKeyPair && bobMessage) {
            const secureMessage = new SecureMessage(bobKeyPair.privateKey, aliceKeyPair.publicKey);
            const message = new Uint8Array(Buffer.from(bobMessage));
            const signedMessage = secureMessage.encrypt(message);
            setAliceSignedMessage(signedMessage);
        }
    };
    const decryptFromAlice = () => {
        if (aliceKeyPair && bobKeyPair && bobSignedMessage) {
            const secureMessage = new SecureMessage(bobKeyPair.privateKey, aliceKeyPair.publicKey);
            const verifiedMessage = Buffer.from(secureMessage.decrypt(bobSignedMessage)).toString();
            setBobMessage(verifiedMessage);
        }
    };
    const decryptFromBob = () => {
        if (aliceKeyPair && bobKeyPair && aliceSignedMessage) {
            const secureMessage = new SecureMessage(aliceKeyPair.privateKey, bobKeyPair.publicKey);
            const verifiedMessage = Buffer.from(secureMessage.decrypt(aliceSignedMessage)).toString();
            setAliceMessage(verifiedMessage);
        }
    }


    return (
        <Container fluid>
            <Row>
                <h1>
                    Secure Message encryption mode
                </h1>
            </Row>
            <Row>
                <Col>
                    <h2>Alice</h2>
                </Col>
                <Col>
                    <h2>Bob</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3>Keys</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    Alice private key
                    <DisplayBytes bytes={ aliceKeyPair ? aliceKeyPair.privateKey : undefined } maxlen={ 40 } />
                </Col>
                <Col>
                    Bob private key
                    <DisplayBytes bytes={ bobKeyPair ? bobKeyPair.privateKey : undefined } maxlen={ 40 } />
                </Col>
            </Row>
            <Row>
                <Col>
                    Alice public key
                    <DisplayBytes bytes={ aliceKeyPair ? aliceKeyPair.publicKey : undefined } maxlen={ 40 } />

                </Col>
                <Col>
                    Bob public key
                    <DisplayBytes bytes={ bobKeyPair ? bobKeyPair.publicKey : undefined } maxlen={ 40 } />
                </Col>
            </Row>
            <Row>
                <Col>
                    <textarea className="textarea" value={ aliceMessage }
                        onChange={ e => setAliceMessage(e.target.value) } />
                </Col>
                <Col>
                    <textarea className="textarea" value={ bobMessage }
                        onChange={ e => setBobMessage(e.target.value) } />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="primary" onClick={ () => aliceToBob() }>Send to Bob</Button>
                </Col>
                <Col>
                    <Button variant="primary" onClick={ () => bobToAlice() }>Send to Alice</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <textarea className="textarea" value={ displayBytesAsHex(aliceSignedMessage) } disabled />
                </Col>
                <Col>
                    <textarea className="textarea" value={ displayBytesAsHex(bobSignedMessage) } disabled />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="primary" onClick={ () => decryptFromBob() }>Verify from Bob</Button>
                </Col>
                <Col>
                    <Button variant="primary" onClick={ () => decryptFromAlice() }>Verify from Alice</Button>
                </Col>
            </Row>
        </Container>
    )
}