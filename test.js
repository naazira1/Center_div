
window.addEventListener('load', () => {

    console.log('variable.js is working');

    const switched = document.querySelector('.content .header .switch');
    
    switched.addEventListener('click', function(e) {
        e.preventDefault();

        document.body.classList.toggle('theme-dark');
    });

    setInterval(() => {
    const width = window.innerWidth;
    if(width <= 480) {
        console.log('width is less than 480');
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.add('sidebar-short');
    }
    }, 4000);

    const showBtn = document.querySelector('.show span');
    const sidebar = document.querySelector('.sidebar');

    showBtn.addEventListener('click', function(e) {
        e.preventDefault();
        sidebar.classList.remove('sidebar-short');
        sidebar.classList.toggle('sidebar-full');
    });


    //getting all employees

    async function getAllResponses() {
        const url = 'https://kojoyeboah53i-d962a2da663c.herokuapp.com/api/ordabl/employer/1';
      
        try {
          const result = await fetch(url);
          const response = await result.json();
          console.log('response from server');
          console.log(response); 
          // Destructure the 'employee' array from the response
    const { employee } = response;
    console.log(employee);
    const table=document.querySelector('.table')
      
          // Get the table body element
          const tableBody = document.getElementById('table_body');
      
          // Clear existing table rows if any
          tableBody.innerHTML = ' ';
      
          // Populate the table with employee data
    employee.forEach(emp => {
            const row = tableBody.insertRow();

            const nameCell = row.insertCell(0); 
            nameCell.textContent = emp.name;
            
            const emailCell = row.insertCell(1); 
            emailCell.textContent = emp.email;
            
            const jobCell = row.insertCell(2); 
            jobCell.textContent = emp.job_title;
            
            const actionCell = row.insertCell(3);
            
            // action icons
            actionCell.innerHTML = `
            <div class=''>
              <i class="material-icons-outlined edit-button" data-id="${emp.id}">edit</i>
              <i class="material-icons-outlined delete-button" data-id="${emp.id}">delete</i>
              </div>
            `;
            
          });

          table.appendChild(tableBody)
      
          const editButtons = document.querySelectorAll('.edit-button');
          const deleteButtons = document.querySelectorAll('.delete-button');
      
          editButtons.forEach(button => {
            button.addEventListener('click', handleEdit);
          });
      
          deleteButtons.forEach(button => {
            button.addEventListener('click', handleDelete);
          });
      
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

      // handleEdit function
async function handleEdit(event) {
    const employeeId = event.target.getAttribute('data-id');
    // Redirect to an edit page 
    window.location.href = `editform.html?id=${employeeId}`;
}

// handleDelete function
async function handleDelete(event) {
    const employeeId = event.target.getAttribute('data-id');
    const deleteUrl = `https://kojoyeboah53i-d962a2da663c.herokuapp.com/api/ordabl/employee/${employeeId}`;
  
      // Ask for confirmation before proceeding
      const confirmed = window.confirm(`Are you sure you want to delete this employee? ${employeeId}`);

      if (!confirmed) {
          return; // User canceled the deletion
      }

    try {
      
        const result = await fetch(deleteUrl, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        }); //fetch ends 

        const response = await result.json();
        console.log('Delete response:', response);

        if (response) {
          const rowToDelete = event.target.closest('tr');
            

          
            setTimeout(() => {

                rowToDelete.remove();
            // Refresh the table after successful deletion
            getAllResponses();
            },300);
        } else {
            console.log('Delete operation did not return a response.');
        }
    } catch (error) {
        console.error('Error deleting data:', error);
    }
}

getAllResponses();


  
});

