/*=============== SHOW MENU ===============*/
const navMenu = document.querySelector('#nav-menu')
const navToggle = document.querySelector('#nav-toggle')
const navClose = document.querySelector('#nav-close')

/* ====   MENU SHOW   ======= */
if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}
/* =========  MENU HIDDEN ======== */
if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}
/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')
const linkAction = () => {
    const navMenu = document.querySelector('#nav-menu')

    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
    const header = document.querySelector('#header')
    // when the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('bg-header') : header.classList.remove('bg-header')
}
window.document.addEventListener('scroll', scrollHeader)
/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
const scrollActive = () => {
    const scrollY = window.pageYOffset
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop
        const sectionId = current.getAttribute('id')
        const sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        }else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)
/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () => {
    const scrollbarUp = document.querySelector('#scroll-up')
    this.scrollY >= 350 ? scrollbarUp.classList.add('show-scroll') : scrollbarUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)
/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
})
sr.reveal(`.home__data, .footer__container, .footer__group`)
sr.reveal(`.home__img`, {
    delay: 700,
    origin: 'bottom',

})
sr.reveal(`.logos__img, .program__card, .pricing__card`, {interval: 100})
sr.reveal(`.choose__img, .calculate__content`, {origin: 'left'})
sr.reveal(`.choose__content, .calculate__img`, {origin: 'right'})

/*=============== CALCULATE JS ===============*/
const calculateForm = document.querySelector('#calculate-form')
const calculateCm = document.querySelector('#calculate-cm')
const calculateKg = document.querySelector('#calculate-kg')
const calculateBmi = (event) => {
    let calculateMessage = document.querySelector('#calculate-message')
    event.preventDefault()
    const resultCm = (Number(calculateCm.value) / 100)
    const resultKg = Number(calculateKg.value)
    const resultCalculateBmi = Math.round(resultKg / (resultCm * resultCm))
    if(calculateCm.value === '' || calculateKg.value === '') {
        // Add and remove color
        calculateMessage.classList.remove('color-green')
        calculateMessage.classList.add('color-red')
        // Show message
        calculateMessage.textContent = 'Fill in the Height and weight'
        setTimeout(() => {
            calculateMessage.textContent = ''
        }, 1000 * 3)
    }else if (typeof resultCm != 'number' && typeof resultKg != 'number') {
        calculateMessage.textContent = 'Is not a number !'
    }else if(resultCalculateBmi < 16.9) {
        calculateMessage.classList.add('color-green')
        calculateMessage.textContent = `Your BMI: ${resultCalculateBmi} \n Very underweight`
    }else if (resultCalculateBmi > 17 && resultCalculateBmi < 18.4) {
        calculateMessage.classList.add('color-green')
        calculateMessage.textContent = `Your BMI: ${resultCalculateBmi} \n underweight`
    }else if (resultCalculateBmi > 18.5 && resultCalculateBmi < 24.9) {
        calculateMessage.classList.add('color-green')
        calculateMessage.textContent = `Your BMI: ${resultCalculateBmi} \n Weight normal`
    }else if (resultCalculateBmi > 25 && resultCalculateBmi < 29.9) {
        calculateMessage.classList.add('color-green')
        calculateMessage.textContent = `Your BMI: ${resultCalculateBmi} \n Overweight`
    }else if (resultCalculateBmi > 30 && resultCalculateBmi < 34.9) {
        calculateMessage.classList.add('color-green')
        calculateMessage.textContent = `Your BMI: ${resultCalculateBmi} \n Grade Obesity 1`
    }else if (resultCalculateBmi > 35 && resultCalculateBmi < 40) {
        calculateMessage.classList.add('color-green')
        calculateMessage.textContent = `Your BMI: ${resultCalculateBmi} \n Grade Obesity 2`
    }else if (resultCalculateBmi > 40) {
        calculateMessage.classList.add('color-green')
        calculateMessage.textContent = `Your BMI: ${resultCalculateBmi} \n Grade Obesity 3`
    }else {
        calculateMessage.classList.remove('color-green')
        calculateMessage.classList.add('color-red')
        calculateMessage.textContent = '[ERROR] Try again !'
    }
   
    calculateCm.value = ''
    calculateKg.value = ''
    setTimeout(() => {
        calculateMessage.textContent = ''
    }, 1000 * 4)
}
calculateForm.addEventListener('submit', calculateBmi)
/*=============== EMAIL JS ===============*/
const contactForm = document.querySelector('#contact-form')
const contactMessage = document.querySelector('#contact-message')
const contactUser = document.querySelector('#contact-user')
const sendEmail = (event) => {
    event.preventDefault()
    //Check if the field has a value
    if(contactUser.value == '') {
        //Add and remove color
        contactMessage.classList.remove('color-green')
        contactMessage.classList.add('color-red')
        // Show message
        contactMessage.textContent = 'You must enter your email'
        // remove message in three seconds !
        setTimeout(() => {
            contactMessage.textContent = ''
        }, 1000 * 3)
    }else {
        // serviceID - template - #form - publickey
        emailjs.sendForm('service_a9cge1i','template_5k6itin','#contact-form','ix-o_Dc6yAsYY3JyR')
           .then(() => {
               // show message and color !
               contactMessage.classList.add('color-green')
               contactMessage.textContent = 'You registred successfuly !'
               // Remove message after three seconds !
               setTimeout(() => {
                contactMessage.textContent = ''
               }, 1000 * 3)
           }).catch((error) => {
               alert('OPPS! SOMETHING HAS FAILED...  ' + error)
           })
    }
    // To clear input
    contactUser.value = ''
}
contactForm.addEventListener('submit', sendEmail)