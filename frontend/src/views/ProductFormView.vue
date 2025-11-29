<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useApi } from '../composables/useApi';
import { useToast } from '../composables/useToast';

const route = useRoute();
const router = useRouter();
const { request } = useApi('http://localhost:4000');
const { showToast } = useToast();

// 👇 Detectar si estamos editando o creando
const isEdit = computed(() => route.path.includes('/edit'));

// ---------- Estado del formulario ----------
const form = ref({
  name: '',
  description: '',
  price: '',
  stock: '',
  categoryId: '',
  imageUrl: '',
});

const categories = ref([]);
const loading = ref(false);
const saving = ref(false);
const errors = ref({});
const generalError = ref('');

// ---------- Helpers ----------

// Aceptar http, https y rutas locales /uploads/xxx.jpg
const isValidImageUrl = (value) => {
  if (!value) return false;
  const trimmed = value.trim();
  return (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('/uploads/')
  );
};

// Validar formulario
const validateForm = () => {
  const newErrors = {};

  if (!form.value.name.trim()) {
    newErrors.name = 'El nombre es obligatorio.';
  }

  if (!form.value.price.trim()) {
    newErrors.price = 'El precio es obligatorio.';
  }

  if (!form.value.stock.trim()) {
    newErrors.stock = 'El stock es obligatorio.';
  }

  if (!form.value.categoryId) {
    newErrors.categoryId = 'Selecciona una categoría.';
  }

  if (!form.value.imageUrl.trim()) {
    newErrors.imageUrl = 'La URL de imagen es obligatoria.';
  } else if (!isValidImageUrl(form.value.imageUrl)) {
    newErrors.imageUrl =
      'Debe ser una URL válida (http, https o una ruta local que empiece por /uploads/).';
  }

  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

// Normalizar precio y stock (acepta 59,5)
const normalizeNumericFields = () => {
  const priceStr = form.value.price.replace(',', '.');
  const stockStr = form.value.stock.replace(',', '.');

  return {
    price: Number(priceStr),
    stock: Number(stockStr),
  };
};

// ---------- Cargar datos desde el backend ----------

// Categorías
const loadCategories = async () => {
  try {
    const data = await request({
      url: '/api/categories',
      method: 'GET',
    });
    categories.value = data;
  } catch (err) {
    console.error(err);
  }
};

// Producto a editar
const loadProduct = async () => {
  if (!isEdit.value) return;
  loading.value = true;
  try {
    const data = await request({
      url: `/api/products/${route.params.id}`,
      method: 'GET',
    });

    form.value = {
      name: data.name ?? '',
      description: data.description ?? '',
      price: String(data.price ?? ''),
      stock: String(data.stock ?? ''),
      categoryId: data.categoryId ?? '',
      imageUrl: data.imageUrl ?? '',
    };
  } catch (err) {
    console.error(err);
    generalError.value = 'No se pudo cargar el producto para editar.';
  } finally {
    loading.value = false;
  }
};

// ---------- Enviar formulario ----------
const handleSubmit = async () => {
  generalError.value = '';

  // Validación
  if (!validateForm()) return;

  const { price, stock } = normalizeNumericFields();

  if (Number.isNaN(price) || price <= 0) {
    errors.value.price = 'Introduce un precio numérico válido.';
    return;
  }

  if (Number.isNaN(stock) || stock < 0) {
    errors.value.stock = 'Introduce un stock numérico válido.';
    return;
  }

  saving.value = true;

  try {
    const payload = {
      name: form.value.name.trim(),
      description: form.value.description.trim(),
      price,
      stock,
      categoryId: form.value.categoryId,
      imageUrl: form.value.imageUrl.trim(),
    };

    if (isEdit.value) {
      // EDITAR
      await request({
        url: `/api/products/${route.params.id}`,
        method: 'PUT',
        body: payload,
      });
      showToast('Producto actualizado correctamente');
    } else {
      // CREAR
      await request({
        url: '/api/products',
        method: 'POST',
        body: payload,
      });
      showToast('Producto creado correctamente');
    }

    // Volver al catálogo
    router.push('/');
  } catch (err) {
    console.error(err);
    generalError.value = 'Ocurrió un error al guardar el producto.';
  } finally {
    saving.value = false;
  }
};

const handleCancel = () => {
  router.push('/');
};

onMounted(async () => {
  await loadCategories();
  await loadProduct();
});
</script>

<template>
  <section class="form-page">
    <header class="form-header">
      <p class="form-eyebrow">
        {{ isEdit ? 'EDITAR PRODUCTO' : 'NUEVO PRODUCTO' }}
      </p>
      <h1 class="form-title">
        {{ isEdit ? 'Editar producto' : 'Crear nuevo producto' }}
      </h1>
      <p class="form-subtitle">
        Completa los datos del producto. Los campos marcados con * son obligatorios.
      </p>
    </header>

    <div v-if="loading" class="state">Cargando datos...</div>

    <div v-else class="card">
      <form @submit.prevent="handleSubmit" class="form-grid">
        <!-- Nombre -->
        <div class="form-field">
          <label class="label">Nombre *</label>
          <input
            v-model="form.name"
            type="text"
            class="input"
            placeholder="Nombre del producto"
          />
          <p v-if="errors.name" class="error">{{ errors.name }}</p>
        </div>

        <!-- Descripción -->
        <div class="form-field">
          <label class="label">Descripción</label>
          <textarea
            v-model="form.description"
            rows="4"
            class="textarea"
            placeholder="Descripción del producto"
          />
        </div>

        <!-- Precio y stock -->
        <div class="form-row">
          <div class="form-field">
            <label class="label">Precio *</label>
            <input
              v-model="form.price"
              type="text"
              class="input"
              placeholder="Ej: 49.99"
            />
            <p v-if="errors.price" class="error">{{ errors.price }}</p>
          </div>

          <div class="form-field">
            <label class="label">Stock *</label>
            <input
              v-model="form.stock"
              type="text"
              class="input"
              placeholder="Ej: 20"
            />
            <p v-if="errors.stock" class="error">{{ errors.stock }}</p>
          </div>
        </div>

        <!-- Categoría -->
        <div class="form-field">
          <label class="label">Categoría *</label>
          <select v-model="form.categoryId" class="select">
            <option value="" disabled>Selecciona una categoría</option>
            <option
              v-for="cat in categories"
              :key="cat.id"
              :value="cat.id"
            >
              {{ cat.name }}
            </option>
          </select>
          <p v-if="errors.categoryId" class="error">{{ errors.categoryId }}</p>
        </div>

        <!-- URL imagen -->
        <div class="form-field">
          <label class="label">URL de imagen *</label>
          <input
            v-model="form.imageUrl"
            type="text"
            class="input"
            placeholder="https://... o /uploads/archivo.jpg"
          />
          <p v-if="errors.imageUrl" class="error">{{ errors.imageUrl }}</p>
          <p class="help">
            Puedes usar una URL completa (http/https) o una ruta local que empiece por
            <code>/uploads/</code>.
          </p>
        </div>

        <!-- Error general -->
        <p v-if="generalError" class="error general-error">
          {{ generalError }}
        </p>

        <!-- Botones -->
        <div class="form-actions">
          <button
            type="button"
            class="btn-secondary"
            @click="handleCancel"
            :disabled="saving"
          >
            Cancelar
          </button>

          <button
            type="submit"
            class="btn-primary"
            :disabled="saving"
          >
            {{ isEdit ? 'Guardar cambios' : 'Crear producto' }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped>
.form-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 3rem;
}

.form-header {
  margin-bottom: 1.5rem;
}

.form-eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.75rem;
  color: #9ca3af;
  margin-bottom: 0.25rem;
}

