const loginHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (name && password) {

        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ name, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            return document.location.replace('/dashboard')
        } else {
            return document.getElementById("bad-login").style.opacity="1";
        }
    }
};

document.querySelector('.login-form').addEventListener('submit', loginHandler);