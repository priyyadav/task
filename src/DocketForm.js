import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

import './DockerForm.css'
const DocketForm = () => {
    const [jsonData, setJsonData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [supplierOptions, setSupplierOptions] = useState([]);
    const [purchaseOrderOptions, setPurchaseOrderOptions] = useState([]);
    const [desc, setDesc] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        startTime: '',
        endTime: '',
        hoursWorked: '',
        ratePerHour: '',
        supplier: '',
        purchaseOrder: '',
        desc: ''
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the Excel file
                const response = await fetch('/export29913.xlsx');
                const arrayBuffer = await response.arrayBuffer();
                const data = new Uint8Array(arrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });

                // Assuming data is in the first sheet
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                // Convert the sheet to JSON data
                const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 'A' });

                // Extract unique suppliers from the JSON data
                const suppliers = [...new Set(jsonData.map((item) => item.M))];
                const filteredSuppliers = suppliers.filter((supplier, index) => index !== 0 && supplier.trim() !== '');

                setSupplierOptions(filteredSuppliers);
                setJsonData(jsonData);
            } catch (error) {
                console.error('Error fetching or reading Excel file:', error);
            }
        };

        fetchData();
    }, []);

    function formatTime(timeString) {
        const date = new Date(timeString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === 'supplier') {
            const selectedSupplier = value;

            const filteredPOs = jsonData.filter((item) => {

                return item.M === selectedSupplier
            });

            const purchaseOrders = [...new Set(filteredPOs.map((item) => item.C))];
            const filteredPurchaseOrders = purchaseOrders.filter(
                (purchaseOrder, index) => purchaseOrder.trim() !== ''
            );

            setPurchaseOrderOptions(filteredPurchaseOrders);
        }

        if (name === 'purchaseOrder') {
            const selectedPO = value;

            const selectedData = jsonData.find((item) => item.C === selectedPO);

            if (selectedData) {
                setDesc(selectedData.Q); // Replace with the actual field name from your Excel data
            } else {
                setDesc(''); // If no data is found for the selected purchase order, clear the description
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Save form data including the description
        const formDataWithDesc = {
            ...formData,
            desc: desc
        };

        localStorage.setItem('formData', JSON.stringify(formDataWithDesc));
        setTableData([formDataWithDesc, ...tableData]);

        setFormData({
            name: '',
            startTime: '',
            endTime: '',
            hoursWorked: '',
            ratePerHour: '',
            supplier: '',
            purchaseOrder: '',
            desc: ''
        });
    };


    return (
        <div className='main-container'>
            <h1>Create a Docket</h1>

            <form onSubmit={handleSubmit} className='form-container'>
                <div className='form__group'>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='enter your name' required />
                </div>
                <div className='form__group'>
                    <label>Start Time:</label>
                    <input type="datetime-local" name="startTime" value={formData.startTime} onChange={handleChange} required />
                </div>
                <div className='form__group'>
                    <label>End Time:</label>
                    <input type="datetime-local" name="endTime" value={formData.endTime} onChange={handleChange} min={formData.startTime} required />
                </div>
                <div className='form__group'>
                    <label>No. of Hours Worked:</label>
                    <input type="number" name="hoursWorked" value={formData.hoursWorked} onChange={handleChange} placeholder='enter your work hours' min="0" required />
                </div>
                <div className='form__group'>
                    <label>Rate Per Hour:</label>
                    <input type="number" name="ratePerHour" value={formData.ratePerHour} onChange={handleChange} min="0" placeholder='enter your rate per hour' required />
                </div>
                <div className='form__group'>
                    <label>Supplier:</label>
                    <select name="supplier" value={formData.supplier} onChange={handleChange}>
                        <option value="">Select Supplier</option>
                        {supplierOptions &&
                            supplierOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                    </select>
                </div>
                <div className='form__group'>
                    <label>Purchase Order:</label>
                    <select name="purchaseOrder" value={formData.purchaseOrder} onChange={handleChange}>
                        <option value="">Select Purchase Order</option>
                        {purchaseOrderOptions &&
                            purchaseOrderOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>

            <table className='table-container'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Hours Worked</th>
                        <th>Rate Per Hour</th>
                        <th>Supplier</th>
                        <th>Purchase Order</th>
                        <th>Desc</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((data, index) => (
                        <tr key={index}>
                            <td>{data.name}</td>
                            <td>{formatTime(data.startTime)}</td>
                            <td>{formatTime(data.endTime)}</td>
                            <td>{data.hoursWorked}</td>
                            <td>{data.ratePerHour}</td>
                            <td>{data.supplier}</td>
                            <td>{data.purchaseOrder}</td>
                            <td>{data.desc}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <footer>
                Copyright Priyanka Yadav &copy; 2023
            </footer>
        </div>
    );
};

export default DocketForm;
