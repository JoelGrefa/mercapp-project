<script setup>
import { reactive, ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useApi } from '../composables/useApi';
import { useToast } from '../composables/useToast';

const route = useRoute();
const router = useRouter();
const { showToast } = useToast();
const { request } = useApi('http://localhost:4000');

const isEdit = computed(() => route.name === 'product-edit');

const form = reactive({
  name: '',
  description: '',
  price: '',
  categoryId: '',
  stock: '',
  imageUrl: '',
});

const errors = reactive({
  name: '',
  price: '',
  categoryId: '',
  stock: '',
  imageUrl: '',
});

const categories = ref([]);
const loading = ref(false);
const saving = ref(false);
const loadError = ref(null);

const clearErrors = () => {
  errors.name = '';
  errors.price = '';
  errors.categoryId = '';
  errors.stock = '';
  errors.imageUrl = '';
};

const validate = () => {
  clearErrors();
  let valid = true;

  if (!form.name.trim()) {
    errors.name = 'El nombre es obligatorio.';
    valid = false;
  }

  const priceNumber = Number(form.price);
  if (isNaN(priceNumber) || priceNumber <= 0) {
    errors.price = 'El precio debe ser un número mayor a 0.';
    valid = false;
  }

  if (!form.categoryId) {
    errors.categoryId = 'Selecciona una categoría.';
    valid = false;
  }

  const stockNumber = Number(form.stock);
  if (isNaN(stockNumber) || stockNumber < 0) {
    errors.stock = 'El stock debe ser un número mayor o igual a 0.';
    valid = false;
  }

  if (!form.imageUrl.trim()) {
    errors.imageUrl = 'La URL de la imagen es obligatoria.';
    valid = false;
  } else if (!/^https?:\/\/.+/i.test(form.imageUrl.trim())) {
    errors.imageUrl = 'Debe ser una URL válida que empiece por http o https.';
    valid = false;
  }

  return valid;
};

const loadCategories = async () => {
  const data = await request({
    url: '/api/categories',
    method: 'GET',
  });
  categories.value = data;
};

const loadProduct = async () => {
  if (!isEdit.value) return;

  const data = await request({
    url: `/api/products/${route.params.id}`,
    method: 'GET',
  });

  form.name = data.name ?? '';
  form.description = data.description ?? '';
  form.price = data.price ?? '';
  form.categoryId = data.categoryId ?? '';
  form.stock = data.stock ?? 0;
  form.imageUrl = data.imageUrl ?? '';
};

const init = async () => {
  loading.value = true;
  loadError.value = null;
  try {
    await loadCategories();
    await loadProduct();
  } catch (err) {
    loadError.value = err;
  } finally {
    loading.value = false;
  }
};

onMounted(init);

const handleSubmit = async () => {
  if (!validate()) return;

  saving.value = true;
  try {
    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      categoryId: Number(form.categoryId),
      stock: Number(form.stock),
      imageUrl: form.imageUrl.trim(),
    };

    let productId = route.params.id;

    if (isEdit.value) {
      await request({
        url: `/api/products/${productId}`,
        method: 'PUT',
        data: payload,
      });
      showToast('Producto actualizado correctamente');
    } else {
      const created = await request({
        url: '/api/products',
        method: 'POST',
        data: payload,
      });
      productId = created.id;
      showToast('Producto creado correctamente');
    }

    // Ir al detalle del producto si tenemos id, o al catálogo
    if (productId) {
      router.push(`/product/${productId}`);
    } else {
      router.push('/');
    }
  } catch (err) {
    console.error(err);
    showToast('Ocurrió un error al guardar el producto');
  } finally {
    saving.value = false;
  }
};

const goBack = () => {
  if (isEdit.value && route.params.id) {
    router.push(`/product/${route.params.id}`);
  } else {
    router.push('/');
  }
};
</script>

<template>
  <section class="page">
    <header class="header">
      <p class="eyebrow">
        {{ isEdit ? 'Editar producto' : 'Nuevo producto' }}
      </p>
      <h1>
        {{ isEdit ? 'Editar producto' : 'Crear nuevo producto' }}
      </h1>
      <p class="subtitle">
        Completa los datos del producto. Los campos marcados con * son
        obligatorios.
      </p>
    </header>

    <div v-if="loading" class="state">Cargando datos...</div>

    <div v-else-if="loadError" class="state error">
      Error al cargar datos. Intenta nuevamente.
    </div>

    <form v-else class="form" @submit.prevent="handleSubmit">
      <div class="field">
        <label for="name">Nombre *</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          autocomplete="off"
        />
        <p v-if="errors.name" class="error-text">{{ errors.name }}</p>
      </div>

      <div class="field">
        <label for="description">Descripción</label>
        <textarea
          id="description"
          v-model="form.description"
          rows="3"
        ></textarea>
      </div>

      <div class="field-inline">
        <div class="field">
          <label for="price">Precio *</label>
          <input
            id="price"
            v-model="form.price"
            type="number"
            min="0"
            step="0.01"
          />
          <p v-if="errors.price" class="error-text">{{ errors.price }}</p>
        </div>

        <div class="field">
          <label for="stock">Stock *</label>
          <input
            id="stock"
            v-model="form.stock"
            type="number"
            min="0"
            step="1"
          />
          <p v-if="errors.stock" class="error-text">{{ errors.stock }}</p>
        </div>
      </div>

      <div class="field">
        <label for="categoryId">Categoría *</label>
        <select id="categoryId" v-model="form.categoryId">
          <option value="">Selecciona una categoría</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
        <p v-if="errors.categoryId" class="error-text">
          {{ errors.categoryId }}
        </p>
      </div>

      <div class="field">
        <label for="imageUrl">URL de imagen *</label>
        <input
          id="imageUrl"
          v-model="form.imageUrl"
          type="text"
          autocomplete="off"
        />
        <p v-if="errors.imageUrl" class="error-text">
          {{ errors.imageUrl }}
        </p>
      </div>

      <div class="actions">
        <button
          type="button"
          class="btn-secondary"
          @click="goBack"
          :disabled="saving"
        >
          Cancelar
        </button>
        <button type="submit" class="btn-primary" :disabled="saving">
          {{ saving ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Crear producto' }}
        </button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.page {
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.eyebrow {
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: #9ca3af;
  margin-bottom: 0.25rem;
}

h1 {
  font-size: 1.6rem;
  margin: 0;
  color: #111827;
}

.subtitle {
  margin-top: 0.4rem;
  color: #4b5563;
  font-size: 0.9rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #ffffff;
  padding: 1.5rem 1.75rem;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.05);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.field-inline {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
}

label {
  font-size: 0.85rem;
  color: #374151;
}

input,
textarea,
select {
  padding: 0.55rem 0.7rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  font-size: 0.9rem;
  outline: none;
}

input:focus,
textarea:focus,
select:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.2);
}

.error-text {
  color: #dc2626;
  font-size: 0.8rem;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.btn-primary,
.btn-secondary {
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
}

.btn-primary {
  background: #2563eb;
  color: #ffffff;
  font-weight: 600;
}

.btn-primary:disabled,
.btn-secondary:disabled {
  opacity: 0.6;
  cursor: default;
}

.btn-secondary {
  background: #e5e7eb;
  color: #111827;
}

.state {
  margin-top: 1rem;
  color: #4b5563;
}

.state.error {
  color: #dc2626;
}
</style>
