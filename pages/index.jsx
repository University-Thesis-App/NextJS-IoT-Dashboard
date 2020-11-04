import { useEffect } from 'react';
import api from '../api';
import React from 'react';
import { Button, Typography, Toolbar, AppBar, IconButton, makeStyles, Card, Grid, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Menu, Home as HomeIcon, Person, DevicesOther, ChevronRight } from '@material-ui/icons';
import clsx from "clsx";

const drawerWidth = 240;

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
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
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

  const classes = useStyles();

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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <Grid className={classes.layout} container justify="center" spacing={3}>
        {devices.map((device) =>
          <Grid item xs={6} key={device.id}>
            <Card>{device.token}</Card>
          </Grid>)}
      </Grid>
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
