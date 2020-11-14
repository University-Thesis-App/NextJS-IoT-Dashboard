import React, { useEffect, useState } from 'react';
import api from '../../api';
import { makeStyles } from '@material-ui/core/styles';
import { Edit, Delete, Code } from '@material-ui/icons';
import withAuth from '../../components/withAuth';

import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@material-ui/core';
import ManageDevice from '../../components/ManageDevice';
import GenerateCode from '../../components/GenerateCode';

const useStyles = makeStyles({
    container: {
        marginTop: 100
    },
    table: {
        minWidth: 650,
    },
});

function Devices() {
    const [devices, setDevices] = React.useState([]);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [editDevice, setEditDevice] = useState(null);

    const classes = useStyles();

    useEffect(() => {
        api.get('/api/devices').then((response) => {
            setDevices(response.data.data);
        }).catch(console.log)
    }, []);

    function handleClose(mode, values) {
        if (mode === 'create') {
            setCreateModalOpen(false);
            setDevices([values, ...devices]);
        }

        if (mode === 'update') {
            setEditDevice(null);
            console.log(values);
            const updatedDevices = devices.map(d => {
                if (d.id === values.id) {
                    return values;
                }

                return d;
            })
            setDevices(updatedDevices);
        }
    }

    return (
        <div className={classes.container}>
            <Button variant="contained" color="primary" onClick={() => { setCreateModalOpen(true) }}>Create new device</Button>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Token</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {devices.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th">
                                    {row.name}
                                </TableCell>
                                <TableCell >{row.token}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => {
                                        setSelectedDevice(row)
                                        // console.log(generate(row.token, row.variables))
                                    }}><Code /></Button>
                                    <Button onClick={() => {
                                        setEditDevice(row);
                                    }}><Edit /> </Button>
                                    <Button onClick={() => {
                                        api.delete('/api/devices/' + row.id).then(() => {
                                            setDevices(devices => devices.filter(device => device.id !== row.id));
                                        })
                                    }}><Delete /></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            { createModalOpen && <ManageDevice open={createModalOpen} handleClose={handleClose} />}
            { editDevice && <ManageDevice open={editDevice} device={editDevice} handleClose={handleClose} />}

            { selectedDevice && <GenerateCode open={selectedDevice} handleClose={() => setSelectedDevice(null)} />}
        </div >
    );
}

export default withAuth(Devices);