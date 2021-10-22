//reactjs.org/docs/error-boundaries.html

import React, { Component } from "react";
import { Link, Redirect } from "@reach/router";


class ErrorBoundary extends Component {

    constructor(props) {
        super(props);
        this.state = { hasError: false, redirect: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("ErrorBoundary caugth an error", error, info)

    }

    componentDidUpdate() {
        if (this.state.hasError) {
            setTimeout(() => this.setState({ redirect: true }), 6000)
        }

    }


    component

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" noThrow />
        }

        if (this.state.hasError) {
            return (
                <h1>
                    There was an error fetching the video <Link to="/">Click here</Link>
                    {" "}
                    to go back to the search page or wait for 6 seconds.
                </h1>

            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;