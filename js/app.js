const file = "../json/qa.json";

fetch(file)
    .then(response => response.json())
    .then(data => display(data))
    .catch(error => console.log(error));

const display = data => {
    for(let i = 0; i < data.length; i++) {
        let serial = i + 1;
        const container = document.getElementById('accordionFlush');
        const item = document.createElement('div');
        item.classList.add('accordion-item');
        item.innerHTML = `
            <h2 class="accordion-header" id="flush-heading-${serial}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#flush-collapse-${serial}" aria-expanded="false" aria-controls="flush-collapse-${serial}">
                        ${serial}. ${data[i].question}
                </button>
            </h2>
            <div id="flush-collapse-${serial}" class="accordion-collapse collapse" aria-labelledby="flush-heading-${serial}"
                    data-bs-parent="#accordionFlush">
                <div class="accordion-body">
                        ${data[i].answer}
                </div>
            </div>
        `;
        container.appendChild(item);
    }
};