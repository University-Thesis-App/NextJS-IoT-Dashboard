import React from 'react';
import {
    Modal,
    TextField,
    Button
} from '@material-ui/core';
import { Formik, Field, Form, FieldArray, getIn } from 'formik';
import { generate } from "shortid";
import { makeStyles } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';
import api from '../api';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 300,
        flexGrow: 1,
        minWidth: 300,
        transform: 'translateZ(0)',
        '@media all and (-ms-high-contrast: none)': {
            display: 'none',
        },
    },
    modal: {
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    variable: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

const Input = ({ field, form: { errors } }) => {
    const errorMessage = getIn(errors, field.name);

    return (
        <>
            <TextField {...field} />
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        </>
    );
};

export default function EditDevice(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Modal
                open={props.open}
                className={classes.modal}
                onClose={props.handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div
                    className={classes.paper}
                >
                    <Formik
                        initialValues={{
                            name: '',
                            variables: [{ id: generate(), name: '', label: '', }]
                        }}
                        onSubmit={async (values) => {
                            console.log(values);
                            api.post('/api/devices', values).then(response => {
                                console.log(response);
                            }).catch(console.log)
                        }}
                    >
                        {({ values, errors }) => (
                            <Form>
                                <Field name="name" component={Input} placeholder="Device name" />

                                <FieldArray name="variables">
                                    {({ push, remove }) => (
                                        <div>
                                            {values.variables.map((v, index) => {
                                                return (
                                                    <div key={v.id} className={classes.variable}>
                                                        <Field
                                                            name={`variables[${index}].name`}
                                                            component={Input}
                                                            placeholder="Name"
                                                        />
                                                        <Field
                                                            name={`variables[${index}].label`}
                                                            component={Input}
                                                            placeholder="Label"
                                                        />
                                                        <div onClick={() => remove(index)}><Delete /></div>
                                                    </div>
                                                );
                                            })}
                                            <Button
                                                type="button"
                                                onClick={() =>
                                                    push({ id: generate(), name: "", label: "" })
                                                }
                                            >
                                                Add new variable
                                            </Button>
                                        </div>
                                    )}
                                </FieldArray>

                                <Button type="submit">Edit device</Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal>
        </div>

    )
}