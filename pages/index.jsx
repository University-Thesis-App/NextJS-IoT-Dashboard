import { useEffect } from 'react';
import api from '../api';
import React from 'react';
import { makeStyles, Card, Grid, Container, Paper, Typography } from '@material-ui/core';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import withAuth from '../components/withAuth';

const drawerWidth = 240;

function pad2(n) {
  return n > 9 ? "" + n : "0" + n;
}

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
  appBarSpacer: theme.mixins.toolbar,
  layout: {
    margin: `0 ${theme.spacing()}`
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

function Home() {

  const theme = useTheme();

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [devices, setDevices] = React.useState([]);

  useEffect(() => {
    api.get('/api/devices').then((response) => {
      const formatted = response.data.data.map(device => {
        const latestMetrics = device.latest_metrics.reduce((acc, metric) => {
          Object.keys(metric.values).forEach(v => {
            if (!Array.isArray(acc[v])) {
              acc[v] = [];
            }

            console.log(new Date(metric.date * 1000));
            const date = new Date(metric.date * 1000);
            acc[v].push({ date: `${pad2(date.getHours())}:${pad2(date.getMinutes())}`, value: metric.values[v] })
          });

          return acc;
        }, {});

        return { ...device, latest_metrics: latestMetrics };
      });
      setDevices(formatted);
    }).catch(console.log)
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {devices.map(device => {
            console.log(device);
            return Object.keys(device.latest_metrics).map(key => (
              <Chart title={device.name} key={`${device.id}_${key}`} theme={theme} data={device.latest_metrics[key]} label={device.variables.find(v => v.name === key).label} fixedHeightPaper={fixedHeightPaper} />
            ))
          })}
        </Grid>
      </Container>
    </main>
  )
}


function Chart({ data, label, fixedHeightPaper, theme, title }) {
  return (
    <Grid item xs={6} md={6} lg={6}>
      <Paper className={fixedHeightPaper}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          {title}
        </Typography>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}
          >
            <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
            <YAxis stroke={theme.palette.text.secondary}>
              <Label
                angle={270}
                position="left"
                style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
              >
                {label}
              </Label>
            </YAxis>
            <Line type="monotone" dataKey="value" stroke={theme.palette.primary.main} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Grid>
  );
}

export default withAuth(Home);