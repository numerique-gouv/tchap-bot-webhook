import { Alert, Snackbar } from '@mui/material';

function Toaster(props: {
    isOpen: boolean;
    onClose: () => void;
    variant: 'success' | 'error';
    text: string;
}) {
    return (
        <Snackbar open={props.isOpen} autoHideDuration={2000} onClose={props.onClose}>
            <Alert onClose={props.onClose} severity={props.variant}>
                {props.text}
            </Alert>
        </Snackbar>
    );
}

export { Toaster };
