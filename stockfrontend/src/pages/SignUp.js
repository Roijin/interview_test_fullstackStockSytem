import * as React from 'react';
import { Field, Form } from 'react-final-form';
import Link from '@mui/material/Link';
import Typography from '../modules/components/Typography';
import AppForm from '../modules/views/AppForm';
import { email, required } from '../modules/form/validation';
import RFTextField from '../modules/form/RFTextField';
import FormButton from '../modules/form/FormButton';
import {useNavigate} from "react-router-dom";

function SignUp(){
    const [sent,setSent] = React.useState(false);
    let formData = {
    };
    let navigate = useNavigate();
    
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    
    const onSubmit = async (values) => {
      
      await sleep(300);
      console.log(JSON.stringify(values));
      fetch("http://localhost:8080/user/add",{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
      }).then(()=>{
          console.log('New User Added')
      })
      navigate("/SignIn");
    };
  
    return (
      <div>
        <React.Fragment>
       <AppForm>
         <React.Fragment>
           <Typography variant="h3" gutterBottom marked="center" align="center">
             Sign Up
           </Typography>
           <Typography variant="body2" align="center">
             <Link
              href="SignIn"
              align="center"
              underline="always"
            >
              Already have an account?
            </Link>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={onSubmit}
          initialValues={formData}
          validate = {(values) => {
                const errors = required(['email', 'password'], values);
            
                if (!errors.email) {
                  const emailError = email(values.email);
                  if (emailError) {
                    errors.email = emailError;
                  }
                }
            
                return errors;
              }}
            
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
                <Field
                autoComplete="username"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Username"
                margin="normal"
                name="username"
                required
                size="large"
              />
              <Field
                autoComplete="email"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
              />
              <Field
                autoComplete="password"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Password"
                margin="normal"
                name="password"
                required
                size="large"
              />
              <div>
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'In progress…' : 'Sign Up'}
              </FormButton>
              </div>
              <pre></pre>
            </form>
          )}
        />
        </AppForm>
     </React.Fragment>
      </div>
    );
  };


export default SignUp;
  