export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="card mb-4">
                            <div class="row g-0">
                                <div class="col-md-5">
                                    <img src="${data.src}" class="img-fluid rounded-start h-100" alt="${data.title}" style="object-fit: cover;">
                                </div>
                                <div class="col-md-7">
                                    <div class="card-body">
                                        <h3 class="card-title mb-3">${data.title}</h3>
                                        <p class="card-price mb-4">${data.price ? data.price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }) : 'Цена не указана'}</p>
                                        <div class="description-section">
                                            <h5 class="mb-3">Описание товара</h5>
                                            <p class="card-text">${data.description || 'Описание отсутствует'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        );
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
} 