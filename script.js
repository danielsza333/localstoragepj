document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const tableBody = document.getElementById("contactTable");

    const loadContacts = () => {
        const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        tableBody.innerHTML = "";
        contacts.forEach((contact, index) => {
            const row = `<tr>
                <td>${index + 1}</td>
                <td>${contact.name}</td>
                <td>${contact.phone}</td>
                <td>${contact.email}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editContact(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteContact(${index})">Excluir</button>
                </td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    };

    const saveContact = (name, phone, email) => {
        const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        contacts.push({ name, phone, email });
        localStorage.setItem("contacts", JSON.stringify(contacts));
        loadContacts();
    };

    const deleteContact = (index) => {
        const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        contacts.splice(index, 1);
        localStorage.setItem("contacts", JSON.stringify(contacts));
        loadContacts();
    };

    const editContact = (index) => {
        const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        const contact = contacts[index];
        document.getElementById("name").value = contact.name;
        document.getElementById("phone").value = contact.phone;
        document.getElementById("email").value = contact.email;
        deleteContact(index);
    };

    window.editContact = editContact;
    window.deleteContact = deleteContact;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const email = document.getElementById("email").value;
        saveContact(name, phone, email);
        form.reset();
    });

    loadContacts();
});
