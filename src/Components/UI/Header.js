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
    "& .MuiListItemText-root": {
      opacity: 1
    }
  },
   appbar: {
     zIndex: theme.zIndex.modal + 1
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
      { name: "Services", link: "/services", activeIndex: 1, selectedIndex: 0},
      { name: "Custome Software Development", link: "/customsoftware", activeIndex: 1, selectedIndex:  1},
      { name: "Mobile App Development", link: "/mobileapps", activeIndex: 1, selectedIndex:  2},
      { name: "Website Development", link: "/websites", activeIndex: 1, selectedIndex:  3},
    ]

    const routes = [
      {name: "Home", link: "/", activeIndex: 0},
      {name: "Services", link: "/services", activeIndex: 1, ariaOwns: anchorEl ? "simple-menu" : undefined, ariaPopup: anchorEl ? "true" : undefined, mouseOver: event => handleClick(event)},
      {name:"The Revolution", link: "/revolution", activeIndex: 2},
      {name: "About Us", link: "/about", activeIndex: 3},
      {name: "Contact Us", link: "/contact", activeIndex: 4},
    ]

    useEffect(() => {
      [...menuOptions, ...routes].forEach(route => {
        switch(window.location.pathname) {
          case `${route.link}`:
            if(value !== route.activeIndex) {
              setValue(route.activeIndex)
              if(route.selectedIndex && route.selectedIndex !== selectedIndex) {
                setSelectedIndex(route.selectedIndex)
              }
            }
            break;
            default:
              break;
        }
      })
       }, [value,menuOptions,selectedIndex,routes])

    

    const tabs = (
      <React.Fragment>
        <Tabs
          value={value}
          onChange={handleChange}
          className={classes.tabContainer}
          indicatorColor="secondary"
        >
          {routes.map((route, index) => (
            <Tab 
              key={`${route}${index}`}
              className={classes.tab}
              component={Link}
              to={route.link}
              label={route.name}
              aria-owns={route.ariaOwns}
              aria-haspopup={route.ariaPopup}
              onMouseOver={route.mouseOver}
            />
          ))}
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
          keepMounted
          style={{zIndex: 1302}}
        >
          {menuOptions.map((option, index) => (
            <MenuItem
              key={`${option}${index}`}
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
          <div className={classes.toolbarMargin}/>
          <List disablePadding>
            {routes.map((route,index)=> (
              <ListItem
                key={`${route}${route.activeIndex}`}
                onClick={() => {setOpenDrawer(false); setValue(route.activeIndex)}}
                divider
                button
                component={Link}
                to={route.link}
                selected={value === route.activeIndex}
                classes={{selected: classes.drawerItemSelected}}
              >
                <ListItemText
                  className={classes.drawerItem} 
                  disableTypography
                >
                  {route.name}
                </ListItemText>
              </ListItem>
            ))}
            <ListItem 
              divider 
              button 
              component={Link} 
              to={"/estimate"}  
              classes={{root: classes.drawerItemEstimate, selected: classes.drawerItemSelected}} 
              onClick={() => {setOpenDrawer(false); setValue(5)}}
              selected={value === 5}
            >
              <ListItemText  
                className={classes.drawerItem}
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
                <AppBar position='fixed' color='primary' className={classes.appbar}>
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
