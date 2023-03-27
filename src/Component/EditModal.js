import React, { useRef } from 'react'
import {MdEdit} from 'react-icons/md'

function EditModal(props) {
    const {handleEdit,storeEditExp,id,exp,AddChanges,editExp}=props;
    const refClose = useRef(null);

  return (
    <span>
        <span  data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=>{storeEditExp(id,exp)}}>
            <MdEdit size={"1.7rem"} color='#585858'/>
        </span>

        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form >
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Expense</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <div className="modal-body">
                        <div className="mb-3">
                            <label forHtml="formGroupExampleInput" className="form-label">Name</label>
                            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Name the Expense" name="name" value={editExp.name} onChange={AddChanges} required/>
                        </div>
                        <div className="mb-3">
                            <label forHtml="formGroupExampleInput2" className="form-label">Discription</label>
                            <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Discribe the Expense" name="discription" value={editExp.discription} onChange={AddChanges} required/>
                        </div>
                        <div className="mb-3">
                            <label forHtml="formGroupExampleInput2" className="form-label">Category</label>
                            <select className="form-select" aria-label="Default select example" id="filter-tag" name="category" defaultValue={""} value={editExp.category} onChange={AddChanges} required>
                                <option value="" disabled >Select Category</option>
                                <option value="General">Book</option>
                                <option value="Business">Education</option>
                                <option value="Study">Electronic</option>
                                <option value="Game">Health</option>
                                <option value="Travel">Travel</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label forHtml="formGroupExampleInput2" className="form-label">Date Of Expense </label><br/>
                            <input type="date" id="filter-date" min="2018/01/01" max="2023/12/31" placeholder='Date of Expenses' name="dateofExp" value={editExp.dateofExp} onChange={AddChanges} required/>
                        </div>
                        <div className="mb-3">
                            <label forHtml="formGroupExampleInput2" className="form-label">Expense Amount</label>
                            <input type="number" className="form-control" id="formGroupExampleInput2" placeholder="Expense Amount in INR" name="amount" value={editExp.amount} onChange={AddChanges} required/>
                        </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                            <button type="button" className="btn btn-green" onClick={()=>{handleEdit(editExp);refClose.current.click()}}>Edit Expense</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </span>
  )
}

export default EditModal