.form-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.form-subtitle {
  margin-top: 0.25rem;
  color: #6b7280;
}

.card {
  background: #ffffff;
  border-radius: 1.25rem;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
  padding: 2rem 2.25rem;
}

.form-grid {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
}

.input,
.select,
.textarea {
  border-radius: 0.7rem;
  border: 1px solid #d1d5db;
  padding: 0.65rem 0.85rem;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease,
    background-color 0.15s ease;
}

.input:focus,
.select:focus,
.textarea:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.25);
  background-color: #f9fafb;
}

.textarea {
  resize: vertical;
}

.error {
  color: #dc2626;
  font-size: 0.8rem;
}

.general-error {
  margin-top: 0.5rem;
}

.help {
  font-size: 0.8rem;
  color: #6b7280;
}

.help code {
  font-family: monospace;
}

.form-actions {
  margin-top: 1.25rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.btn-primary,
.btn-secondary {
  padding: 0.7rem 1.7rem;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background-color: #2563eb;
  color: #ffffff;
}

.btn-primary:hover {
  background-color: #1d4ed8;
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: default;
}

.btn-secondary {
  background-color: #f3f4f6;
  color: #111827;
}

.btn-secondary:hover {
  background-color: #e5e7eb;
}

.state {
  padding: 2rem 0;
  color: #4b5563;
}

@media (max-width: 800px) {
  .card {
    padding: 1.5rem 1.25rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
