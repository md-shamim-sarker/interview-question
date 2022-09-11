// fetch data from local api
const url = "../json/qa.json";
fetch(url)
    .then(response => response.json())
    .then(data => display(data))
    .catch(error => console.log(error));

const display = data => {
    console.table(data);
    // topic array for select option and remove duplication
    const topicArray = [];
    data.forEach(element => {
        if(!topicArray.includes(element.topic)) {
            topicArray.push(element.topic);
        }
    });

    // set topics in option select
    const topicArraySort = topicArray.sort();
    const container = document.getElementById('inputGroupSelect');
    topicArraySort.forEach(element => {
        const option = document.createElement('option');
        option.innerHTML = `<option value="${element}">${element}</option>`;
        container.appendChild(option);
    });

    // display filtered
    const displayeData = topic => {
        const filterElement = data.filter(e => e.topic === topic);
        const container = document.getElementById('accordionFlush');
        document.getElementById('accordionFlush').innerText = '';
        for(let i = 0; i < filterElement.length; i++) {
            let serial = i + 1;
            const item = document.createElement('div');
            item.classList.add('accordion-item');
            item.innerHTML = `
            <h2 class="accordion-header" id="flush-heading-${serial}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#flush-collapse-${serial}" aria-expanded="false" aria-controls="flush-collapse-${serial}">
                        ${serial}. ${filterElement[i].question}
                </button>
            </h2>
            <div id="flush-collapse-${serial}" class="accordion-collapse collapse" aria-labelledby="flush-heading-${serial}"
                    data-bs-parent="#accordionFlush">
                <div class="accordion-body">
                        ${filterElement[i].answer}
                </div>
            </div>
        `;
            container.appendChild(item);
        }
    };

    // display all
    const displayeDataAll = () => {
        const container = document.getElementById('accordionFlush');
        document.getElementById('accordionFlush').innerText = '';
        for(let i = 0; i < data.length; i++) {
            let serial = i + 1;
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

    // display all defaultly
    displayeDataAll();

    // display by filtered
    // select option handler
    document.getElementById('inputGroupSelect').addEventListener('click', () => {
        const selectValue = document.getElementById('inputGroupSelect').value;
        if(selectValue === 'all') {
            displayeDataAll();
        } else {
            displayeData(selectValue);
        }
    });

    // button handler
    document.querySelector("#filter-btn").addEventListener('click', () => {
        const selectValue = document.getElementById('inputGroupSelect').value;
        if(selectValue === 'all') {
            displayeDataAll();
        } else {
            displayeData(selectValue);
        }
    });
};