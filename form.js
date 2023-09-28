const form = document.getElementById('new_entry');
        const nameInput = document.querySelector('input#fullname')
        const emailInput = document.querySelector('input#email')
        const jobTitleInput = document.querySelector('input#jobtitle')
        const btn = document.querySelector('.submit')

        btn.addEventListener('click', async (e) => {
            e.preventDefault();


            //values of fields
            const name = nameInput.value;
            const email = emailInput.value;
            const job_title = jobTitleInput.value

            const url = 'http://kojoyeboah53i-d962a2da663c.herokuapp.com/api/ordabl/getEmployer'
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            name: name,
                            email: email,
                            job_title: job_title
                        }

                    )
                }) // fetch ends here 

                if (response.status === 200) {
                    alert('employee created successfuly')

                   
                }
                
            } catch (error) {
                console.error('Error:', error);
                alert('an error occurred while creating the employee');
                
            }
            window.location.href = `./dashboard.html`;
        })