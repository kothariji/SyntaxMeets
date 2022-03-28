import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

class SnackBar extends Component {
    handleClose = (e) => {
        this.props.close()
    }
    render() {
        return (
            <div>
                <Snackbar open={this.props.isSnackOpen} autoHideDuration={4000} onClose={() => this.handleClose}>
                    <Alert onClose={() => this.props.close()} severity={this.props.type}>
                        <Typography>
                            {this.props.snackbarMessage}
                        </Typography>
                    </Alert>
                </Snackbar>
            </div>
        )
    }
}
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const mapStateToProps = state => {
    return {
        isSnackOpen: state.UI.isSnackBarOpen,
        snackbarMessage: state.UI.setSnackBarMessage,
        type: state.UI.snackBarType
    }
}
const mapDispatchToProps = dispatch => {
    return { close: () => dispatch({ type: 'CLOSE_SNACKBAR' }) }
}
export default connect(mapStateToProps, mapDispatchToProps)(SnackBar)