// Function to open the form
function openForm(formType) {
    const form = document.getElementById(formType);
    if (form) {
        form.style.right = '0'; // Slide the form in from the right
    }
}

// Function to close the form
function closeForm(formType) {
    const form = document.getElementById(formType);
    if (form) {
        form.style.right = '-100%'; // Slide the form out to the right
    }
}

// Add event listeners to the buttons
const registerBtn = document.getElementById('registerBtn');
const signinBtn = document.getElementById('signinBtn');
const registerForm = document.getElementById('registerForm');
const signinForm = document.getElementById('signinForm');

// Check if elements exist before adding event listeners
if (registerBtn) {
    registerBtn.addEventListener('click', () => openForm('registerForm'));
}
if (signinBtn) {
    signinBtn.addEventListener('click', () => openForm('signinForm'));
}
if (registerForm) {
    const registerCloseSign = registerForm.querySelector('.close-sign');
    if (registerCloseSign) {
        registerCloseSign.addEventListener('click', () => closeForm('registerForm'));
    }
}
if (signinForm) {
    const signinCloseSign = signinForm.querySelector('.close-sign');
    if (signinCloseSign) {
        signinCloseSign.addEventListener('click', () => closeForm('signinForm'));
    }
}

// Ensure the forms are initially hidden
if (registerForm) {
    registerForm.style.right = '-100%';
}
if (signinForm) {
    signinForm.style.right = '-100%';
}

// Information section
// Fetch information from a JSON file
fetch('info.json')
    .then(response => response.json())
    .then(data => {
        const infoList = data.information;

        const infoBox = document.querySelector('.info-box');
        const infoText = document.querySelector('.info-text');
        const leftArrow = document.querySelector('.arrow-left');
        const rightArrow = document.querySelector('.arrow-right');

        let currentInfoIndex = 0;

        function updateInfo() {
            infoText.textContent = infoList[currentInfoIndex];
        }

        function nextInfo() {
            currentInfoIndex = (currentInfoIndex + 1) % infoList.length;
            updateInfo();
        }

        function prevInfo() {
            currentInfoIndex = (currentInfoIndex - 1 + infoList.length) % infoList.length;
            updateInfo();
        }

        leftArrow.addEventListener('click', prevInfo);
        rightArrow.addEventListener('click', nextInfo);

        setInterval(nextInfo, 15000); // Change info every 30 seconds

        // Initial info load
        updateInfo();
    })
    .catch(error => {
        console.error('Error fetching the information:', error);
    });

