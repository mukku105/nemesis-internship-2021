import React, { Component, Fragment, useState } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Modal from '@material-ui/core/Modal'

import { getUsers, editUser, addUser } from '../../actions/users';
import { Button } from '@material-ui/core';

export class UserEdit extends Component {
    state = {
        id_edit: '',
        name_edit: '',
        username_edit: '',
        email_edit: '',
        phone_edit: '',
        website_edit: '',
    }

    static propTypes = {
        // addUser: PropTypes.func.isRequired,
        editUser: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
    }

    onChange = e => {
        this.setState({
            [e.target.name]:
                e.target.value
        })
    }

    onClickUserId = (user) => {
        this.setState({
            id_edit: user.id,
            name_edit: user.name,
            username_edit: user.username,
            email_edit: user.email,
            phone_edit: user.phone,
            website_edit: user.website,
        });

        console.log(this.state)
    }

    onClickUserEdit = e => {
        e.preventDefault();
        const { id_edit, name_edit, username_edit, email_edit, phone_edit, website_edit } = this.state;
        const user = { id: id_edit, name: name_edit, username: username_edit, email: email_edit, phone: phone_edit, website: website_edit }
        console.log(user)

        this.setState({
            id_edit: '',
            name_edit: '',
            username_edit: '',
            email_edit: '',
            phone_edit: '',
            website_edit: '',
        });
    }
    render() {


        return (
            <Fragment>
                <Form>

                </Form>
            </Fragment>
        )
    }
}

