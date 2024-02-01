// List
const companiesList = document.querySelector('#companies tbody');

// Form
const form = document.getElementsByTagName('form')[0];
const inputName = document.getElementById('name');
const inputIndustry = document.getElementById('industry');
const inputSector = document.getElementById('sector');
const inputCapital = document.getElementById('capital');
const inputSubmit = document.querySelectorAll('[type=submit]')[0];

async function loadCompanies(){
  let res = await fetch('http://localhost:3000/api/companies');
  let companies = await res.json();
  companies.forEach(company => {
    let row = document.createElement('tr');
    row.addEventListener('click', (e) => {
      let id = e.currentTarget.children[0].textContent;
      if (!e.currentTarget.classList.contains('marcada')) {
        e.currentTarget.classList.add('marcada');
      } else {
        e.currentTarget.classList.remove('marcada');
      }
      saveSelected();
    });
    row.innerHTML = `
      <td>${company.id}</td>
      <td>${company.name}</td>
      <td>${company.industry}</td>
      <td>${company.sector}</td>
      <td>${company.capital}</td>
    `;
    // if (sessionStorage['selected'] && JSON.parse(sessionStorage['selected'].contains(company.id))) {
    //   row.classList.add('marcada');
    // }
    companiesList.append(row);
  });
}

function saveSelected() {
  let rows = companiesList.querySelectorAll('tr.marcada');
  let selected = [...rows].map(row => row.children[0].textContent);
  sessionStorage['selected'] = JSON.stringify(selected);
}


form.addEventListener('submit', async (e) => {
  if (inputName.value) {
    let data = {
      "name": inputName.value,
      "industry": inputIndustry.value,
      "sector": inputSector.value,
      "capital": inputCapital.value
    };
    console.log(data);
    let options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
    let res = await fetch('http://localhost:3000/api/companies', options);
    
  } else {
    alert('Error: Debes rellenar al menos el campo nombre');
    e.preventDefault();
  }
});



window.onload = loadCompanies();