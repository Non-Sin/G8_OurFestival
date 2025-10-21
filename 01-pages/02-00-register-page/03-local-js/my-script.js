      const input = document.querySelector(".email"),
              emailIcon = document.querySelector(".email-icon")

        input.addEventListener("keyup", () =>{
            let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            if(input.value === ""){
                return console.log("input is empty")
            }
            if(input.value.match(pattern)){
                emailIcon.classList.replace("fa-envelope", "fa-circle-check");
                return emailIcon.style.color = "#4bb543"
            }
            emailIcon.classList.replace("fa-circle-check", "fa-envelope");
            return emailIcon.style.color = "red"
        }
    
    );