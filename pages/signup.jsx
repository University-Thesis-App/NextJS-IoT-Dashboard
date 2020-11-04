import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Grid, Paper, withStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { useState } from 'react';


const styles = theme => ({
    pageWrapper: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='12' viewBox='0 0 20 12'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='charlie-brown' fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M9.8 12L0 2.2V.8l10 10 10-10v1.4L10.2 12h-.4zm-4 0L0 6.2V4.8L7.2 12H5.8zm8.4 0L20 6.2V4.8L12.8 12h1.4zM9.8 0l.2.2.2-.2h-.4zm-4 0L10 4.2 14.2 0h-1.4L10 2.8 7.2 0H5.8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    maxWidth: {
        maxWidth: 400,
        margin: 'auto',
        padding: theme.spacing(2),
    },
    margin: {
        margin: theme.spacing(2),
    },
    marginTop: {
        marginTop: theme.spacing()
    },
    padding: {
        padding: theme.spacing()
    },
    submit: {
        minWidth: 290
    },
});

function SignUp({ classes }) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function SignUp() {
        api.get('/sanctum/csrf-cookie').then(() => {
            api.post('/register', { fullname, email, password }).then(response => {
                console.log(response);
            }).catch(console.log)
        });
    }
    return (
        <div className={classes.pageWrapper}>
            <Paper className={classes.maxWidth}>
                <div className={classes.margin}>
                    <form className={classes.form} noValidate>
                        <Grid ccontainer spacing={8} alignItems="flex-end">
                            <Grid item md={true} sm={true} xs={true}>
                                <TextField
                                    className={classes.submit}
                                    autoComplete="fullname"
                                    name="fullname"
                                    fullWidth autoFocus required
                                    id="fullname"
                                    label="Full Name"
                                    value={fullName} onChange={(event) => setFullName(event.target.value)} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item md={true} sm={true} xs={true}>
                                <TextField
                                    className={classes.submit}
                                    fullWidth autoFocus required
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email} onChange={(event) => setEmail(event.target.value)} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item md={true} sm={true} xs={true}>
                                <TextField
                                    className={classes.submit}
                                    fullWidth autoFocus required
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={password} onChange={(event) => setPassword(event.target.value)} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item md={true} sm={true} xs={true}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Grid container justify="center" className={classes.marginTop}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="outlined"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign Up
          </Button>
                        </Grid>
                    </form>

                    <Box mt={5}>
                    </Box>
                </div>
            </Paper>
        </div >

    )
}
export default withStyles(styles)(SignUp);