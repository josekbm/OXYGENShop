let modalClosed = sessionStorage.setItem('modalClosed', true) === true;
let isModalShown = false;

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const emailPop = document.querySelector("#emailpop")
const closeModalBtn = document.querySelector(".btn-close");
const submitPop = document.querySelector("#submitpop");
const subscribed = document.querySelector(".button1")
//Función para abrir el modal:
const openModal = () => {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    isModalShown = true;    
}
//Funcion para cerrar el modal
const closeModal = () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}
//Abrir modal después de 5 segundos;
if(modalClosed !== true && isModalShown !== true) {
    setTimeout(() => {
        openModal();
    }, 5000);
}

//Abrir modal cuando el scroll sea >= 25%
function showModalScroll (){
    const scrollPosition = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const percentage = (scrollPosition / totalHeight) * 100;
    if(closeModal && percentage >= 25 && modalClosed === false && isModalShown === false)
    {openModal()};        
}
window.addEventListener("scroll", showModalScroll);
//cerrar el modal cuando se pulse el botón:
closeModalBtn.addEventListener("click", closeModal);
//cerrar el modal cuando se pulse en el fondo:
overlay.addEventListener("click", closeModal);
//cerrar el modal cuando se pulse escape:
document.addEventListener("keydown", function (e) {    
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {closeModal()};
});
//Validación y envío de datos
    
    
submitPop.addEventListener("click", function(event) {
    const emailvalue = document.querySelector("#emailpop").value;
    event.preventDefault();  
    //validacion:
    let isValid = true;
    const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(emailvalue)) {
        emailPop.style.border = "thick solid red"
        alert("Email must be a valid direction");
        isValid = false;
        console.log("Email incorrect");
        }      
    //Envío de datos:
    if(isValid === true) {
    sendDataToServer({emailvalue});
    }
});

const sendDataToServer = async (data) => {
    try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {method: "POST", headers: {'Content-type': 'application/json; charset=UTF-8',}, body: JSON.stringify(data)});
    if(response.ok) {
        const json = await response.json();
        console.log(json);     
        
        if (submitPop.textContent=="Send") {
            submitPop.textContent = "Tanks!";
        }else{ 
        submitPop.textContent = "Send";
        }           
        setTimeout(() => {
            closeModal();
        }, 3000);
                
    }else {
        console.error("Error sending the form:", error);
    }
    }catch (error) {
    console.error("Error sending the form:". error);
    }
};
