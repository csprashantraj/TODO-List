const list = document.querySelector("#list");
const btn = document.querySelector("#btn");
const input = document.querySelector("#input");

btn.addEventListener("click", () => {
    console.log("Adding a task is in request");
    let s = input.value;
    if(s.length < 1) {
        console.log("empty input");
        input.setAttribute("placeholder", "enter a valid task");
        input.style.borderColor = "red";
    }
    else {
        axios.post(`http://localhost:3000/${document.getElementById('id').value}/add`, {
            "item": `${input.value}`,
        })
        .then(response => {
            if(response.data == "success") {
                window.location.href = `http://localhost:3000/${document.getElementById('id').value}/home`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        })
    }
});

// Edit a task
const editBtns = document.querySelectorAll('.edit-btn');
editBtns.forEach(button => {
    button.addEventListener('click', (event) => {
        const listItem = event.target.closest('li');
        const index = listItem.getAttribute('data-index');
        const itemText = listItem.querySelector('.objects').innerText;
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.value = itemText;
        listItem.querySelector('.objects').innerHTML = '';
        listItem.querySelector('.objects').appendChild(inputField);

        const saveBtn = document.createElement('button');
        saveBtn.innerText = 'Save';
        listItem.querySelector('.objects').appendChild(saveBtn);

        saveBtn.addEventListener('click', () => {
            const updatedItem = inputField.value;
            if (updatedItem.length > 0) {
                axios.post(`http://localhost:3000/${document.getElementById('id').value}/edit`, {
                    "index": `${index}`,
                    "item": `${updatedItem}`,
                })
                    .then(response => {
                        if (response.data == "success") {
                            window.location.href = `http://localhost:3000/${document.getElementById('id').value}/home`;
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            } 
            else {
                inputField.setAttribute('placeholder', 'enter a valid task');
                inputField.style.borderColor = 'red';
            }
        });
    });
});

// Delete a task
const deleteBtns = document.querySelectorAll('.delete-btn');
deleteBtns.forEach(button => {
    button.addEventListener('click', (event) => {
        const listItem = event.target.closest('li');
        const index = listItem.getAttribute('data-index');
        const securityKey = prompt("Enter your security key to delete this task:");
        if (securityKey) {
            axios.post(`http://localhost:3000/${document.getElementById('id').value}/delete`, {
                "index": `${index}`,
                "securityKey": `${securityKey}`,
            })
            .then(response => {
                if (response.data === "success") {
                    window.location.href = `http://localhost:3000/${document.getElementById('id').value}/home`;
                } else {
                    alert("Incorrect security key.");
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    });
});