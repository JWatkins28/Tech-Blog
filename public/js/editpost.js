// EDIT POST FUNCTION
const editHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#new-title').value.trim();
    const content = document.querySelector('#new-contents').value.trim();

    if (title && content) {

        if (event.target.hasAttribute('data-id')) {

            const id = event.target.getAttribute('data-id');

            const response = await fetch(`/api/posts/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ title, content, id }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                return document.getElementById("gen-error").style.opacity = "1";
            }
        }
    }
}

// DELETE POST FUNCTION
const deleteHandler = async (event) => {
    event.preventDefault();

    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            return document.getElementById("gen-error").style.opacity = "1";
        }
    }
};


document.querySelector('#delete-post').addEventListener('click', deleteHandler);
document.querySelector('#update-btn').addEventListener('click', editHandler);