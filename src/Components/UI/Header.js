import React, {useState, useEffect} from 'react'
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  useScrollTrigger,
  Tab,
  Tabs,
  Menu,
  MenuItem
} from "@material-ui/core";


import { makeStyles } from "@material-ui/core/styles";
import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom';


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
  logoContainer: {
    padding: 0,
    "&:hover": {
        backgroundColor: 'transparent'
    }
    
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
      ...theme.typography.estimate,
      borderRadius: '50px',
      marginLeft: '50px',
      marginRight: '25px',
      height: '45px',
  },
  menu: {
    backgroundColor: theme.palette.common.arcBlue,
    color: 'white',
    borderRadius: '0px'
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1
    }
  }
}));



const Header =(props)  => {

    const classes = useStyles();

    const[value, setValue] = useState(0)
    const[anchorEl, setAnchorEl] = useState(null)
    const[open, setOpen] = useState(false)

    const handleChange = (e, value) => {
        console.log(e, value);
        setValue(value)
    }

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
      setOpen(true)
    }

    const handleClose = (event) => {
      setAnchorEl(null)
      setOpen(false)

    }


    useEffect(() => {
        if (window.location.pathname === "/" && value !== 0) {
          setValue(0);
        } else if (window.location.pathname === "/services" && value !== 1) {
          setValue(1);
        } else if (window.location.pathname === "/revolution" && value !== 2) {
          setValue(2);
        } else if (window.location.pathname === "/about" && value !== 3) {
          setValue(3);
        } else if (window.location.pathname === "/contact" && value !== 4) {
          setValue(4);
        } else if (window.location.pathname === "/estimate" && value !== 5) {
          setValue(5);
        }
    }, [value])

    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar position='fixed' color='primary'>
                    <Toolbar disableGutters>
                        <Button component={Link} to='/' className={classes.logoContainer} onClick={()=>setValue(0)} disableRipple>
                            <img src={logo} alt='company logo' className={classes.logo}/>
                        </Button>
                       <Tabs  
                        value={value}  
                        onChange={handleChange}
                        className={classes.tabContainer}
                        indicatorColor='secondary'
                    >
                           <Tab 
                              className={classes.tab} 
                              component={Link} 
                              to='/' 
                              label='Home'
                            />
                           <Tab 
                              className={classes.tab} 
                              component={Link} 
                              to='/services' 
                              label='Services'
                              aria-owns={anchorEl ? "simple-menu" : undefined}
                              aria-haspopup={anchorEl ? "true" : undefined}
                              onMouseOver={(event) => handleClick(event)}
                            />
                           <Tab 
                              className={classes.tab} 
                              component={Link} 
                              to='/revolution' 
                              label='The Revolution'
                            />
                           <Tab 
                              className={classes.tab} 
                              component={Link} 
                              to='about' 
                              label='About Us'
                            />
                           <Tab 
                              className={classes.tab} 
                              component={Link} 
                              to='contact' 
                              label='Contact Us'
                            />
                       </Tabs>
                       <Button 
                          variant='contained' 
                          color='secondary' 
                          className={classes.button} 
                          component={Link} 
                          to='/estimate'
                        >
                            Free Estimate
                        </Button>
                        <Menu 
                          id='simple-menu' 
                          anchorEl={anchorEl} 
                          open={open} 
                          onClose={handleClose}
                          MenuListProps={{onMouseLeave: handleClose}}
                          classes={{paper: classes.menu}}
                          elevation={0}
                        >
                          <MenuItem 
                            onClick={() => {handleClose(); setValue(1)}}
                            component={Link}
                            to='/services'
                            classes={{root: classes.menuItem}}
                          >
                            Services
                          </MenuItem>
                          <MenuItem 
                            onClick={() => {handleClose(); setValue(1)}}
                            component={Link}
                            to='/customsoftware'
                            classes={{root: classes.menuItem}}
                          >
                            Custom Software Development
                          </MenuItem>
                          <MenuItem 
                            onClick={() => {handleClose(); setValue(1)}}
                            component={Link}
                            to='/mobileapps'
                            classes={{root: classes.menuItem}}
                          >
                            Mobile App Development
                          </MenuItem>
                          <MenuItem 
                            onClick={() => {handleClose(); setValue(1)}}
                            component={Link}
                            to='/websites'
                            classes={{root: classes.menuItem}}
                          >
                            Website Development
                          </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin}></div>
        </React.Fragment>
    )
}

export default Header
