document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('pricingForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Coletar dados do formulário
        var formData = new FormData(form);
        var data = {};
        formData.forEach(function (value, key) {
            data[key] = value;
        });

        // Enviar dados para o servidor via AJAX
        fetch('/form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            // Manipular o resultado retornado do servidor
            console.log(result);
            // Aqui você pode atualizar a interface do usuário com o resultado, se necessário
        })
        .catch(error => console.error('Erro:', error));
    });
});
