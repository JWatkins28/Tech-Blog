// ADD POST FUNCTION
const addHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#add-title').value.trim();
    const content = document.querySelector('#add-contents').value.trim();

    if (title && content) {

        const response = await fetch(`/api/posts/`, {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            return document.getElementById("gen-error").style.opacity = "1";
        }
    }
}

document.querySelector('#add-btn').addEventListener('click', addHandler);