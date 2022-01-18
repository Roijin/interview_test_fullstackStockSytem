import * as React from 'react';
import { Field, Form} from 'react-final-form';
import { required } from '../form/validation';
import RFTextField from '../form/RFTextField';
import FormButton from '../form/FormButton';
import ReactDom from 'react-dom';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const popup_styles={
    position:'fixed',
    top:'55%',
    left:'50%',
    transform:'translate(-50%, -50%)',
    backgroundColor:'#FFF',
    padding:'50px',
    zIndex:1000,
    
}

const overlay_styles={
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,.7)',
  zIndex:1000
}

function PopUp({open,onClose}){
  
    const [sent,setSent] = React.useState(false);
    
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    
    const onSubmit = async (values) => {
      
      await sleep(300);
      console.log(JSON.stringify(values));
      fetch("http://localhost:8080/stock/add",{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
      }).then(()=>{
        alert('New item Added')
      })
    };

    if (!open) return null
    return ReactDom.createPortal(
    <>
    <div style={overlay_styles}>
      <div style={popup_styles}>
        <React.Fragment>
        <IconButton color="primary" aria-label="add to shopping cart"
                onClick={onClose}>
                <CloseIcon fontSize="medium" />
            </IconButton>
        <Form
          onSubmit={onSubmit}
          validate = {(values) => {
                const errors = required(['name', 'quantity','price'], values);
                return errors;
              }}
            
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <div>
                
              </div>
              <Field
                autoComplete="name"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="name"
                margin="normal"
                name="name"
                required
                size="small"
              />
              <Field
                autoComplete="quantity"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="quantity"
                margin="normal"
                name="quantity"
                required
                size="small"
              />
              <Field
                autoComplete="price"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="price"
                margin="normal"
                name="price"
                required
                size="small"
              />
              <div>
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'In progress…' : 'Submit Item'}
              </FormButton>
              </div>
              <pre></pre>
            </form>
          )}
        />
        
      </React.Fragment>
      </div>
      </div>
    </>,
    document.getElementById('portal')
    );
  };


export default PopUp;
  