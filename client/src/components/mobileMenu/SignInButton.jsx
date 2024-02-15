import React from "react";

import { Link, useNavigate } from 'react-router-dom';

// material-ui imports
import { Button } from '@mui/material';

function SignInButton(){
    return(
        <div>
        <Link to={`/selectlogin`}>
          <Button
            variant="contained"
            className="md:block hidden bg-[#6B3FA0] hover:bg-[#6B3FA0]"
          >
            Sign in
          </Button>
        </Link>
      </div>
    )
}

export default SignInButton