import React, { useEffect, useState } from 'react'
import EditModal from './EditModal'
import {RiDeleteBin6Fill} from 'react-icons/ri'
// import Exp from './Expenses.json'
import CreateModal from './CreateModal'
import ReactPaginate from "react-paginate";

function ViewExpense() {
  
  const getLocalItems = () => {
      let list = localStorage.getItem('card');
      if (list) {
          return JSON.parse(localStorage.getItem('card'));
      } else {
          return [];
      }
  }

  const [card,setCard] = useState(getLocalItems());
  const [expense,setExpense] = useState({id:"",name:"",discription:"",category:"",dateofExp:"",amount:""});
  const [search,setSearch] =useState("");
  const [date,setDate] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(card.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  }

  const AddChanges=(e)=>{
    setExpense({...expense,[e.target.name]: e.target.value,id: new Date().getTime().toString()});
  }

  const handleSearch=(e)=>{
    if(e.key==="Enter"){
      e.preventDefault();
      setSearch(e.target.value.toLowerCase().trim());
    }
  } 
  
  const handleDate=(e)=>{
    if(e.key==="Enter"){
      e.preventDefault();
      setDate(e.target.value);
    }
  } 

  const createExpense=(e)=>{
      e.preventDefault();
      let card = localStorage.getItem("card");
      let cardObj;
      if (card == null) {
          cardObj = [];
      }
      else {
          cardObj = JSON.parse(card);
      }
      cardObj.push(expense);
      setCard(cardObj);
      setExpense({id:"",name:"",discription:"",category:"",dateofExp:"",amount:""});
  }

  const handleDelete=(id)=>{
    if(window.confirm("Are you sure you want to delete the Expense?")){
        const updatedItems = card.filter((elem) => {
            return elem.id !== id;
        })
        setCard(updatedItems);
    }
  }

  
  const [editExp,setEditExp] = useState({id:"",name:"",discription:"",category:"",dateofExp:"",amount:""});
  const EditChanges=(e)=>{
        setEditExp({...editExp,[e.target.name]: e.target.value});
    }

  const storeEditExp=(id,exp)=>{
      localStorage.setItem('index',id);
      localStorage.setItem('time',Date.now());
      localStorage.setItem('editExpense',JSON.stringify(exp));
      setEditExp(exp);
  }

  const handleEdit = (editExp) => {
    const EditItem = localStorage.getItem('index');
    setCard(
        card.map((elem) => {
            if (elem.id === EditItem) {
                return editExp;
            }
            return elem;
        })
    );
    localStorage.removeItem('index');
    localStorage.removeItem('editExpense');
  }

  const getDate=(dt)=>{
    let monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];
    let d = new Date(dt);
    return d.getDate()+' '+monthNames[d.getMonth()]+", "+ dt.slice(0,4) ;
  }

  const getAmount=(rs)=>{
    return rs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  useEffect(()=>{
    localStorage.setItem('card', JSON.stringify(card));
  },[card])

  return (
    <div className='container'>
      <div className="expenseHeader">
        <div>
            <h2>MY EXPENSE MANAGER</h2>
        </div>
        <div>
            <span className="searchFilter">
                <input type="date" id="filter-date" name="date" min="2018/01/01" max="2023/12/31" placeholder='Filter by Date of Expenses' onKeyDown={handleDate}/>
            </span>
            <span className="searchFilter">
                <input type="search" id="search" placeholder='Search Expense by Name' onKeyDown={handleSearch}/>
            </span>
            <span><CreateModal createExpense={createExpense} AddChanges={AddChanges} expense={expense}/></span>
        </div>
      </div>
      <div className="expenseContent">
        <table >
            <thead>
                <tr style={{height:"65px",textAlign:"center"}}>
                    <th width="220px">Name</th>
                    <th width="160px">Category</th>
                    <th width="230px">Date of Expense</th>
                    <th width="160px">Amount</th>
                    <th width="180px">Updated At</th>
                    <th width="170px">Created by</th>
                    <th >     </th>
                </tr>
            </thead>
 
            <tbody>
            {card.slice(pagesVisited, pagesVisited + usersPerPage).reverse().map((exp)=>{
              if((search==="" || search===exp.name.toLowerCase()) && (date==="" || date===exp.dateofExp))
              return(
              <tr key={exp.id}>
                  <td >{exp.name}</td>
                  <td >{exp.category}</td>
                  <td >{getDate(exp.dateofExp)}</td>
                  <td >INR {getAmount(exp.amount)}</td>
                  <td >Just Now</td>
                  <td >me</td>
                  <td className='action'><span className='action'><EditModal handleEdit={handleEdit} storeEditExp={storeEditExp} id={exp.id} exp={exp} AddChanges={EditChanges} editExp={editExp}/></span> <span className='action' onClick={()=>{handleDelete(exp.id)}}><RiDeleteBin6Fill size={"1.5rem"} color='red'/></span></td>
              </tr>)
              else
              return<></>
            })}
            </tbody>
        </table>
      </div>
      <ReactPaginate
        previousLabel={" < "}
        nextLabel={" > "}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  )
}

export default ViewExpense
