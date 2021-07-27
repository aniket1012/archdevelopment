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
} from "@material-ui/core";


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
}));



const Header =(props)  => {

    const classes = useStyles();
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    const[value, setValue] = useState(0)
    const[anchorEl, setAnchorEl] = useState(null)
    const[open, setOpen] = useState(false)
    const[selectedIndex, setSelectedIndex] = useState(0)

    const handleChange = (e, value) => {
        console.log(e, value);
        setValue(value)
    }

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
      setOpen(true)
    }

    const handleMenuItemClick = (event, index) => {
      setAnchorEl(null)
      setOpen(false)
      setSelectedIndex(index)
    }

    const handleClose = (event) => {
      setAnchorEl(null)
      setOpen(false)

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
          open={open}
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
    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar position='fixed' color='primary'>
                    <Toolbar disableGutters>
                        <Button component={Link} to='/' className={classes.logoContainer} onClick={()=>setValue(0)} disableRipple>
                            <img src={logo} alt='company logo' className={classes.logo}/>
                        </Button>
                        {matches ? null : tabs}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin}></div>
        </React.Fragment>
    )
}

export default Header
