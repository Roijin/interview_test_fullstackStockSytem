import * as React from 'react';
import {useState,useEffect} from 'react';
import { DataGrid,} from '@mui/x-data-grid';
import PopUp from '../modules/views/Popup';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import {useLocation} from 'react-router-dom';
import { Tooltip } from '@material-ui/core';
import {useNavigate} from "react-router-dom";


function AdminPage(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const listStyle={padding:'10px 10px', width:610,margin:"40px auto", height:450,position:"relative"}
    const [items,setItems] =useState([])
    const [selection,setSelection] =useState([])
    const [isOpen,setIsOpen] =useState(false)

    const { disabled, mounted, ...others } = props;
    var currentUser = location.state.user_id;
    var json=[];
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleDelete = (clickedItem) => {
        setItems(items.filter((item) => item.id !== clickedItem.id));
        fetch("http://localhost:8080/stock/delete/"+ clickedItem.id, {method:'DELETE'})
        .then(()=>console.log(clickedItem.id))
        
      };

      const handleChange = (clickedItem) => {
        console.log(clickedItem.row.quantity);
        fetch("http://localhost:8080/stock/update/"+ clickedItem.id, {
          method:'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({'quantity': clickedItem.row.quantity,
                                'name':clickedItem.row.name,
                                'price':clickedItem.row.price})
        })
      }

    useEffect(() =>{
        fetch("http://localhost:8080/stock/getAll")
        .then(res=>res.json())
        .then((result)=>{
            setItems(result);
        }
        )
    },[])

    async function addItem(values){
        await sleep(300);
        console.log(JSON.stringify(values));
        fetch("http://localhost:8080/purchase/add",{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        }).then(()=>{
            console.log('New Items Added')
        })
    };

    async function getItems(){
      await sleep(300);
      fetch("http://localhost:8080/stock/getAll")
        .then(res=>res.json())
        .then((result)=>{
            setItems(result);
        })
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'name',
          headerName: 'Item name',
          width: 110,
          editable: true,
        },
        {
          field: 'quantity',
          headerName: 'Quantity',
          type: 'number',
          width: 100,
          editable: true,
        },
        {
          field: 'price',
          headerName: 'Price(Rp)',
          type: 'number',
          width: 110,
          editable: true,
        },
        {
            field: "action",
            headerName: "Actions",
            width: 110,
      
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
            checkboxSelection
            disableSelectionOnClick
            onSelectionModelChange={(newSelection) => {
                setSelection(newSelection);
            }}
            />
            <div >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Tooltip title="Add items to cart"> 
            <IconButton color="primary" aria-label="add to shopping cart"
            onClick={() => {
                for (var i in selection){
                    json[i] = {"user_id": " " + currentUser + " ",
                                "item_id": " " + selection[i] + " ",
                                "quantity":' 1 '}
                    addItem(json[i]);
                };
                alert("Added items to cart")
              }}>
                <AddCircleOutlineIcon fontSize="large" />
            </IconButton>
            </Tooltip>
            <Tooltip title="Add item to stock"> 
            <IconButton color="primary" aria-label="add to shopping cart"
                onClick={() => {
                  setIsOpen(true);
                }}>
                <AddBoxIcon fontSize="large" />
            </IconButton>
            </Tooltip>
            <Tooltip title="Refresh Stock List"> 
            <IconButton color="primary" aria-label="add to shopping cart"
                onClick={() => {
                  getItems();
                }}>
                <RefreshIcon fontSize="large" />
            </IconButton>
            </Tooltip>  
            <Tooltip title="Go to cart"> 
            <IconButton color="primary" aria-label="add to shopping cart"
                onClick={() => {
                    navigate("/Cart",{state:{user_id:currentUser}})
                }}>
                <ShoppingCartIcon fontSize="large" />
            </IconButton>
            </Tooltip> 
            </Stack>
            </div>
            <PopUp open={isOpen} onClose={() => 
              setIsOpen(false)
              }/>
      </div>
  );
}


export default AdminPage;