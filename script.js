document.addEventListener('DOMContentLoaded', function() {
    // Данные видов лечения и услуг
    const treatments = {
        'Лечение зубов': [
            { name: 'Пломбирование зуба', minPrice: 5000, maxPrice: 7000 },
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

        // Устанавливаем первый элемент как выбранный
        if (treatmentTypeSelect.options.length > 0) {
            treatmentTypeSelect.selectedIndex = 0;
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
        if (!services) {
            // Если services undefined или null, выходим из функции
            return;
        }
        services.forEach(function(service, index) {
            let option = document.createElement('option');
            option.value = index;
            option.textContent = service.name;
            serviceSelect.appendChild(option);
        });
    }

    // Остальная часть кода остается без изменений...
});
