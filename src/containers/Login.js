import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { swapThemeColors, toggleThemeMode } from '../store/settings/settings';
import PaddingLayout from '../components/PaddingLayout';


var OidcSettings = {
    authority: 'https://****/identity',
    client_id: 'myclientid',
    redirect_uri: 'https://localhost:9090/',
    response_type: 'id_token token',
    scope: 'openid profile roles',
    post_logout_redirect_uri: 'https://localhost:9090/'
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.userLoaded = this.userLoaded.bind(this);
        this.userUnLoaded = this.userUnLoaded.bind(this);

        this.state = { user: undefined };
    }

    userLoaded(user) {
        if (user)
            this.setState({ "user": user });
    }

    userUnLoaded() {
        this.setState({ "user": undefined });
    }

    NotAuthenticated() {
        return <div>You are not authenticated, please click here to authenticate.</div>;
    }
    render() {
        return (
            <PaddingLayout>
                <Typography variant="headline">Login</Typography>
                <Authenticate OidcSettings={OidcSettings} userLoaded={this.userLoaded} userunLoaded={this.userUnLoaded} renderNotAuthenticated={this.NotAuthenticated}>
                    <div>If you see this you are authenticated.</div>
                </Authenticate>
            </PaddingLayout>
        );
    }

}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            toggleThemeMode: checked => toggleThemeMode(checked),
            swapThemeColors: checked => swapThemeColors(checked)
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
