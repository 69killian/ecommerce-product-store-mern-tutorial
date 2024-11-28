import {create} from "zustand";


export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
      if (!newProduct.name || !newProduct.price || !newProduct.image) {
        return { success: false, message: "Please fill in all fields." };
      }
      const res = await fetch("/api/products", { // Proxy gère la redirection
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
  
      if (!res.ok) {
        const error = await res.text(); // Récupère le texte brut en cas d'erreur
        return { success: false, message: error || "Server error" };

      }
  
      const data = await res.json();
      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product created successfully." };
    },
    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({products: data.data});
    },
    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          // Si la requête échoue, renvoie une erreur
          return { success: false, message: "Failed to delete the product." };
        }
        const data = await res.json();
        if (!data.success) {
          return { success: false, message: data.message || "Product deletion failed." };
        }
        
        // Mise à jour de l'état pour supprimer le produit sans réactualisation de la page
        set((state) => ({
          products: state.products.filter((product) => product._id !== pid),
        }));
        return { success: true, message: "Product deleted successfully." };
      },

  }));
  