import { useEffect } from 'react';
import api from '../api';
import React from 'react';
import { makeStyles, Card, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  main: {
    marginTop: 100,
  },
  layout: {
    margin: `0 ${theme.spacing()}`
  }
}));

export default function Home() {


  const [devices, setDevices] = React.useState([]);

  useEffect(() => {
    // const interval = setInterval(() => {
    api.get('/api/devices').then((response) => {
      console.log(response.data.data);
      setDevices(response.data.data);
    }).catch(console.log)
    // }, 5000);

    // return () => clearInterval(interval);
  }, []);


  return (
    <div>
      <Grid justify="center" spacing={3}>
        {devices.map((device) =>
          <Grid item xs={6} >
            <Card key={device.id}>{device.token}</Card>
          </Grid>)}
      </Grid>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  )
}





//todo: after authentication should check if the user is authedicated or not
// export async function getServerSideProps({ res, params }) {
//   try {
//     const response = await api.get('/api/devices');
//     console.log(response);
//     return { props: {} }
//   } catch (error) {
//     console.log(error);
//   }
//   // res.statusCode = 307
//   // res.setHeader('Location', `/login`)
//   return { props: {} }
// }
