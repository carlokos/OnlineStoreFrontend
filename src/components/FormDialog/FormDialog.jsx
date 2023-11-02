import React, { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ResponsiveDialog from "../ResponsiveDialog/ResponsiveDialog";

/**
 * Modular Dialog which makes responsive Forms with the dataForm, allowing us to
 * make different forms which the same structure
 */
export default function FormDialog({ open, onClose, dataForm, updateItem, deleteItem }) {
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false);
    }

    const openDeleteDialog = () => {
        setDeleteDialogOpen(true);
    }

    return (
        <div>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Formulario</DialogTitle>
                <DialogContent>
                    {dataForm && React.createElement(dataForm.component, {
                        formData: dataForm.formData,
                        handleInputChange: dataForm.handleInputChange,
                        isValid: dataForm.isValid,
                    })}
                    <Button variant="contained" color="primary" onClick={updateItem} style={{ marginRight: '8px' }}>
                        Update
                    </Button>

                    <Button variant="contained" color="secondary" onClick={onClose} style={{ marginRight: '8px' }}>
                        Cancel
                    </Button>

                    {deleteItem && (  
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            color="error"
                            onClick={openDeleteDialog}
                        >
                            <DeleteIcon />
                        </IconButton>
                    )}
                </DialogContent>
            </Dialog>

            <ResponsiveDialog
                open={isDeleteDialogOpen ? true : false}
                onClose={closeDeleteDialog}
                onConfirm={deleteItem}
                title="Delete product?"
                msg={`item is going to be delete, proceed?`} />
        </div>
    );
}