import React, { Component } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { withStyles } from "@material-ui/core/styles"
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import { withRouter } from "react-router-dom"

const drawerWidth = 240

const styles = (theme) => ({
    root: {
        display: "flex"
    },
    toolbar: {
        paddingRight: 24
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36
    },
    menuButtonHidden: {
        display: "none"
    },
    title: {
        flexGrow: 1
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "hidden"
    }
})

class Layout extends Component {
    render() {
        const { classes, title, children } = this.props

        return (
            <div className={classes.root}>
                <AppBar position="absolute"
                    className={classNames(classes.appBar, false && classes.appBarShift)}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" noWrap className={classes.title}>
                            {title}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />

                    {children}
                </main>
            </div>
        )
    }
}

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired
}

export default withRouter(withStyles(styles, { withTheme: true })(Layout))