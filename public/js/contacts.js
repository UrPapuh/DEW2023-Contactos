const divContacts = document.getElementById('contacts');

async function loadContacts(){
  let res = await fetch('http://localhost:3000/api/contacts');
  let contacts = await res.json();
  contacts.forEach(contact => {
    // if (sessionStorage['selected'] && JSON.parse(sessionStorage['selected']).contains(contact.company_id)) {
      let div = document.createElement('div');
      div.innerHTML = `
        <div class="card">
          <h1>
            ${contact.id}
            <input type="submit" value="Delete" onclick="deleteContact()">
          </h1>
          <p>Name: ${contact.first_name}</p>
          <p>LastName: ${contact.last_name}</p>
          <p>Email: ${contact.email}</p>
          <p>Departament: ${contact.department}</p>
          <img src="img/${contact.image}" alt="${contact.image}">
        </div>
      `;
      divContacts.append(div);
    // }
  });
}

async function deleteContact() {
  // fetch('http://localhost:3000/api/contacts/');
}

window.onload = loadContacts();