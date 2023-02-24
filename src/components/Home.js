import { Container, Toast } from 'react-bootstrap';

export const Home = (props) => {
    const displayThemisInitialized = (state) => {
        if (state) {
            return "True"
        } else {
            return "False"
        }
    }

    return (
        <Container>
            <h1>Using Themis in React application</h1>
            <h2>This is the example application that shows how developers can use Themis in their modern React applications.</h2>
            <h3>Use the navigation bar to select the demo scene.</h3>
            <center>
                <Toast>
                    <Toast.Header>
                        <strong className="me-auto">Themis initialized</strong>
                    </Toast.Header>
                    <Toast.Body><strong>{displayThemisInitialized(props.themisInitialized)}</strong></Toast.Body>
                </Toast>
            </center>
        </Container>
    )
}