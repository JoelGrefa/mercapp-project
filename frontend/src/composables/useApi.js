import { ref, onUnmounted } from 'vue';
import axios from 'axios';

export function useApi(baseURL = 'http://localhost:4000') {
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);
  let controller = null;

  const request = async (config) => {
    loading.value = true;
    error.value = null;
    controller = new AbortController();

    try {
      const response = await axios({
        baseURL,
        signal: controller.signal,
        ...config,
      });
      data.value = response.data;
      return response.data;
    } catch (err) {
      // Reintento simple 1 vez
      try {
        const response = await axios({
          baseURL,
          signal: controller.signal,
          ...config,
        });
        data.value = response.data;
        return response.data;
      } catch (err2) {
        error.value = err2;
        throw err2;
      }
    } finally {
      loading.value = false;
    }
  };

  const cancel = () => {
    if (controller) controller.abort();
  };

  onUnmounted(cancel);

  return {
    data,
    loading,
    error,
    request,
    cancel,
  };
}
