import { ProductCardComponent } from '../../components/product-card/index.js';
import { ModalComponent } from '../../components/modal/index.js';
import { products, saveProducts } from '../../data/products.js';
import { CarouselPage } from '../carousel/index.js';
import { ProductPage } from '../product/index.js';

export class MainPage {
    constructor(parent, productId = null) {
        this.parent = parent;
        this.searchText = '';
        this.productId = productId;
    }

    handleEdit(product) {
        const modal = new ModalComponent(this.parent);
        modal.render(product, (updatedProduct) => {
            const index = products.findIndex(p => p.id === updatedProduct.id);
            if (index !== -1) {
                products[index] = updatedProduct;
                saveProducts();
                this.renderProducts();
            }
        });
    }

    handleDelete(productId) {
        if (confirm('Вы уверены, что хотите удалить эту карточку?')) {
            const index = products.findIndex(p => p.id === productId);
            if (index !== -1) {
                products.splice(index, 1);
                saveProducts();
                const carouselPage = new CarouselPage(this.parent);
                carouselPage.render();
            }
        }
    }

    handleAdd() {
        const modal = new ModalComponent(this.parent);
        modal.render(null, (newProduct) => {
            newProduct.id = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
            products.push(newProduct);
            saveProducts();
            this.renderProducts();
        });
    }

    searchProducts() {
        const searchInput = document.getElementById('search-input');
        this.searchText = searchInput.value.toLowerCase();
        this.renderProducts();
    }

    renderProducts() {
        const productsContainer = document.getElementById('products-container');
        productsContainer.innerHTML = '';
        
        let filteredData = products;
        if (this.searchText) {
            filteredData = products.filter(item => 
                item.title.toLowerCase().includes(this.searchText)
            );
        }
        
        if (this.productId) {
            filteredData = filteredData.filter(item => item.id === this.productId);
        }
        
        filteredData.forEach((item) => {
            const productCard = new ProductCardComponent(productsContainer);
            productCard.render(
                item, 
                this.clickCard.bind(this),
                this.handleEdit.bind(this),
                this.handleDelete.bind(this)
            );
        });
    }

    clickCard(productId) {
        const productPage = new ProductPage(this.parent, productId);
        productPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const searchButton = document.getElementById('search-button');
        const searchInput = document.getElementById('search-input');
        const addButton = document.getElementById('addProduct');
        const calculatorButton = document.getElementById('calculator-button');
        
        if (searchButton) searchButton.addEventListener('click', () => this.searchProducts());
        if (searchInput) searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                this.searchProducts();
            }
        });
        if (addButton) addButton.addEventListener('click', () => this.handleAdd());
        if (calculatorButton) calculatorButton.addEventListener('click', () => {
            window.location.href = 'calculator.html';
        });

        this.renderProducts();
    }

    getHTML() {
        return (
            `
                <div class="container">
                    <div class="header-section mb-4">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center gap-3">
                                <a href="index.html" class="logo-link">
                                    <img src="logo_ozon_1.webp" alt="Ozon Logo" class="ozon-logo" style="height: 30px;">
                                </a>
                                <button class="btn btn-outline-primary btn-sm header-theme-btn" onclick="toggleTheme()">
                                    <i class="bi bi-moon-stars"></i>
                                </button>
                            </div>
                            ${!this.productId ? `
                                <div class="search-container">
                                    <div class="input-group">
                                        <input type="text" id="search-input" class="form-control" placeholder="Поиск товаров...">
                                        <button class="btn btn-outline-secondary" type="button" id="search-button">
                                            <i class="bi bi-search"></i>
                                        </button>
                                    </div>
                                </div>
                            ` : ''}
                            <div class="d-flex gap-2">
                                ${!this.productId ? `
                                    <button class="btn btn-outline-primary btn-sm" id="addProduct">
                                        <i class="bi bi-plus-lg"></i> Добавить товар
                                    </button>
                                ` : ''}
                                <button class="btn btn-outline-primary btn-sm" id="calculator-button">
                                    <i class="bi bi-calculator"></i> Калькулятор
                                </button>
                            </div>
                        </div>
                    </div>
                    <div id="products-container" class="row"></div>
                </div>
            `
        );
    }
} 