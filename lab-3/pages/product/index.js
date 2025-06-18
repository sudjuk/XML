import { ProductComponent } from '../../components/product/index.js';
import { products } from '../../data/products.js';

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getData() {
        return products.find(product => product.id === parseInt(this.id));
    }

    getHTML() {
        return (
            `
                <div id="product-page" class="container mt-4">
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
                            <h2 class="mb-0">Детали товара</h2>
                            <div style="width: 42px;"></div>
                        </div>
                    </div>
                </div>
            `
        );
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const data = this.getData();
        if (data) {
            const product = new ProductComponent(this.pageRoot);
            product.render(data);
        }
    }
} 