//Menú Hamburguesa

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".menu--lista");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})
document.querySelectorAll(".lista--item").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}))

//Barra scroll

const scrollProgress = document.querySelector("#scroll-progress");
const height =
  document.documentElement.scrollHeight - document.documentElement.clientHeight;

window.addEventListener('scroll', () => {
  const scrollTop =
    document.body.scrollTop || document.documentElement.scrollTop;
  scrollProgress.style.width = `${(scrollTop / height) * 100}%`;
});

// Botón return to top

let returnTop = document.querySelector('#return-top');

window.addEventListener('scroll', function() {
    returnTop.style.display = (window.scrollY > 20) ? 'block' : 'none';
});

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

returnTop.addEventListener('click', () => {
    setTimeout(scrollToTop, 200);
});

//Validación Formulario

document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector("#myform");
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const checkbox = document.querySelector("#consentimiento").checked

    //validacion:
    let isValid = true;
      if(name.length < 2 || name.length > 100) {
        document.querySelector("#name").style.border = "thick solid red";
        document.querySelector(".namewar").innerHTML = "Name must have at least two characters.";
        isValid = false;
        console.log("Name incorrect");
      }else{
        document.querySelector(".namewar").innerHTML = " ";
        document.querySelector("#name").style.border = "none";
      }

      const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(email)) {
          document.querySelector("#email").style.border = "thick solid red"
          document.querySelector(".emailwar").innerHTML = "Email must be a valid direction.";
          isValid = false;
          console.log("Email incorrect");
        }else{
          document.querySelector(".emailwar").innerHTML = " ";
          document.querySelector("#email").style.border = "none";
        }
      if(!checkbox) {        
        isValid = false;
        document.querySelector(".checkwar").innerHTML = "You must acept Personal Data Policy.";
        console.log("checkbox unchecked");
      }else{
        document.querySelector(".checkwar").innerHTML = " ";
      }
    
    //Envío de datos:
    if(isValid === true) {
      sendDataToServer({name, email, checkbox});
    }
  });

  const sendDataToServer = async (data) => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {method: "POST", headers: {'Content-type': 'application/json; charset=UTF-8',}, body: JSON.stringify(data)});
      if(response.ok) {
        const json = await response.json();
        console.log(json);
        form.style.display = "none";
        const message = document.querySelector("#gracias");
        gracias.style.display = "block";
      
      }else {
        console.error("Error sending the form:", error);
      }
    }catch (error) {
      console.error("Error sending the form:". error);
    }
  };
});


