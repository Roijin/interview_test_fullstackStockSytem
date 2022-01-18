import * as React from 'react';
import {useState,useEffect} from 'react';
import { DataGrid,} from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import {useLocation} from 'react-router-dom';
import {useNavigate} from "react-router-dom";


const CartPage = (props) =>{
    const location = useLocation();
    const navigate = useNavigate();
    const listStyle={padding:'10px 10px', width:550,margin:"40px auto", height:450,position:"relative"}
    const [items,setItems] =useState([]);
    const [selection,setSelection] =useState([]);

    
    const { disabled, mounted, ...others } = props;
    var currentUser = location.state.user_id;

    useEffect(() =>{
        fetch("http://localhost:8080/purchase/get-user/"+currentUser)
        .then(res=>res.json())
        .then((result)=>{
            setItems(result);
        })
    },[])
    

    const handleDelete = (clickedItem) => {
        setItems(items.filter((item) => item.id !== clickedItem.id));
        fetch("http://localhost:8080/purchase/delete/"+ clickedItem.id, {method:'DELETE'})
        .then(()=>console.log(clickedItem.id))
        
      };

    const handleChange = (clickedItem) => {
      console.log(clickedItem.row.quantity);
      fetch("http://localhost:8080/purchase/update/"+ clickedItem.id, {
        method:'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({'quantity': clickedItem.row.quantity})
      })
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        {
          field: 'user_id',
          headerName: 'User ID',
          type: 'number',
          width: 100,
        },
        {
          field: 'item_id',
          headerName: 'Item ID',
          type: 'number',
          width: 100,
        },
        {
          field: 'quantity',
          headerName: 'QTY',
          type: 'number',
          width: 70,
          editable: true,
        },
        {
            field: 'date',
            headerName: 'TimeStamp',
            type: 'dateTime',
            width: 80,
          },
          {
            field: "action",
            headerName: "Actions",
            width: 150,
      
            renderCell: (id) => (
              <>
                     
                <IconButton
                  onClick={() => handleChange(id)}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  <ChangeCircleIcon fontSize="large" />
                </IconButton>

                <IconButton
                  onClick={() => handleDelete(id)}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  <DeleteIcon fontSize="large" />
                </IconButton>
              </>
            )
          }
      ];
      
  return (
        <div className="App" style={listStyle}>
            <DataGrid
            rows={items}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[20]}
            onSelectionModelChange={(newSelection) => {
                setSelection(newSelection);
            }}
            />
        </div>
  );
}


export default CartPage;