export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        <img src="${data.src}" class="card-img-top" alt="${data.title}">
                        <div class="card-body">
                            <h5 class="card-title">${data.title}</h5>
                            <p class="card-price">${data.price ? data.price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }) : 'Цена не указана'}</p>
                            <div class="card-actions">
                                <button class="btn btn-outline-primary" data-id="${data.id}" data-action="detail">
                                    <i class="bi bi-info-circle"></i>
                                </button>
                                <button class="btn btn-outline-primary" data-id="${data.id}" data-action="edit">
                                    <i class="bi bi-pencil"></i>
                                </button>
                                <button class="btn btn-outline-danger" data-id="${data.id}" data-action="delete">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `
        );
    }

    render(data, clickHandler, editHandler, deleteHandler) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        
        const card = this.parent.lastElementChild;
        const detailButton = card.querySelector('button[data-action="detail"]');
        const editButton = card.querySelector('button[data-action="edit"]');
        const deleteButton = card.querySelector('button[data-action="delete"]');
        
        detailButton.addEventListener('click', () => clickHandler(data.id));
        editButton.addEventListener('click', () => editHandler(data));
        deleteButton.addEventListener('click', () => deleteHandler(data.id));
    }
} 