import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../components/AppBar';
import ToolBar from '../components/ToolBar';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function HeaderBar() {
  return (
    <div>
      <AppBar position="fixed">
        <ToolBar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{ fontSize: 24 }}
          >
            {'FullStack Stock System'}
          </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/SignIn"
              sx={rightLink}
            >
              {'Sign In'}
            </Link>
            <Link
              variant="h6"
              underline="none"
              href="/SignUp"
              sx={{ ...rightLink, color: 'secondary.main' }}
            >
              {'Sign Up'}
            </Link>
          </Box>
        </ToolBar>
      </AppBar>
      <ToolBar />
    </div>
  );
}

export default HeaderBar;