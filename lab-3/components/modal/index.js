export class ModalComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data = null) {
        const isEdit = data !== null;
        return (
            `
                <div class="modal fade" id="productModal" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">${isEdit ? 'Редактировать товар' : 'Добавить товар'}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <form id="productForm">
                                    <div class="mb-3">
                                        <label for="title" class="form-label">Название товара</label>
                                        <input type="text" class="form-control" id="title" value="${data?.title || ''}" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="price" class="form-label">Цена</label>
                                        <input type="number" class="form-control" id="price" value="${data?.price || ''}" min="0" step="0.01" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="description" class="form-label">Описание товара</label>
                                        <textarea class="form-control" id="description" rows="4">${data?.description || ''}</textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label for="imageUrl" class="form-label">URL изображения</label>
                                        <input type="url" class="form-control" id="imageUrl" value="${data?.src || ''}">
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                                <button type="button" class="btn btn-primary" id="saveProduct">Сохранить</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
        );
    }

    render(data = null, onSave) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);

        const modal = new bootstrap.Modal(document.getElementById('productModal'));
        const saveButton = document.getElementById('saveProduct');
        const form = document.getElementById('productForm');
        
        saveButton.addEventListener('click', () => {
            if (form.checkValidity()) {
                const productData = {
                    ...(data || {}),
                    title: document.getElementById('title').value,
                    price: parseFloat(document.getElementById('price').value),
                    description: document.getElementById('description').value,
                    src: document.getElementById('imageUrl').value
                };
                
                onSave(productData);
                modal.hide();
                
                const modalElement = document.getElementById('productModal');
                modalElement.addEventListener('hidden.bs.modal', () => {
                    modalElement.remove();
                });
            } else {
                form.reportValidity();
            }
        });

        modal.show();
    }
} 