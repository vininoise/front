document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('pricing-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // Coletar dados do formulário
        var formData = new FormData(form);
        var data = {};

        formData.forEach(function (value, key) {
            data[key] = value;
        });
        
        // Enviar dados para o servidor via AJAX
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: 'follow'
        };

        fetch("https://web-production-30b1.up.railway.app/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    });
});
