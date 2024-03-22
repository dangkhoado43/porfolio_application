// Toggle Icon Navbar
let menuIcon = document.querySelector('#menu-icon')
let navbar = document.querySelector('.navbar')

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x')
    navbar.classList.toggle('active')
}

// Scroll Function
window.onscroll = () => {
    let header = document.querySelector('header');
    let top = window.scrollY

    // Toggle Icon Top
    let iconTop = document.querySelector('.home-iconTop')

    if (top >= (header.offsetTop - 100) && top < (header.offsetTop - 100 + header.offsetHeight)) {
        iconTop.classList.add('hidden')
    }

    iconTop.classList.toggle('hidden', window.scrollY < 100)

    // Scroll Section
    let sections = document.querySelectorAll('section')
    let navLinks = document.querySelectorAll('header nav a')

    sections.forEach(sec => {
        let offset = sec.offsetTop - 100
        let height = sec.offsetHeight
        let id = sec.getAttribute('id')

        if (top >= offset && top < offset + height) {
            // active nabar links
            navLinks.forEach(links => {
                links.classList.remove('active')
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active')
            })

            // active sections for animation on scroll
            sec.classList.add('show-animate')
        }

        // if you want to use animation that repeats on scroll use this
        else {
            sec.classList.remove('show-animate')
        }
    })

    // Sticky Header
    header.classList.toggle('sticky', window.scrollY > 100)

    // Remove Toggle Icon and Navbar when click navbar links on screen less than 768px (scroll)
    menuIcon.classList.remove('bx-x')
    navbar.classList.remove('active')

    // animation footer on scroll
    let footer = document.querySelector('footer')

    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight)
}

// Send Email From Contact Form
const form = document.querySelector('form')
const fullName = document.getElementById('name')
const email = document.getElementById('email')
const phone = document.getElementById('phone')
const subject = document.getElementById('subject')
const mess = document.getElementById('message')

function sendEmail() {
    const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.value}<br> Phone Number: ${phone.value}<br> Message: ${mess.value}`

    Email.send({
        SecureToken : "16646ac4-0a86-461a-b4fe-b42c62e8f2ac",
        Host: "smtp.elasticemail.com",
        Username: "dangkhoado43@gmail.com",
        Password: "4E78CAFE72A98B4EF75EE17CF8876766E412",
        To: 'dangkhoado43@gmail.com',
        From: "dangkhoado43@gmail.com",
        Subject: subject.value,
        Body: bodyMessage
    }).then(
        message => {
            if (message === "OK") {
                Swal.fire({
                    title: "Success!",
                    text: "Message sent successfully!",
                    icon: "success"
                });
            }
        }
    );
}

function checkInputs() {
    const items = document.querySelectorAll('.item')

    for (const item of items) {
        if (item.value === "") {
            item.classList.add("error")
            item.parentElement.classList.add("error")
        }

        if (items[1].value !== "") {
            checkEmail()
        }

        items[1].addEventListener("keyup", () => {
            checkEmail()
        })

        item.addEventListener("keyup", () => {
            if (item.value !== "") {
                item.classList.remove("error")
                item.parentElement.classList.remove("error")
            } else {
                item.classList.add("error")
                item.parentElement.classList.add("error")
            }
        })
    }
}

// const validRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/
function checkEmail() {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    const errorTxtEmail = document.querySelector(".error-txt.email")

    if (!email.value.match(emailRegex)) {
        email.classList.add("error")
        email.parentElement.classList.add("error")

        if (email.value !== "") {
            errorTxtEmail.innerText = "Enter a valid email address"
        } else {
            errorTxtEmail.innerText = "Email Address can't be blank"
        }
    } else {
        email.classList.remove("error")
        email.parentElement.classList.remove("error")
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    checkInputs()

    if (!fullName.classList.contains("error") && !email.classList.contains("error") && !phone.classList.contains("error") && !subject.classList.contains("error") && !mess.classList.contains("error")) {
        sendEmail()
    }

    form.reset()
    return false
})