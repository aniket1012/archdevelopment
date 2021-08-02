import React from 'react'
import { makeStyles } from '@material-ui/styles'


const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: theme.palette.common.arcBlue,
        width: '100%'
    }
}))

function Footer() {
    const classes = useStyles()


    return (
        <footer className={classes.footer}>
            Example Footer
        </footer>
    )
}

export default Footer
