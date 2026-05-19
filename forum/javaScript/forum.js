const messages = [
    {
        "sender": "mr customer",
        "date": "2010-05-10",
        "title": "looking for someone",
        "body": "Hi, I'm looking for someone I used to know in high school. I'm wondering if I could find him here?"
    },
    {
        "sender": "Moe",
        "date": "2010-05-10",
        "title": "re: looking for someone",
        "body": "Let's ask around. What's his name?"
    },
    {
        "sender": "mr customer",
        "date": "2010-05-10",
        "title": "re: looking for someone",
        "body": "Yeah, his name is Seymore Butz."
    },
    {
        "sender": "Moe",
        "date": "2010-05-10",
        "title": "re: looking for someone",
        "body": "Is there a Butz here? Everybody! I wanna Seymore Butz!"
    },
    {
        "sender": "Barney",
        "date": "2010-05-10",
        "title": "re: looking for someone",
        "body": "LOL"
    },
    {
        "sender": "Moe",
        "date": "2010-05-10",
        "title": "re: looking for someone",
        "body": "Oh, wait a minute. Listen you little scum-sucking pus bucket. When I get my hands on you, I'm gonna pull out your eyeballs with a corkscrew!"
    },
    {
        "sender": "mr customer",
        "date": "2010-05-10",
        "title": "re: looking for someone",
        "body": "😂😂😂😂😂😂😂😂😂😂😂"
    }
];

const messageList = document.getElementById("messageList");
const dialog = document.getElementById("msgDialog");
const form = document.getElementById("msgForm");

const senderInput = document.getElementById("senderInput");
const titleInput = document.getElementById("titleInput");
const bodyInput = document.getElementById("bodyInput");

function formatFinnishDate(dateStr) {
    const d = new Date(dateStr);
    return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
}

function renderMessages() {
    messageList.innerHTML = "";

    messages.forEach(msg => {
        const div = document.createElement("div");
        div.className = "message";

        div.innerHTML = `
            <div class="msg-header">${msg.sender} - ${formatFinnishDate(msg.date)}</div>
            <div class="msg-title">${msg.title}</div>
            <div class="msg-body">${msg.body}</div>
        `;

        messageList.appendChild(div);
    });
}

document.getElementById("newMsgBtn").onclick = () => {
    dialog.showModal();
};

document.getElementById("cancelBtn").onclick = () => {
    form.reset();
    dialog.close();
};

form.onsubmit = (e) => {
    e.preventDefault();

    const newMsg = {
        sender: senderInput.value,
        title: titleInput.value,
        body: bodyInput.value,
        date: new Date().toISOString().split("T")[0]
    };

    messages.unshift(newMsg);
    renderMessages();

    form.reset();
    dialog.close();
};

renderMessages();
