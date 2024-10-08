document.addEventListener('DOMContentLoaded', function() {
    // Данные видов лечения и услуг
    const treatments = {
        'Лечение зубов': [
            { name: 'Наложение светоотверждаемой пломбы из композиционного материала Estelite', price: 7000 },
            { name: 'Эстетическая реставрация', price: 13000 },
            { name: 'Лечение периодонтита одноканального зуба', price: 13500 },
            { name: 'Лечение периодонтита одноканального зуба под микроскопом', price: 18500 },
            { name: 'Лечение периодонтита двухканального зуба', price: 15500 },
            { name: 'Лечение периодонтита двухканального зуба под микроскопом', price: 22500 },
            { name: 'Лечение периодонтита трехканального / четырехканального зуба', price: 17500 },
            { name: 'Лечение периодонтита трехканального / четырехканального зуба под микроскопом', price: 26500 },
            { name: 'Лечение пульпита одноканального зуба', price: 9500 },
            { name: 'Лечение пульпита одноканального зуба под микроскопом', price: 13500 },
            { name: 'Лечение пульпита двухканального зуба', price: 11500 },
            { name: 'Лечение пульпита двухканального зуба под микроскопом', price: 15500 },
            { name: 'Лечение пульпита трехканального / четырехканального зуба', price: 13500 },
            { name: 'Лечение пульпита трехканального / четырехканального зуба под микроскопом', price: 19500 },
            { name: 'Перелечивание одноканального зуба', price: 15500 },
            { name: 'Перелечивание одноканального зуба под микроскопом', price: 21500 },
            { name: 'Перелечивание двухканального зуба', price: 19500 },
            { name: 'Перелечивание двухканального зуба под микроскопом', price: 26500 },
            { name: 'Перелечивание трехканального / четырехканального зуба', price: 21500 },
            { name: 'Перелечивание трехканального / четырехканального зуба под микроскопом', price: 31500 },
            { name: 'Диагностика зубов под микроскопом', price: 5000 }
        ],
        'Имплантация': [
            { name: 'Osstem (Корея): С циркониевой коронкой под ключ', price: 78000 },
            { name: 'Osstem (Корея): С керамической коронкой под ключ', price: 78000 },
            { name: 'INNO (Корея): С керамической коронкой под ключ', price: 78000 },
            { name: 'INNO (Корея): С циркониевой коронкой под ключ', price: 78000 },
            { name: 'Имплантация Xive (Германия): С керамической коронкой под ключ', price: 115000 },
            { name: 'Имплантация Xive (Германия): С циркониевой коронкой под ключ', price: 115000 },
            { name: 'Ankylos (Германия): С керамической коронкой под ключ', price: 125000 },
            { name: 'Ankylos (Германия): С циркониевой коронкой под ключ', price: 125000 },
            { name: 'Straumann (Швейцария): С керамической коронкой под ключ', price: 135000 },
            { name: 'Straumann (Швейцария): С циркониевой коронкой под ключ', price: 135000 },
            { name: 'ASTRA TECH (Швеция): С керамической коронкой под ключ', price: 135000 },
            { name: 'ASTRA TECH (Швеция): С циркониевой коронкой под ключ', price: 135000 }
        ],
        'Лечение десен': [
            { name: 'Гингивотомия / гингивэктомия', price: 2900 },
            { name: 'Изоляция элементов поражения слизистой оболочки лечебными пленками', price: 950 },
            { name: 'Инъекция лекарственных препаратов при заболеваниях слизистой оболочки (1 процедура)', price: 1900 },
            { name: 'Инъекция лекарственных препаратов при заболеваниях слизистой оболочки (курс из 10 процедур)', price: 6500 },
            { name: 'Лечение зубов и десен аппаратом Вектор (Vector)', price: 27500 }
        ],
        'Дополнительные услуги': [
            { name: 'Общая консультация', price: 1000 },
            { name: 'Онлайн консультация', price: 2000 },
            { name: 'Консультация специалиста узкого профиля', price: 2000 },
            { name: 'Консультация гнатолога', price: 4000 },
            { name: 'Ортопантомограмма (ОПТГ), или панорамный снимок зубов', price: 1500 },
            { name: 'Телерентгенограмма (ТРГ)', price: 2000 },
            { name: 'КТ одного сегмента (3 зуба в ряд)', price: 2500 },
            { name: 'КТ одной челюсти', price: 3000 },
            { name: 'КТ двух челюстей', price: 5000 },
            { name: 'КТ обеих челюстей с ВНЧС с паспортом зубов', price: 7000 }
        ],
        'Детская стоматология': [
            // Профилактика
            { name: 'Профессиональная гигиена молочных зубов', price: 2500 },
            { name: 'Профессиональная гигиена детских зубов / сменного прикуса', price: 3500 },
            { name: 'Комплексная гигиена детских зубов постоянный прикус', price: 5500 },
            { name: 'Герметизация фиссур', price: 3500 },
            { name: 'Фторирование зубов', price: 500 },
            // Лечение зубов
            { name: 'Наложение пломбы Twinky Star', price: 4550 },
            { name: 'Пломба на постоянный зуб Эстелайт', price: 5550 },
            // Хирургия
            { name: 'Удаление подвижного зуба', price: 1500 },
            { name: 'Удаление молочного зуба', price: 1700 },
            { name: 'Удаление постоянного однокорневого зуба', price: 4500 },
            { name: 'Удаление постоянного многокорневого зуба', price: 6500 },
            // Протезирование
            { name: 'Протезирование молочного зуба металлической коронкой', price: 9900 },
            { name: 'Протезирование молочного зуба металлической коронкой с композитной облицовкой', price: 10900 }
        ],
        'Костная пластика': [
            { name: 'Односторонний закрытый синус-лифтинг', price: 32500 },
            { name: 'Односторонний открытый синус-лифтинг', price: 58500 }
        ],
        'Отбеливание зубов': [
            { name: 'Отбеливание Amazing white', price: 19500 },
            { name: 'Отбеливание ZOOM', price: 32500 },
            { name: 'Домашнее отбеливание Opalescence - 1 шприц', price: 4500 },
            { name: 'Отбеливание коронки депульпированного зуба', price: 4550 }
        ],
        'Гигиена зубов и полости рта': [
            { name: 'Профессиональная гигиена полости рта', price: 12000 },
            { name: 'Снятие зубного камня ультразвуком', price: 3500 },
            { name: 'Удаление зубных отложений методом Air Flow', price: 5200 },
            { name: 'Реминерализация зубов', price: 1500 },
            { name: 'Полировка и фторирование всех зубов', price: 4550 },
            { name: 'Профессиональная гигиена для ортодонтических пациентов', price: 13500 }
        ],
        'Ортодонтия (Исправление прикуса)': [
            { name: 'Диагностика + составление плана лечения', price: 8700 },
            // Лечение на несъемной аппаратуре
            { name: 'Фиксация брекет-системы Damon Q.Q2 на одну челюсть', price: 62000 },
            { name: 'Фиксация брекет-системы Damon Clear на одну челюсть', price: 75000 },
            { name: 'Фиксация брекет-системы Expirince metall на одну челюсть', price: 49400 },
            { name: 'Фиксация брекет-системы Expirince Ceramic на одну челюсть', price: 65000 },
            { name: 'Плановое посещение при лечении на брекет-системе', price: 8000 },
            // Добавьте остальные услуги...
        ],
        // Добавьте остальные виды лечения и услуги, если нужно
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
        treatmentSearch.value = '';
        treatmentSearch.oninput = filterTreatmentTypes;

        const serviceSearch = document.getElementById('serviceSearch');
        serviceSearch.value = '';
        serviceSearch.oninput = filterServices;

        treatmentTypeSelect.onchange = function() {
            updateServices();
            updateServicePrice();
        };

        const serviceSelect = document.getElementById('serviceSelect');
        serviceSelect.onchange = updateServicePrice;

        document.getElementById('treatmentModal').style.display = 'block';
    }

    // Функция обновления списка услуг
    function updateServices() {
        const treatmentType = document.getElementById('treatmentTypeSelect').value;
        const services = treatments[treatmentType];
        const serviceSelect = document.getElementById('serviceSelect');
        serviceSelect.innerHTML = '';
        if (!services) {
            return;
        }
        services.forEach(function(service, index) {
            let option = document.createElement('option');
            option.value = index;
            option.textContent = service.name;
            serviceSelect.appendChild(option);
        });
        // Устанавливаем первый элемент как выбранный
        if (serviceSelect.options.length > 0) {
            serviceSelect.selectedIndex = 0;
            updateServicePrice();
        }
    }

    // Функция обновления отображения цены услуги
    function updateServicePrice() {
        const treatmentType = document.getElementById('treatmentTypeSelect').value;
        const serviceSelect = document.getElementById('serviceSelect');
        const serviceIndex = serviceSelect.value;
        const service = treatments[treatmentType][serviceIndex];
        const servicePriceElement = document.getElementById('servicePrice');

        if (service.price) {
            servicePriceElement.textContent = `${service.price} ₽`;
        } else {
            servicePriceElement.textContent = `Цена не указана`;
        }
    }

    // Фильтрация видов лечения
    function filterTreatmentTypes() {
        const query = this.value.toLowerCase();
        const treatmentTypeSelect = document.getElementById('treatmentTypeSelect');
        let found = false;
        for (let option of treatmentTypeSelect.options) {
            if (option.text.toLowerCase().includes(query)) {
                option.style.display = '';
                if (!found) {
                    option.selected = true;
                    found = true;
                }
            } else {
                option.style.display = 'none';
            }
        }
        if (found) {
            updateServices();
            updateServicePrice();
        } else {
            document.getElementById('serviceSelect').innerHTML = '';
            document.getElementById('servicePrice').textContent = '---';
        }
    }

    // Фильтрация услуг
    function filterServices() {
        const query = this.value.toLowerCase();
        const serviceSelect = document.getElementById('serviceSelect');
        let found = false;
        for (let option of serviceSelect.options) {
            if (option.text.toLowerCase().includes(query)) {
                option.style.display = '';
                if (!found) {
                    option.selected = true;
                    found = true;
                }
            } else {
                option.style.display = 'none';
            }
        }
        if (found) {
            updateServicePrice();
        } else {
            document.getElementById('servicePrice').textContent = '---';
        }
    }

    // Закрытие модального окна выбора лечения
    document.getElementById('closeTreatmentModal').addEventListener('click', function() {
        document.getElementById('treatmentModal').style.display = 'none';
        document.getElementById('servicePrice').textContent = '---';
    });

    // Добавление лечения в план
    document.getElementById('addTreatment').addEventListener('click', function() {
        const treatmentTypeSelect = document.getElementById('treatmentTypeSelect');
        const serviceSelect = document.getElementById('serviceSelect');
        const treatmentType = treatmentTypeSelect.value;
        const serviceIndex = serviceSelect.value;
        const service = treatments[treatmentType][serviceIndex];

        let price = service.price || 0;

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
        document.getElementById('servicePrice').textContent = '---';
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
            document.getElementById('servicePrice').textContent = '---';
        }
    });
});
