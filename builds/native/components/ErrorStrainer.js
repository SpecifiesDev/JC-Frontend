import {Component} from 'react';


export default class ErrorBoundary extends Component {

    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(err, info) {
        logErrorToMyService(err, info);
    }

    render() {

        if(this.state.hasError) {
            return <View style={{alignText: 'center'}}><Text>Something went wrong while attempting to load the component.</Text></View>
        }

        return this.props.children;

    }
}