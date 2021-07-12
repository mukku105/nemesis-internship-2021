import React, { Component, Fragment, useState } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'
import ReplayIcon from '@material-ui/icons/Replay'

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { getUsers, updateUser, addUser, deleteUser } from '../../actions/users';
import { Button } from '@material-ui/core';

// import UserEdit from './UserEdit.jsx'

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();

    return (
        <Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    <Button variant="outlined" color="primary" onClick={() => props.onClickUserId(row, true)}>
                        <EditIcon style={{ fontSize: 'medium' }} /> &nbsp;&nbsp;{row.id}
                    </Button>
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.username}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.phone}</TableCell>
                <TableCell align="left">
                    <a href={row.website} target="_blank">{row.website}</a>
                </TableCell>
                <TableCell>
                    <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={() => props.onClickDeleteUser(row.id)}>Delete</Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: 'cornsilk' }} colSpan={8}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                <span style={{ backgroundColor: 'white', padding: '6px', borderRadius: '6px' }} >Address</span>

                            </Typography>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Street</TableCell>
                                        <TableCell align="right">Suite</TableCell>
                                        <TableCell align="right">City</TableCell>
                                        <TableCell align="right">Zip Code</TableCell>
                                        <TableCell align="right">Geo.</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">{row.address.street ?? ' '}</TableCell>
                                        <TableCell align="right">{row.address.suite || ' '}</TableCell>
                                        <TableCell align="right">{row.address.city || ' '}</TableCell>
                                        <TableCell align="right">{row.address.zipcode || ' '}</TableCell>
                                        <TableCell align="right">{"Lat.: " + (row.address.geo ? row.address.geo.lat : " ") + " Lng.: " + (row.address.geo ? row.address.geo.lng : " ")}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <br />
                            <Typography variant="h6" gutterBottom component="div">
                                <span style={{ backgroundColor: 'white', padding: '6px', borderRadius: '6px' }} >Company</span>

                            </Typography>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Name</TableCell>
                                        <TableCell align="right">Catch Phrase</TableCell>
                                        <TableCell align="right">BS</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">{row.company.name || ' '}</TableCell>
                                        <TableCell align="right">{row.company.catchPhrase || ' '}</TableCell>
                                        <TableCell align="right">{row.company.bs || ' '}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    )
};

export class Users extends Component {
    state = {
        user_edit: {
            id_edit: '',
            name_edit: '',
            username_edit: '',
            email_edit: '',
            phone_edit: '',
            website_edit: ''
        },
        modal: { open: false }
    }

    static propTypes = {
        addUser: PropTypes.func.isRequired,
        updateUser: PropTypes.func.isRequired,
        getUsers: PropTypes.func.isRequired,
        deleteUser: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
    }

    componentDidMount() {
        this.props.getUsers();
    }

    onChangeUserEdit = e => {
        this.setState(prevState => {
            return ({
                user_edit: {
                    ...prevState.user_edit,
                    [e.target.name]: e.target.value
                }
            })
        })

        // console.log(this.state)

    }

    onClickUserAdd = () => {
        this.setState({
            user_edit: {
                id_edit: '',
                name_edit: '',
                username_edit: '',
                email_edit: '',
                phone_edit: '',
                website_edit: '',
            },
            modal: { open: true }
        });
        // console.log(this.state)
    }

    onClickUserId = (user, open) => {
        this.setState({
            user_edit: {
                id_edit: user.id,
                name_edit: user.name,
                username_edit: user.username,
                email_edit: user.email,
                phone_edit: user.phone,
                website_edit: user.website,
            },
            modal: { open: open }
        });

        // console.log(this.state)
    }

    onClickDeleteUser = (id) => {
        this.props.deleteUser(id)
    }

