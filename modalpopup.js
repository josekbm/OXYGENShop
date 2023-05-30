let isModalClosed = localStorage.getItem("modalClosed") === true;
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector("#btn-open");
const closeModalBtn = document.querySelector(".btn-close");

//Función para abrir el modal:
const openModal = () => {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};
//Funcion para cerrar el modal
const closeModal = () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}
//Abrir modal después de 5 segundos;
setTimeout(() => {
    openModal();
}, 5000);
//Abrir modal cuando el scroll sea >= 25%
function showModalScroll (){
    const scrollPosition = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const percentage = (scrollPosition / totalHeight) * 100;
        if(closeModal && percentage >= 25){
            modal.classList.remove("hidden");
            overlay.classList.remove("hidden");
        }
}
window.addEventListener("scroll", showModalScroll);
//cerrar el modal cuando se pulse el botón:
closeModalBtn.addEventListener("click", closeModal);
//cerrar el modal cuando se pulse en el fondo:
overlay.addEventListener("click", closeModal);
//cerrar el modal cuando se pulse escape:
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      modalClose();
    }
  });