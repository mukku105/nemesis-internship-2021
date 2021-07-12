import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {

    static propTypes = {
        message: PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps) {
        const { alert, message } = this.props;
        if (message != prevProps.message) {
            if (message.updateUser)
                alert.success(<div style={{ textAlign: 'center' }}>{message.updateUser}</div>);
            if (message.addUsers)
                alert.success(<div style={{ textAlign: 'center' }}>{message.addUsers}</div>);
            if (message.deleteUsers)
                alert.success(<div style={{ textAlign: 'center' }}>{message.deleteUsers}</div>);
        }
    }
    render() {
        return <Fragment />;
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
})

export default connect(mapStateToProps)(withAlert()(Alerts));