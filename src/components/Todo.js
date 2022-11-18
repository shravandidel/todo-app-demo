import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ToDoApp() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [toDos, setTodos] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [open2,setOpen2]=useState(false)
  const [newVariable,setNewVariable]=useState()
  
  const date =new Date
  const hours =date.getHours()
  const minutes=date.getMinutes()
  const hourAndMin=`${hours}:${minutes}`



  


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
       
    if (value !== "") {
        toDos.push({
        id:Math.floor(Math.random()*1000),
        value:value,
        hours:hours,
        minutes:minutes,
        modifiedTime:''
        
      });
    } else {
      alert("Add a Task");
    }
    setValue("");
    setOpen(false);
  };

  const handleCompleted = (id) => {
    const newTodos = toDos.filter((todo) => todo.id !== id);
    const clickedTodo = toDos.filter((todo) => id === todo.id);
   

    const returnedClickedTodo=clickedTodo.map((todo)=>Object.assign(todo,{completedTime:hourAndMin}))
    
    
    setCompleted([...completed,...clickedTodo]);
    setTodos(newTodos);
  };

  const handleEdit = (id,index) => {
    
   const clickedTodo = toDos.filter((todo) => todo.id === id);
   // const returnedClickedTodo=clickedTodo.map((todo)=>Object.assign(todo,{modifiedTime:hourAndMin}))
    
     

    // console.log(clickedTodo)
    const oldValue=clickedTodo.map(todo=>todo.value)
    setValue2(oldValue);
    // setTodos(newTodos);
    // setOpen(true);
    setOpen2(true)
    setNewVariable(index)
  };

  const handleEditSubmit=(id)=>{
    const clickedTodo = toDos.filter((todo) => todo.id === id);
   
    toDos[newVariable].value=value2
    toDos[newVariable].modifiedTime=hourAndMin
    setOpen2(false)
    setValue('')
    setValue2('')
  
  }
  const handleEditClose =()=>{
    setOpen2(false)
    setValue('')
  }

  const handleDelete = (id) => {
    const newTodos = toDos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleKeyPress=(e)=>{
      if(e.key==='Enter'){
        handleSubmit()
      }
  }

  const handleKeyPress2=(e,id)=>{
     if(e.key==='Enter'){
      handleEditSubmit(id)
     }
  }




  return (
    <Box>
      <Box>
        <Button
          sx={{
            margin: "10px",
          }}
          onClick={handleOpen}
          color="error"
          variant="contained"
        >
          Add Tasks
        </Button>

        <Dialog open={open} onClose={handleClose} BackdropProps={{invisible:true}} 
           PaperProps={{
            sx:{boxShadow:'none',
                border:'2px solid black'
          }
           }}
        
        >
          
          <DialogContent
            sx={{
              width: "500px",
              height: "300px",
              display: "flex",
              flexDirection: "column",
              alignItem: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" color="error">
              Add a Task
            </Typography>
            <input
              type="text"
              style={{ height: "30px" }}
              value={value}
              onKeyPress={handleKeyPress}
              onChange={(e) => setValue(e.target.value)}
            ></input>

            <Button
              onClick={handleSubmit}
              color="error"
              
              variant="contained"
              sx={{ width: "100px", marginTop: "10px" }}
            >
              Submit
            </Button>

          </DialogContent>
          {/* </form> */}
        </Dialog>
      </Box>

      <Grid container sx={{ margin: "0px" }} rowSpacing={5}>
        {toDos.map((todo, index) => (
          <Grid
            sx={{
              border: "2px solid yellow",
              margin: "10px",
              padding: "4px",
              display: "flex",
            }}
            key={todo.id}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box>{todo.value}</Box>

              <Box
                sx={{
                  color: "darkGrey",
                  fontSize: "10px",
                }}
              >
                added at:{todo.hours}:{todo.minutes} {todo.modifiedTime && <span> modified at:{todo.modifiedTime}</span>}
              </Box>
            </Box>

            <IconButton
              variant="outlined"
              sx={{
                color:'green'
              }}
              onClick={() => handleCompleted(todo.id)}
            >
              <TaskAltIcon />
            </IconButton>

            <IconButton onClick={() => handleEdit(todo.id,index)}>
              <EditIcon color="info" />
            </IconButton>

      <Dialog open={open2} onClose={handleEditClose}  BackdropProps={{invisible:true}} 
      PaperProps={{
        sx:{boxShadow:'none',
            border:'2px solid black'
      }
       }}
      >
          {/* <DialogTitle>Add a Task</DialogTitle> */}
          <DialogContent
            sx={{
              width: "500px",
              height: "300px",
              display: "flex",
              flexDirection: "column",
              alignItem: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" color="error">
             Edit your Task
            </Typography>
            
            <input
              type="text"
              style={{ height: "30px" }}
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              onKeyPress={(e)=>handleKeyPress2(e,todo.id)}
            ></input>

            <Button
            type="submit"
              onClick={()=>handleEditSubmit(todo.id)}
              color="error"
              variant="contained"
              sx={{ width: "100px", marginTop: "10px" }}
            >
              Submit
            </Button>
            
          </DialogContent>
        </Dialog>
    
       

            <IconButton onClick={() => handleDelete(todo.id)}>
              <DeleteIcon color="error" />
            </IconButton>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          position: "fixed",
          top: "500px",
          height: "240px",
          width: "99.6vw",
          border: "3px solid red ",
        }}
      >
        <Typography variant="h3" color="error">
          Completed Tasks
        </Typography>
        <Grid container>
          {completed.map((todo, index) => {
            return (
              <Grid
                sx={{
                  border: "2px solid green",
                  margin: "10px",
                  padding: "4px",
                }}
                key={todo.id}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box>{todo.value}</Box>

                  <Box
                    sx={{
                      color: "darkGrey",
                      fontSize: "10px",
                    }}
                  >
                    completed at:{todo.completedTime}
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}

export default ToDoApp;
