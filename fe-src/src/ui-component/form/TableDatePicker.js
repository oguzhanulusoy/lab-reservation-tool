import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TableDatePicker() {
 const [startDate, setStartDate] = useState(new Date());
 const [endDate, setEndDate] = useState(new Date()); //on some examples it's -> useState(null);

 const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

 return (
   <div>
     <DatePicker
       selected={startDate}
       onChange={onChange}
       startDate={startDate}
       endDate={endDate}
       selectsRange
       inline
     />
   </div>
 );
}