    onClickUserEdit = e => {
        e.preventDefault();
        const { id_edit, name_edit, username_edit, email_edit, phone_edit, website_edit } = this.state.user_edit;

        //console.log(user)
        if (id_edit) {
            const user = { id: id_edit, name: name_edit, username: username_edit, email: email_edit, phone: phone_edit, website: website_edit }
            this.props.updateUser(user)
        }
        else {
            const user = { name: name_edit, username: username_edit, email: email_edit, phone: phone_edit, website: website_edit, address: " ", company: " " }
            this.props.addUser(user)
        }


        this.setState({
            user_edit: {
                id_edit: '',
                name_edit: '',
                username_edit: '',
                email_edit: '',
                phone_edit: '',
                website_edit: '',
            },
            modal: { open: false }
        });
    }

    handleClose = () => {
        this.setState({
            modal: { open: false }
        })

        this.setState({
            user_edit: {
                id_edit: '',
                name_edit: '',
                username_edit: '',
                email_edit: '',
                phone_edit: '',
                website_edit: '',
            },
            modal: { open: false }
        });
    };
    handleOpen = () => {
        this.setState({
            modal: { open: true }
        })
    };


    render() {
        const { id_edit, name_edit, username_edit, email_edit, phone_edit, website_edit } = this.state.user_edit;

        const { open } = this.state.modal

        return (
            <Fragment>
                <Dialog open={open} onClose={this.handleClose}>
                    <DialogTitle id="form-dialog-title">Edit User {"(" + id_edit + " - " + name_edit + ")"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please Enter New Details
                        </DialogContentText>
                        <form action="">
                            <TextField
                                id="name_edit"
                                name="name_edit"
                                label="Name"
                                type="text"
                                variant="outlined"
                                defaultValue={name_edit}
                                onChange={this.onChangeUserEdit}
                                fullWidth
                            />
                            &nbsp;
                            <TextField
                                margin="dense"
                                id="username_edit"
                                name="username_edit"
                                label="Username"
                                type="text"
                                variant="outlined"
                                defaultValue={username_edit}
                                onChange={this.onChangeUserEdit}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                id="email_edit"
                                name="email_edit"
                                label="Email"
                                type="email"
                                variant="outlined"
                                defaultValue={email_edit}
                                onChange={this.onChangeUserEdit}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                id="phone_edit"
                                name="phone_edit"
                                label="Phone No."
                                type="text"
                                variant="outlined"
                                defaultValue={phone_edit}
                                onChange={this.onChangeUserEdit}
                                fullWidth
                            />
                            &nbsp;
                            <TextField
                                margin="dense"
                                id="website_edit"
                                name="website_edit"
                                label="Website"
                                type="text"
                                variant="outlined"
                                defaultValue={website_edit}
                                onChange={this.onChangeUserEdit}
                                fullWidth
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} variant="outlined" color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.onClickUserEdit} variant="contained" color="primary">
                            Save
                        </Button>
                    </DialogActions>

                </Dialog>

                <Typography align="center" color="textSecondary" style={{ padding: "25px" }}>
                    Click on the corresponding <strong>ID</strong> to <u>Edit Details</u>
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead style={{ backgroundColor: 'coral' }}>
                            <TableRow>
                                <TableCell width="1">
                                    <Button variant="contained" style={{ fontSize: '10px', padding: '4px' }} onClick={this.onClickUserAdd}><AddBoxIcon /> Add User</Button>
                                </TableCell>
                                <TableCell align="center">Id</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Username</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="left">Phone</TableCell>
                                <TableCell align="left">Website</TableCell>
                                <TableCell align="center">
                                    <Button variant="contained" color="primary" onClick={this.props.getUsers}><ReplayIcon /></Button>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.users.map(user => (
                                <Row key={user.id} row={user} onClickUserId={this.onClickUserId.bind(this)} onClickDeleteUser={this.onClickDeleteUser.bind(this)} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>


            </Fragment>
        )
    }
};

const mapStateToProps = state => ({
    users: state.users.users,
    isLoading: state.users.isLoading,
})

export default connect(
    mapStateToProps,
    { getUsers, updateUser, addUser, deleteUser }
)(Users);