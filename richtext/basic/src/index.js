const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container" contentEditable="true">
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('target')
);