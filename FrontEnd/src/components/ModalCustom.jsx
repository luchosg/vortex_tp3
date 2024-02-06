import React from 'react';

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const ModalCustom = ({open, title, content, acceptCallBack, cancelCallBack, id}) => {
    return (
        <Dialog
            open={open}
            onClose={cancelCallBack}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='secondary' onClick={cancelCallBack}>Cancel</Button>
                <Button id={id} variant='contained' onClick={acceptCallBack} autoFocus>Accept</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalCustom;