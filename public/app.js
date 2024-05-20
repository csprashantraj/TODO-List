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
        let v = document.createElement('li');
        let d1 = document.createElement('div');
        let d2 = document.createElement('div');
        let b1 = document.createElement('button');
        let b2 = document.createElement('button');
        d1.append(s);
        d1.classList.add("objects");
        b1.append("Edit");
        b2.append("Delete");
        d2.appendChild(b1);
        d2.appendChild(b2);
        v.appendChild(d1);
        v.appendChild(d2);  
        list.appendChild(v);
    }
});