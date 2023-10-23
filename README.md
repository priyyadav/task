# DocketForm React App

The DocketForm React App is a web application for creating and managing dockets. It allows users to input information such as their name, start and end times, hours worked, rate per hour, and more. Additionally, it fetches data from an Excel file to populate supplier and purchase order options.

## Features

- Create and manage dockets with detailed information.
- Select suppliers and purchase orders from Excel data.
- Format time values for better readability.
- Store and display docket information in a tabular format.

## Prerequisites

Before running the app locally, make sure you have the following tools and dependencies installed on your computer:

- Node.js and npm (Node Package Manager)

## Getting Started

To get started with this project, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/priyyadav/task.git

1.Navigate to the Project Directory:

```cd task ```

2.Install Dependencies:


```npm install```

3.Run the Application:

```npm start```

The app will be available at http://localhost:3000 in your web browser.


** How to Use the Application**
1.Fill Out the Form:

```Name```: Enter your name.
```Start Time```: Select the start time using the "Start Time" input field.
```End Time```: Select the end time using the "End Time" input field. The "End Time" must be after the "Start Time."
```No. of Hours Worked```: Specify the number of hours worked.
```Rate Per Hour```: Enter your rate per hour.

2.Choose a Supplier:

Select a supplier from the dropdown list. The options are populated from the Excel data.
Select a Purchase Order:

After selecting a supplier, you can choose a related purchase order from the dropdown list. Options are populated from the Excel data.

3.Description:

The description field is read-only and is automatically filled when you select a purchase order. It provides additional details about the selected purchase order.

**Submit the Form:**

Click the "Submit" button to save the docket entry.

**View Docket Entries:**

All docket entries are displayed in a table below the form. You can view and manage your previous entries.


If you'd like to contribute to this project, please consider opening an issue or creating a pull request on the GitHub repository.

**License**
This project is licensed under the MIT License. See the LICENSE file for details.

Feel free to use this README file as part of your project documentation. You can customize it further to include more project-specific information, such as installation instructions, configuration details, and deployment steps.

**About Each Form Data**

Name: Your name goes here.

Start Time: Select the start time for your docket entry. This must be a valid date and time.

End Time: Choose the end time for your docket entry. It should be later than the start time.

No. of Hours Worked: Enter the number of hours you worked.

Rate Per Hour: Specify your hourly rate.

Supplier: Select the supplier related to your docket entry. Options are fetched from an Excel file.

Purchase Order: Choose a purchase order associated with the selected supplier. The options are populated from the Excel data.

Desc: The description field provides additional information about the selected purchase order. It's automatically filled when you select a purchase order.