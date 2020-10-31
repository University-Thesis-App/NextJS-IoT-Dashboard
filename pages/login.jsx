import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';

const styles = theme => ({
    pageWrapper: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
    },
    maxWidth: {
        maxWidth: 400,
        margin: 'auto',
        padding: theme.spacing(2),
    },
    margin: {
        margin: theme.spacing.unit * 2,
    },
    marginTop: {
        marginTop: theme.spacing()
    },
    padding: {
        padding: theme.spacing.unit
    },
    input: {
        minWidth: 290
    }
});

function Login({ classes }) {
    return (
        <div className={classes.pageWrapper}>
            <Paper className={classes.maxWidth}>
                <div className={classes.margin}>
                    <Grid container spacing={4} alignItems="flex-end">
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField className={classes.input} id="username" label="Username" type="email" fullWidth autoFocus required />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">

                        <Grid item md={true} sm={true} xs={true}>
                            <TextField className={classes.input} id="username" label="Password" type="password" fullWidth required />
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" justify="space-between" className={classes.marginTop}>
                        <Grid item>
                            <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
                        </Grid>
                    </Grid>
                    <Grid container justify="center" className={classes.marginTop}>
                        <Button variant="outlined" color="primary" style={{ textTransform: "none" }}>Login</Button>
                    </Grid>
                </div>
            </Paper>
        </div>
    )
}

export default withStyles(styles)(Login);
