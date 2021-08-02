import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { 
    Grid 
    } from '@material-ui/core'

import footerAdornment from '../../assets/Footer Adornment.svg'


const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.common.arcBlue,
    width: "100%",
    zIndex: 1302,
    position: "relative",
  },
  adornment: {
    width: "15em",
    verticalAlign: "bottom",
    [theme.breakpoints.down("md")]: {
      width: "12em",
    },
    [theme.breakpoints.down("xs")]: {
      width: "10em",
    },
  },
  mainContainer: {
    position: "absolute",
  },
  link: {
    color: 'white',
    fontFamily: 'Arial',
    fontSize: '0.75rem',
    fontWeight: 'bold'
  },
}));

function Footer() {
    const classes = useStyles()


    return (
      <footer className={classes.footer}>
        <Grid container justify="center" className={classes.mainContainer}>
          <Grid item>
            <Grid container direction="column">
              <Grid item className={classes.link}>
                Home
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <Grid item className={classes.link}>
                Services
              </Grid>
              <Grid item className={classes.link}>
                Custom Software Development
              </Grid>
              <Grid item className={classes.link}>
                Mobile App Development
              </Grid>
              <Grid item className={classes.link}>
                Website Development
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <Grid item className={classes.link}>
                  The Revolution
              </Grid>
              <Grid item className={classes.link}>
                  Vision
              </Grid>
              <Grid item className={classes.link}>
                  Technology
              </Grid>
              <Grid item className={classes.link}>
                  Process
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
              <Grid container direction='column'>
                  <Grid item className={classes.link}>
                      About Us
                  </Grid>
                  <Grid item className={classes.link}>
                      History
                  </Grid>
                  <Grid item className={classes.link}>
                      Team
                  </Grid>
              </Grid>
          </Grid>
          <Grid item>
              <Grid container directionm='column'>
                  <Grid item className={classes.link}>
                      Contact Us
                  </Grid>
              </Grid>
          </Grid>
        </Grid>
        <img
          className={classes.adornment}
          alt="black decorative slash"
          src={footerAdornment}
        />
      </footer>
    );
}

export default Footer
