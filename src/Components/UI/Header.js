import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useScrollTrigger
} from "@material-ui/core";

function ElevationScroll(props) {
  const { children, window } = props;
  
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}


const Header =(props)  => {

    

    return (
        <ElevationScroll>
            <AppBar position='fixed'>
                <Toolbar>Arc Development</Toolbar>
            </AppBar>
        </ElevationScroll>
    )
}

export default Header
