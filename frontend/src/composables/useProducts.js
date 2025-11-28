import { ref, computed, onMounted } from 'vue';
import { useApi } from './useApi';

export function useProducts() {
  const { data, loading, error, request } = useApi('http://localhost:4000');

  const products = ref([]);
  const categories = ref([]);

  const searchQuery = ref('');
  const selectedCategory = ref('all');

  const fetchProducts = async () => {
    const result = await request({
      url: '/api/products',
      method: 'GET',
    });
    products.value = result;
  };

  const fetchCategories = async () => {
    const result = await request({
      url: '/api/categories',
      method: 'GET',
    });
    categories.value = result;
  };

  const visibleProducts = computed(() => {
    let list = products.value;

    if (selectedCategory.value !== 'all') {
      list = list.filter(
        (p) => p.categoryId === Number(selectedCategory.value)
      );
    }

    if (searchQuery.value.trim() !== '') {
      const q = searchQuery.value.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    return list;
  });

  onMounted(async () => {
    await Promise.all([fetchProducts(), fetchCategories()]);
  });

  return {
    products,
    categories,
    loading,
    error,
    searchQuery,
    selectedCategory,
    visibleProducts,
  };
}
