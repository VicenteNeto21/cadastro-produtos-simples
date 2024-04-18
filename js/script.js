var selectedRow = null;

function showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

//clear all

function clearFields() {
    document.querySelector("#name-product").value = "";
    document.querySelector("#description-product").value = "";
    document.querySelector("#product-value").value = "";
}

// Add data

document.querySelector("#submit-form").addEventListener("submit", (e) => {
    e.preventDefault();
    //Get form values
    const nameProduct = document.querySelector("#name-product").value;
    const descriptionProduct = document.querySelector("#description-product").value;
    const productValue = document.querySelector("#product-value").value;

    //validate

    if (nameProduct == "" || descriptionProduct == "" || productValue == "") {
        showAlert("Preenchar o campo", "danger");
    } else {
        if (selectedRow == null) {
            const list = document.querySelector(".itens-lists");
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${nameProduct}</td>
            <td>${descriptionProduct}</td>
            <td>${productValue}</td>
            <td>
            <a href="#" class="btn btn-warning btn-sm editar">Editar</a>
            <a href="#" class="btn btn-danger btn-sm deletar">Deletar</a>
            </td>
        `;
            list.appendChild(row);
            selectedRow = null;

            showAlert("Produto adicionado", "success");
        } else {
            selectedRow.children[0].textContent = nameProduct;
            selectedRow.children[1].textContent = descriptionProduct;
            selectedRow.children[2].textContent = productValue;

            selectedRow = null;
            showAlert("Produto editado com sucesso", "info");
        }
        clearFields();
    }
});

// Edit Data

document.querySelector(".itens-lists").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("editar")) {
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#name-product").value = selectedRow.children[0].textContent;
        document.querySelector("#description-product").value = selectedRow.children[1].textContent;
        document.querySelector("#product-value").value = selectedRow.children[2].textContent;
    }

});

//Delete

document.querySelector(".itens-lists").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("deletar")) {
        target.parentElement.parentElement.remove();
        showAlert("Produto removido!", "danger");
    }
});