import * as React from 'react';
import {useState,useEffect} from 'react';
import { DataGrid,} from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import {useLocation} from 'react-router-dom';
import { Tooltip } from '@material-ui/core';
import {useNavigate} from "react-router-dom";
import { Button, Grid, Typography, Box } from "@material-ui/core";


const CartPage = (props) =>{
    const location = useLocation();
    const navigate = useNavigate();
    const listStyle={padding:'10px 10px', width:550,margin:"40px auto", height:450,position:"relative"}
    const [items,setItems] =useState([]);
    const [selection,setSelection] =useState([]);
    var currentUserItems=[];

    
    const { disabled, mounted, ...others } = props;
    var currentUser = location.state.user_id;
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(() =>{
        fetch("http://localhost:8080/purchase/getAll")
        .then(res=>res.json())
        .then((result)=>{
            var filteredResult = result.filter(item =>item.user_id === currentUser);
            setItems(filteredResult);
        })
    },[])
    
    currentUserItems = items;

    const handleDelete = (clickedItem) => {
        setItems(items.filter((item) => item.id !== clickedItem.id));
        console.log(clickedItem.id);
      };

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
            width: 120,
          },
          {
            field: "action",
            headerName: "Action",
            width: 80,
      
            renderCell: (id) => (
              <>
                     
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