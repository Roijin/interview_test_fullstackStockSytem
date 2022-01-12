import * as React from 'react';
import { Field, Form} from 'react-final-form';
import Link from '@mui/material/Link';
import Typography from '../modules/components/Typography';
import AppForm from '../modules/views/AppForm';
import { email, required } from '../modules/form/validation';
import RFTextField from '../modules/form/RFTextField';
import FormButton from '../modules/form/FormButton';
import {useNavigate} from "react-router-dom";

function MatchPassword(email, password, obj){
  var match = false;
  var currentUser;
  for (var i in obj){
    if (obj[i].email == email){
      if(obj[i].password == password){
        match = true;
        currentUser = obj[i].id;
      }
    }
  }
  return [match, currentUser];
}

  
function SignIn(){
    const [sent,setSent] = React.useState(false);
    const [users,setUsers] = React.useState();
    
    let formData = {};
    let navigate = useNavigate();
    var searchResults = [];
    var state;
    var currentUser;
    
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    
    const onSubmit = async (values) => {
      
      await sleep(300);
      fetch("http://localhost:8080/user/getAll")
        .then(res=>res.json())
        .then((result)=>{
            setUsers(result);
            searchResults = MatchPassword(values.email,values.password,result);
            state = searchResults[0];
            currentUser = searchResults[1];
            if (state == true){
            console.log(currentUser);
            navigate("/Stock",{state:{user_id:currentUser}});
            }
        })
    };
  
    return (
      <div>
        <React.Fragment>
       <AppForm>
         <React.Fragment>
           <Typography variant="h3" gutterBottom marked="center" align="center">
             Sign In
           </Typography>
           <Typography variant="body2" align="center">
           {'Not a member yet? '}
             <Link
              href="SignUp"
              align="center"
              underline="always"
            >
              Sign Up here
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
                {submitting || sent ? 'In progress…' : 'Sign In'}
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


export default SignIn;
  