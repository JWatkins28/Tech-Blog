// ADD COMMENT FUNCTION
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

            if (response.ok) {
                document.location.reload();
            } else {
                return document.getElementById("gen-error").style.opacity = "1";
            }
        }
    }
};


document.querySelector('#comment-btn').addEventListener('click', commentHandler);