import { CarouselComponent } from '../../components/carousel/index.js';
import { ModalComponent } from '../../components/modal/index.js';
import { products, saveProducts } from '../../data/products.js';

export class CarouselPage {
    constructor(parent) {
        this.parent = parent;
        this.carouselComponent = null;
    }

    handleAdd() {
        const modal = new ModalComponent(this.parent);
        modal.render(null, (newProduct) => {
            newProduct.id = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
            products.push(newProduct);
            saveProducts();
            this.render();
        });
    }

    handleSearch(e) {
        const searchText = e.target.value;
        if (this.carouselComponent) {
            this.carouselComponent.filterProducts(searchText);
        }
    }

    render() {
        // Очищаем родительский элемент перед рендерингом
        this.parent.innerHTML = '';
        
        const container = document.createElement('div');
        container.className = 'container';

        const headerSection = document.createElement('div');
        headerSection.className = 'header-section mb-4';
        headerSection.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center gap-3">
                    <a href="index.html" class="logo-link">
                        <img src="logo_ozon_1.webp" alt="Ozon Logo" class="ozon-logo" style="height: 30px;">
                    </a>
                    <button class="btn btn-outline-primary btn-sm header-theme-btn" onclick="toggleTheme()">
                        <i class="bi bi-moon-stars"></i>
                    </button>
                </div>
                <div class="search-container">
                    <div class="input-group">
                        <input type="text" class="form-control" id="search-input" placeholder="Поиск товаров...">
                        <button class="btn btn-outline-secondary" type="button">
                            <i class="bi bi-search"></i>
                        </button>
                    </div>
                </div>
                <div class="header-actions">
                    <button class="btn btn-outline-primary btn-sm" id="addProduct">
                        <i class="bi bi-plus-lg"></i> Добавить товар
                    </button>
                    <a href="calculator.html" class="btn btn-outline-primary btn-sm">
                        <i class="bi bi-calculator"></i> Калькулятор
                    </a>
                </div>
            </div>
        `;

        container.appendChild(headerSection);

        const carouselContainer = document.createElement('div');
        carouselContainer.className = 'carousel-container';
        container.appendChild(carouselContainer);

        this.parent.appendChild(container);

        this.carouselComponent = new CarouselComponent(carouselContainer);
        this.carouselComponent.render();

        const addButton = container.querySelector('#addProduct');
        addButton.addEventListener('click', () => this.handleAdd());

        const searchInput = container.querySelector('#search-input');
        searchInput.addEventListener('input', (e) => this.handleSearch(e));
    }
} 