import { initialize, SymmetricKey, KeyPair } from "wasm-themis"
import { useState, useEffect } from "react"
import DisplayBytes from "./subcomponents/DisplayBytes";
import { Button, Stack, Container, Row } from 'react-bootstrap';

export const KeyGen = () => {
    const [symKey, setSymKey] = useState(undefined)
    const [keyPair, setKeyPair] = useState(undefined)

    useEffect(() => {
        async function init() {
            await initialize();
            const symKey = new SymmetricKey();
            setSymKey(symKey);
            const keyPair = new KeyPair();
            setKeyPair(keyPair);
        }
        init();
    }, []);

    return (
        <div>
            <h1>Key generation</h1>
            <h2>Generate a symmetric key</h2>
            <h4>Symmetric encryption is a type of encryption where only one key (a secret key) is used to both encrypt and decrypt electronic data. The entities communicating via symmetric encryption must exchange the key so that it can be used in the decryption process.</h4>
            <DisplayBytes bytes={symKey} />
            <Button onClick={() => {
                setSymKey(new SymmetricKey())
            }} variant="primary">Generate new key</Button>
            <h2>Asymmetric key pair</h2>
            <h4>Public-key cryptography, or asymmetric cryptography, is a cryptographic system that uses pairs of keys. Each pair consists of a public key (which may be known to others) and a private key (which may not be known by anyone except the owner). Effective security requires keeping the private key private; the public key can be openly distributed without compromising security.</h4>
            <Container>
                <Row className="justify-content-center">
                    <Stack direction="horizontal" gap={2}>
                        <p> Private key: </p>
                        <DisplayBytes bytes={keyPair ? keyPair.privateKey : undefined} />
                    </Stack>
                    <Stack direction="horizontal" gap={2}>
                        <p> Public key: </p>
                        <DisplayBytes bytes={keyPair ? keyPair.publicKey : undefined} />
                    </Stack>
                </Row>
            </Container>
            <Button onClick={() => {
                setKeyPair(new KeyPair())
            }} variant="primary">Generate new key pair</Button>
        </div >
    )
}