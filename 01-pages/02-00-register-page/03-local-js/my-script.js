      const input1 = document.querySelector(".email"),
              emailIcon = document.querySelector(".email-icon")

        input1.addEventListener("keyup", () =>{
            let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            if(input1.value === ""){
                return console.log("input is empty")
            }
            if(input1.value.match(pattern)){
                emailIcon.classList.replace("fa-envelope", "fa-circle-check");
                return emailIcon.style.color = "#4bb543"
            }
            emailIcon.classList.replace("fa-circle-check", "fa-envelope");
            return emailIcon.style.color = "red"
        }
    )

        const input = document.querySelector(".tel"),
        telIcon = document.querySelector(".tel-icon")

        input.addEventListener("keyup", () =>{
            let pattern = /[0-9]{9}/;
            if(input.value === ""){
                return console.log("input is empty")
            }
            if(input.value.match(pattern)){
                telIcon.classList.replace("fa-phone", "fa-circle-check");
                return telIcon.style.color = "#4bb543"
            }
            telIcon.classList.replace("fa-circle-check", "fa-phone");
            return telIcon.style.color = "red"
        }
    );

    