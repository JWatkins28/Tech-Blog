const commentHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#comment-content').value.trim();

    if (content) {

        if (event.target.hasAttribute('data-id')) {
            const post_id = event.target.getAttribute('data-id');
            const response = await fetch(`/api/comments`, {
                method: 'POST',
                body: JSON.stringify({ content, post_id }),
                headers: { 'Content-Type': 'application/json' },
            });
        }
    }
    document.location.reload();
};


document.querySelector('#comment-btn').addEventListener('click', commentHandler);