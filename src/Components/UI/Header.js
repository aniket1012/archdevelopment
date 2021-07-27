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
  MenuItem,
  useMediaQuery,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom';


function ElevationScroll(props) {
  const { children } = props;
  
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
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em",
    },
  },
  logo: {
    height: "8em",
    [theme.breakpoints.down("md")]: {
      height: "7em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em",
    },
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    height: "45px",
  },
  menu: {
    backgroundColor: theme.palette.common.arcBlue,
    color: "white",
    borderRadius: "0px",
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawerIcon: {
    height: "50px",
    width: "50px",
  },
  drawer: {
    backgroundColor: theme.palette.common.arcBlue,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "white",
    opacity: 0.7
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.arcOrange,
  },
  drawerItemSelected: {
    opacity: 1
  }
}));



const Header =(props)  => {

    const classes = useStyles();
    const theme = useTheme()
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const matches = useMediaQuery(theme.breakpoints.down('md'))

    const [openDrawer, setOpenDrawer] = useState(false)
    const[value, setValue] = useState(0)
    const[anchorEl, setAnchorEl] = useState(null)
    const[openMenu, setOpenMenu] = useState(false)
    const[selectedIndex, setSelectedIndex] = useState(0)

    const handleChange = (e, newValue) => {
        setValue(newValue)
    }

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
      setOpenMenu(true)
    }

    const handleMenuItemClick = (event, index) => {
      setAnchorEl(null)
      setOpenMenu(false)
      setSelectedIndex(index)
    }

    const handleClose = (event) => {
      setAnchorEl(null)
      setOpenMenu(false)

    }

    const menuOptions = [
      { name: "Services", link: "/services" },
      { name: "Custome Software Development", link: "/customsoftware" },
      { name: "Mobile App Development", link: "/mobileapps" },
      { name: "Website Development", link: "/websites" },
    ];


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

    switch(window.location.pathname) {
      case "/":
        if(value !== 0) {
          setValue(0)
        }
        break
      case "/services":
        if(value !== 1) {
          setValue(1)
          setSelectedIndex(0)
        }
        break
      case "/customSoftware":
        if(value !== 1) {
          setValue(1)
          setSelectedIndex(1)
        }
        break
      case "/mobileapps":
        if(value !== 1) {
          setValue(1)
          setSelectedIndex(2)
        }
        break
      case "/websites":
        if(value !== 1) {
          setValue(1)
          setSelectedIndex(3)
        }
        break
      case "/revolutions": 
        if(value !== 2) {
          setValue(2)
        }
        break
      case "/about": 
        if(value !== 3) {
          setValue(3)
        }
        break
      case "/contact":
        if(value !== 4) {
          setValue(4)
        }
        break
      case "/estimate":
        if(value !== 5) {
          setValue(5)
        }
        break
      default:
          break
    }

    const tabs = (
      <React.Fragment>
        <Tabs
          value={value}
          onChange={handleChange}
          className={classes.tabContainer}
          indicatorColor="secondary"
        >
          <Tab className={classes.tab} component={Link} to="/" label="Home" />
          <Tab
            className={classes.tab}
            component={Link}
            to="/services"
            label="Services"
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup={anchorEl ? "true" : undefined}
            onMouseOver={(event) => handleClick(event)}
          />
          <Tab
            className={classes.tab}
            component={Link}
            to="/revolution"
            label="The Revolution"
          />
          <Tab
            className={classes.tab}
            component={Link}
            to="about"
            label="About Us"
          />
          <Tab
            className={classes.tab}
            component={Link}
            to="contact"
            label="Contact Us"
          />
        </Tabs>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          component={Link}
          to="/estimate"
        >
          Free Estimate
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleClose}
          MenuListProps={{ onMouseLeave: handleClose }}
          classes={{ paper: classes.menu }}
          elevation={0}
        >
          {menuOptions.map((option, index) => (
            <MenuItem
              key={option}
              component={Link}
              to={option.link}
              classes={{ root: classes.menuItem }}
              onClick={(event) => {
                handleMenuItemClick(event, index);
                setValue(1);
                handleClose();
              }}
              selected={index === selectedIndex && value === 1}
            >
              {option.name}
            </MenuItem>
          ))}
        </Menu>
      </React.Fragment>
    );

    const drawer = (
      <React.Fragment>
        <SwipeableDrawer
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          onOpen={() => setOpenDrawer(true)}
          classes={{paper: classes.drawer}}
        >
          <List disablePadding>
            <ListItem 
              divider 
              button 
              component={Link} 
              to={"/"} 
              onClick={() => {setOpenDrawer(false); setValue(0)}}
              selected={value === 0}
            >
              <ListItemText  
                className={value === 0 ? [classes.drawerItem, classes.drawerItemSelected]: classes.drawerItem} 
                disableTypography 
              >
                Home
              </ListItemText>
            </ListItem>
            <ListItem 
              divider 
              button 
              component={Link} 
              to={"/services"} 
              onClick={() => {setOpenDrawer(false); setValue(1)}}
              selected={value === 1}
            >
              <ListItemText  
                className={value === 1 ? [classes.drawerItem, classes.drawerItemSelected]: classes.drawerItem}
                disableTypography
              >
                Services
              </ListItemText>
            </ListItem>
            <ListItem 
              divider 
              button 
              component={Link} 
              to={"/revolution"} 
              onClick={() => {setOpenDrawer(false); setValue(2)}}
              selected={value === 2}
            >
              <ListItemText  
                className={value === 2 ? [classes.drawerItem, classes.drawerItemSelected]: classes.drawerItem}
                disableTypography 
              >
                The Revolution
              </ListItemText>
            </ListItem>
            <ListItem 
              divider 
              button 
              component={Link} 
              to={"/about"} 
              onClick={() => {setOpenDrawer(false); setValue(3)}}
              selected={value === 3}
            >
              <ListItemText  
                className={value === 3 ? [classes.drawerItem, classes.drawerItemSelected]: classes.drawerItem}
                disableTypography 
              >
                About Us
              </ListItemText>
            </ListItem>
            <ListItem 
              divider 
              button 
              component={Link} 
              to={"/contact"} 
              onClick={() => {setOpenDrawer(false); setValue(4)}}
              selected={value === 4}
            >
              <ListItemText  
                className={value === 4 ? [classes.drawerItem, classes.drawerItemSelected]: classes.drawerItem}
                disableTypography 
              >
                Contact Us
              </ListItemText>
            </ListItem>
            <ListItem 
              divider 
              button 
              component={Link} 
              to={"/estimate"}  
              className={classes.drawerItemEstimate} 
              onClick={() => {setOpenDrawer(false); setValue(5)}}
              selected={value === 5}
            >
              <ListItemText  
                className={value === 5 ? [classes.drawerItem, classes.drawerItemSelected]: classes.drawerItem}
                disableTypography 
              >
                  Free Estimate
              </ListItemText>
            </ListItem>
          </List>
        </SwipeableDrawer>
        <IconButton className={classes.drawerIconContainer} onClick={() => setOpenDrawer(!openDrawer)} disableRipple>
          <MenuIcon className={classes.drawerIcon}/>
        </IconButton>
      </React.Fragment>
    );
    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar position='fixed' color='primary'>
                    <Toolbar disableGutters>
                        <Button component={Link} to='/' className={classes.logoContainer} onClick={()=>setValue(0)} disableRipple>
                            <img src={logo} alt='company logo' className={classes.logo}/>
                        </Button>
                        {matches ? drawer : tabs}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin}></div>
        </React.Fragment>
    )
}

export default Header
