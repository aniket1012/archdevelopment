import React from 'react'
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  useScrollTrigger,
  Tab,
  Tabs,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import logo from '../../assets/logo.svg'


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

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
  },
  logo: {
    height: "7em",
  },
  tabContainer: {
      marginLeft: 'auto'
  },
  tab: {
      ...theme.typography.tab,
      minWidth: 10,
      marginLeft: '25px'
  },
  button: {
      borderRadius: '50px',
      marginLeft: '50px',
      marginRight: '25px',
      fontFamily: 'Pacifico',
      fontSize: '1rem',
      textTransform: 'none',
      height: '45px',
      color: 'white'
  }
}));



const Header =(props)  => {

    const classes = useStyles();

    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar position='fixed' color='primary'>
                    <Toolbar disableGutters>
                       <img src={logo} alt='company logo' className={classes.logo}/>
                       <Tabs className={classes.tabContainer}>
                           <Tab className={classes.tab} label='Home'/>
                           <Tab className={classes.tab} label='Services'/>
                           <Tab className={classes.tab} label='The Revolution'/>
                           <Tab className={classes.tab} label='About Us'/>
                           <Tab className={classes.tab} label='Contact Us'/>
                       </Tabs>
                       <Button variant='contained' color='secondary' className={classes.button}>Free Estimate</Button>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin}></div>
        </React.Fragment>
    )
}

export default Header
