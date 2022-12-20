const addHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#new-title').value.trim();
    const content = document.querySelector('#new-contents').value.trim();

    if (title && content) {

        const response = await fetch(`/api/posts/`, {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }

}

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
                alert(response.statusText);
            }
        }
    }
}

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
            alert('Failed to delete project')
        }
    }
};

document.querySelector('#create-new-btn').addEventListener('click', addHandler);
document.querySelector('#delete-post').addEventListener('click', deleteHandler);
document.querySelector('#update-btn').addEventListener('click', editHandler);