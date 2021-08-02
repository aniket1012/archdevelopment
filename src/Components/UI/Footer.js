import React from 'react'
import { makeStyles } from '@material-ui/styles'

import footerAdornment from '../../assets/Footer Adornment.svg'


const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: theme.palette.common.arcBlue,
        width: '100%',
        zIndex: 1302,
        position: 'relative'
    },
    adornment: {
        width: '15em',
        verticalAlign: 'bottom',
        [theme.breakpoints.down('md')]: {
            width: '12em'
        },
        [theme.breakpoints.down('xs')]: {
            width: '10em'
        },
    }
}))

function Footer() {
    const classes = useStyles()


    return (
        <footer className={classes.footer}>
            <img  
                className={classes.adornment}
                alt='black decorative slash' 
                src={footerAdornment}
            />
        </footer>
    )
}

export default Footer
