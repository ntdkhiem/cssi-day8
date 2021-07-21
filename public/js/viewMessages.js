

let numTry = 0;
const getMessages = () => {
    const messagesRef = firebase.database().ref();
    messagesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        const passcodeAttempt = document.querySelector('#passcode').value;
        for (message in data.messages) {
            const messageData = data.messages[message];
            if (messageData.passcode == passcodeAttempt) {
                // Clear input field
                document.querySelector('#passcode').value = "";
                // Show the message
                const messageDiv = document.querySelector('#message');
                messageDiv.style.display = 'block';
                messageDiv.querySelector('#cardContent').innerText = messageData.message
                // messageDiv.innerHTML = messageData.message;
                return;
            }
        }
        numTry++;
        if (numTry === 3) {
            alert('You tried too many attempts. Please try again in 5 seconds')
            document.querySelector('#viewMsg').disabled = true;
            setTimeout(() => {document.querySelector('#viewMsg').disabled = false}, 5000);
            numTry = 0;
        }
        displayAlert("Couldn't find a messsage with given passcode.")
    });
}


const displayAlert = (msg) => {
    const alertDiv = document.createElement('div')
    alertDiv.className = 'notification is-danger is-light'
    const alertBtn = document.createElement('button')
    alertBtn.className = 'delete'
    alertBtn.addEventListener('click', () => {
        alertDiv.parentNode.removeChild(alertDiv)
    })
    const alertText = document.createElement('p')
    alertText.className = 'subtitle'
    alertText.innerText = msg
    alertDiv.appendChild(alertBtn)
    alertDiv.appendChild(alertText)
    document.querySelector('body').prepend(alertDiv)
}