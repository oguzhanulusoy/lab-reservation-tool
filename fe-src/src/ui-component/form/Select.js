import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect,useState } from "react";

import ServiceCaller from 'services/ServiceCaller';
import ReservationService from "services/reservation/ReservationService";

export default function SelectOtherProps() {
  const [age, setAge] = React.useState('');
  const [error, setError] = useState(null);

  const handleChange = (event) => {

    
    setAge(event.target.value);
  };

  const getData = () => {
    let serviceCaller = new ServiceCaller();
    ReservationService.getReservations(serviceCaller, '', (res) => {
      setIsLoaded(true);
      setRows(res);
    }, (error) => {
      console.log(error)
      setIsLoaded(true);
      setError(error);
    })
    //setRefresh(false);
  }
  
  return (
    <div>            
      <FormControl required sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-required-label">Server</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={age}
          label="Servers *"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>TRSBRMS1</MenuItem>
          <MenuItem value={20}>TRSBRMS2</MenuItem>
          <MenuItem value={20}>TRSBRMS3</MenuItem>
          <MenuItem value={20}>TRSBRMS4</MenuItem>
          <MenuItem value={20}>TRSBRMS5</MenuItem>
          <MenuItem value={20}>TRSBRMS6</MenuItem>
          <MenuItem value={20}>TRSBRMS7</MenuItem>
          <MenuItem value={20}>TRSBRMS8</MenuItem>
          <MenuItem value={20}>TRSBRMS9</MenuItem>
          <MenuItem value={20}>TRSBRMS10</MenuItem>
          <MenuItem value={20}>TRSBRMS11</MenuItem>
          <MenuItem value={20}>TRSBRMS12</MenuItem>
          <MenuItem value={20}>TRSBRMS13</MenuItem>
          <MenuItem value={20}>TRSBRMS14</MenuItem>
          <MenuItem value={20}>TRSBRMS15</MenuItem>
          <MenuItem value={20}>TRSBRMS16</MenuItem>
          <MenuItem value={20}>TRSBRMS17</MenuItem>
          <MenuItem value={20}>TRSBRMS18</MenuItem>
          <MenuItem value={20}>TRSBRMS19</MenuItem>
          <MenuItem value={20}>TRSBRMS20</MenuItem>
          <MenuItem value={20}>TRSBRMS21</MenuItem>
          <MenuItem value={20}>TRSBRMS22</MenuItem>
          <MenuItem value={20}>TRSBRMS23</MenuItem>
          <MenuItem value={20}>TRSBRMS24</MenuItem>
          <MenuItem value={20}>TRSBRMS25</MenuItem>
          <MenuItem value={20}>TRSBRMS26</MenuItem>
          <MenuItem value={20}>TRSBRMS27</MenuItem>
          <MenuItem value={20}>TRSBRMS28</MenuItem>
          <MenuItem value={20}>TRSBRMS29</MenuItem>
          <MenuItem value={20}>TRSBRMS30</MenuItem>
          <MenuItem value={20}>TRSBRMS31</MenuItem>
          <MenuItem value={20}>TRSBRMS32</MenuItem>
          <MenuItem value={20}>TRSBRMS33</MenuItem>
          <MenuItem value={20}>TRSBRMS34</MenuItem>
          <MenuItem value={20}>TRSBRMS35</MenuItem>
          <MenuItem value={20}>TRSBRMS36</MenuItem>
          <MenuItem value={20}>TRSBRMS37</MenuItem>
          <MenuItem value={20}>TRSBRMS38</MenuItem>
          <MenuItem value={20}>TRSBRMS39</MenuItem>
          <MenuItem value={20}>TRSBRMS40</MenuItem>
          <MenuItem value={20}>TRSBRMS41</MenuItem>
          <MenuItem value={20}>TRSBRMS42</MenuItem>
          <MenuItem value={20}>TRSBRMS43</MenuItem>
          <MenuItem value={20}>TRSBRMS44</MenuItem>
          <MenuItem value={20}>TRSBRMS45</MenuItem>
          <MenuItem value={20}>TRSBRMS46</MenuItem>
          <MenuItem value={20}>TRSBRMS47</MenuItem>
          <MenuItem value={20}>TRSBRMS48</MenuItem>
          <MenuItem value={20}>TRSBRMS49</MenuItem>
          <MenuItem value={20}>TRSBRMS50</MenuItem>
          <MenuItem value={20}>TRSBRMS51</MenuItem>
          <MenuItem value={20}>TRSBRMS52</MenuItem>
          <MenuItem value={20}>TRSBRMS53</MenuItem>
          <MenuItem value={20}>TRSBRMS54</MenuItem>
          <MenuItem value={20}>TRSBRMS55(zhhszscp-a2hp01)</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
    </div>
  );
}