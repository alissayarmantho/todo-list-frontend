import React from 'react';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import './App.css';

function App() {
  return (
    <div>
      <div className = "Banner"></div>
        <div className = "App">
          <div className = "Categories"> 
            <div className = "Categories_Card">All</div>
            <div className = "Categories_Card">Today</div>
            <div className = "TextfieldContainer">
              <TextField className = "Add_TodoCard" variant="standard" placeholder="Add a Category" margin="normal"/>
              <AddIcon className = "AddButton"/>
            </div>
          </div>
          <div className = "Todo">
            <p className = "Title">Todo List</p>
            <div className = "Todo_Card">
              <div className = "Todo_Content">Play Game!</div>
              <div className = "UpdateandDelete">
                <CreateIcon/>
                <DeleteIcon/>
              </div>
            </div>
            <div className = "Todo_Card">
              <div className = "Todo_Content">Play More Everyone!</div>
              <div className = "UpdateandDelete">
                <CreateIcon/>
                <DeleteIcon/>
              </div>
            </div>
            <div className = "TextfieldContainer">
            <TextField     
            className = "Add_TodoCard" variant="standard" placeholder="Add a Todo" margin="normal"/>
            <AddIcon className = "AddButton"/>
          </div>
          </div>
          
      </div>
    </div>
  );
}

export default App;
