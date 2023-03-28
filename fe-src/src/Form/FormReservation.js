import { Button, FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import React, { Component } from 'react';
import DatePicker from '@mui/x-date-pickers-pro/DatePicker';


class FormReservation extends Component {
    
    render() {
        return (
            <div>
                <FormControl>
                    <InputLabel>Server Name</InputLabel>
                    <Input onChange={(i) => handleServerName(i.target.value)} />
                    <InputLabel style={{ top: 50 }}>Description</InputLabel>
                    <Input type="textarea" placeholder="Enter description" style={{ top: 40 }}
                        onChange={(i) => handleDescription(i.target.value)} />
                    <InputLabel style={{ top: 80 }}>Select Starting Date</InputLabel>
                    <DatePicker></DatePicker>
                    <InputLabel style={{ top: 80 }}>Select Finishing Date</InputLabel>
                    <DatePicker></DatePicker>
                    <Button variant="contained" style={{
                        marginTop: 60, background: 'linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)',
                        color: 'white'
                    }}
                        onClick={() => handleButton("send")}>Send</Button>
                </FormControl>
            </div>
        );
    }
}

export default FormReservation;