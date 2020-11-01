import { useEffect } from 'react';
import api from '../api';
import React from 'react';
import { Button, Typography, Toolbar, AppBar, IconButton, makeStyles, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
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
  }
}));

export default function Home() {
  useEffect(() => {
    api.get('/api/devices').then(console.log).catch(console.log)
  }, []);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <AppBar position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}>
        <Toolbar>
          <IconButton
            className={clsx(classes.menuButton, open && classes.hide)}
            edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            IoT Dashboard
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRight />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key={"Home"}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
          <ListItem button key={"Devices"}>
            <ListItemIcon>
              <DevicesOther />
            </ListItemIcon>
            <ListItemText primary={"Devices"} />
          </ListItem>
          <ListItem button key={"Profile"}>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary={"Profile"} />
          </ListItem>
        </List>
      </Drawer>

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
