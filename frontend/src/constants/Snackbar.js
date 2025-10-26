
import { Snackbar,Alert } from "@mui/material";


const SnackbarPopup = ({open, message, severity,setSnackbar}) => {
    // const [snackbar, setSnackbar] = useState({
    //     open: false,
    //     message: '',
    //     severity: 'success'
    //   });

    return(
         <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} 
          severity={severity}
          variant="filled"
          sx={{ 
            width: '100%',
            '& .MuiAlert-message': {
              display: 'flex',
              alignItems: 'center',
            },
          }}
        >
          {message}
        </Alert>
      </Snackbar>
        
    )
    
}

export default SnackbarPopup;
