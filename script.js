document.addEventListener('DOMContentLoaded', function() {
    // Данные видов лечения и услуг
    const treatments = {
        'Лечение зубов': [
            { name: 'Наложение светоотверждаемой пломбы из композиционного материала Estelite', minPrice: 7000, maxPrice: 9230 },
            // Добавьте остальные услуги...
        ],
        // Добавьте остальные виды лечения...
    };

    // Сохраненные выбранные зубы
    let selectedTeeth = [];

    // План лечения
    let treatmentPlan = [];

    // Обработчики для кнопок выбора зубов
    const toothButtons = document.querySelectorAll('.tooth-button');
    toothButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const toothNumber = this.dataset.tooth;
            if (selectedTeeth.includes(toothNumber)) {
                // Если зуб уже выбран, снимаем выделение
                selectedTeeth = selectedTeeth.filter(t => t !== toothNumber);
                this.classList.remove('selected');
            } else {
                // Добавляем зуб в выбранные
                selectedTeeth.push(toothNumber);
                this.classList.add('selected');
            }
        });
    });

    // Открытие модального окна выбора лечения
    const selectTreatmentButton = document.getElementById('selectTreatmentButton');
    selectTreatmentButton.addEventListener('click', function() {
        if (selectedTeeth.length === 0) {
            alert('Пожалуйста, выберите хотя бы один зуб.');
            return;
        }
        openTreatmentModal();
    });

    // Функция открытия модального окна выбора лечения
    function openTreatmentModal() {
        const treatmentTypeSelect = document.getElementById('treatmentTypeSelect');
        treatmentTypeSelect.innerHTML = '';
        for (let treatmentType in treatments) {
            let option = document.createElement('option');
            option.value = treatmentType;
            option.textContent = treatmentType;
            treatmentTypeSelect.appendChild(option);
        }
        updateServices();
        // Обработчики поиска
        const treatmentSearch = document.getElementById('treatmentSearch');
        treatmentSearch.removeEventListener('input', filterTreatmentTypes);
        treatmentSearch.addEventListener('input', filterTreatmentTypes);

        const serviceSearch = document.getElementById('serviceSearch');
        serviceSearch.removeEventListener('input', filterServices);
        serviceSearch.addEventListener('input', filterServices);

        treatmentTypeSelect.removeEventListener('change', updateServices);
        treatmentTypeSelect.addEventListener('change', updateServices);

        document.getElementById('treatmentModal').style.display = 'block';
    }

    // Функция обновления списка услуг
    function updateServices() {
        const treatmentType = document.getElementById('treatmentTypeSelect').value;
        const services = treatments[treatmentType];
        const serviceSelect = document.getElementById('serviceSelect');
        serviceSelect.innerHTML = '';
        services.forEach(function(service, index) {
            let option = document.createElement('option');
            option.value = index;
            option.textContent = service.name;
            serviceSelect.appendChild(option);
        });
    }

    // Фильтрация видов лечения
    function filterTreatmentTypes() {
        const query = document.getElementById('treatmentSearch').value.toLowerCase();
        const treatmentTypeSelect = document.getElementById('treatmentTypeSelect');
        for (let option of treatmentTypeSelect.options) {
            if (option.text.toLowerCase().includes(query)) {
                option.style.display = '';
            } else {
                option.style.display = 'none';
            }
        }
    }

    // Фильтрация услуг
    function filterServices() {
        const query = document.getElementById('serviceSearch').value.toLowerCase();
        const serviceSelect = document.getElementById('serviceSelect');
        for (let option of serviceSelect.options) {
            if (option.text.toLowerCase().includes(query)) {
                option.style.display = '';
            } else {
                option.style.display = 'none';
            }
        }
    }

    // Закрытие модального окна выбора лечения
    document.getElementById('closeTreatmentModal').addEventListener('click', function() {
        document.getElementById('treatmentModal').style.display = 'none';
    });

    // Добавление лечения в план
    document.getElementById('addTreatment').addEventListener('click', function() {
        const treatmentType = document.getElementById('treatmentTypeSelect').value;
        const serviceIndex = document.getElementById('serviceSelect').value;
        const service = treatments[treatmentType][serviceIndex];
        let price = parseFloat(document.getElementById('priceInput').value);
        if (isNaN(price) || price <= 0) {
            alert('Пожалуйста, укажите корректную цену.');
            return;
        }
        // Проверка цены в диапазоне
        if (service.minPrice && service.maxPrice) {
            if (price < service.minPrice || price > service.maxPrice) {
                alert(`Цена должна быть в диапазоне от ${service.minPrice} до ${service.maxPrice} ₽`);
                return;
            }
        } else if (service.price && price !== service.price) {
            alert(`Цена должна быть ${service.price} ₽`);
            return;
        }
        selectedTeeth.forEach(function(toothNumber) {
            treatmentPlan.push({
                toothNumber: toothNumber,
                treatmentType: treatmentType,
                service: service.name,
                price: price
            });
            // Подсвечиваем зуб на визуализации
            highlightToothOnVisualization(toothNumber);
        });
        updateTreatmentPlan();
        // Сброс выбранных зубов
        selectedTeeth = [];
        document.querySelectorAll('.tooth-button.selected').forEach(function(button) {
            button.classList.remove('selected');
        });
        document.getElementById('treatmentModal').style.display = 'none';
        // Сброс полей поиска и цены
        document.getElementById('treatmentSearch').value = '';
        document.getElementById('serviceSearch').value = '';
        document.getElementById('priceInput').value = '';
    });

    // Обновление таблицы плана лечения
    function updateTreatmentPlan() {
        const tbody = document.querySelector('#treatmentPlan tbody');
        tbody.innerHTML = '';
        let total = 0;
        treatmentPlan.forEach(function(item, index) {
            total += item.price;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.toothNumber}</td>
                <td>${item.treatmentType}</td>
                <td>${item.service}</td>
                <td>${item.price.toFixed(2)} ₽</td>
                <td><button data-index="${index}" class="delete-button">Удалить</button></td>
            `;
            tbody.appendChild(row);
        });
        document.getElementById('totalPrice').textContent = `${total.toFixed(2)} ₽`;
        // Добавляем обработчики удаления
        document.querySelectorAll('.delete-button').forEach(function(button) {
            button.addEventListener('click', function() {
                const index = this.dataset.index;
                // Убираем подсветку зуба на визуализации
                removeHighlightFromTooth(treatmentPlan[index].toothNumber);
                treatmentPlan.splice(index, 1);
                updateTreatmentPlan();
            });
        });
    }

    // Функция подсветки зуба на визуализации
    function highlightToothOnVisualization(toothNumber) {
        // Здесь вы можете реализовать подсветку зуба на визуализации
        // Для простоты, пока можно оставить пустым
    }

    // Функция удаления подсветки зуба
    function removeHighlightFromTooth(toothNumber) {
        // Здесь вы можете реализовать удаление подсветки зуба на визуализации
        // Для простоты, пока можно оставить пустым
    }

    // Экспорт в PDF
    document.getElementById('exportButton').addEventListener('click', function() {
        window.print();
    });

    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('treatmentModal');
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});
