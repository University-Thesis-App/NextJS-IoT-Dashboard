import React, { useEffect, useState } from 'react';
import api from '../../api';
import { makeStyles } from '@material-ui/core/styles';
import withAuth from '../../components/withAuth';
import { useRouter } from 'next/router'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles({
    container: {
        marginTop: 100,
    },
    table: {
        minWidth: 650,
    },
    pagination: {
        margin: "20px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

    }
});

function Metrics() {
    const [device, setDevice] = React.useState({ variables: [] });
    const [metrics, setMetrics] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const router = useRouter();
    const { id } = router.query;
    const classes = useStyles();

    useEffect(() => {
        api.get('/api/devices/' + id).then((response) => {
            setDevice(response.data.data);
            setMetrics(response.data.data.metrics.map(m => ({ ...m, date: new Date(m.date * 1000) })))
        }).catch(console.log)
    }, []);


    return (
        <div className={classes.container}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            {device?.variables.map(variable => <TableCell key={variable.id}>{variable.label}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {metrics.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{`${row.date.toDateString()} ${row.date.getHours()}:${row.date.getMinutes()}`}</TableCell>
                                {Object.keys(row.values).map(key => (<TableCell>{row.values[key]}</TableCell>))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className={classes.pagination}>
                <Pagination

                    count={150}
                    rowsPerPage={15}
                    shape="rounded"
                    page={page}
                    onChange={(event, newPage) => console.log(event, newPage)}
                />
            </div>
        </div >
    );
}

export default withAuth(Metrics);