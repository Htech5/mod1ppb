import { supabase } from "../config/supabaseClient.js";

export const RestockModel = {
  async getAll() {
    const { data, error } = await supabase
      .from("restocks")
      .select(`
        id, supplier_name, quantity, created_at,
        products ( id, sku, name, stock )
      `)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  // insert restock + tambah stok produk dijalankan di satu transaksi Postgres
  async create({ product_id, supplier_name, quantity }) {
    const { data, error } = await supabase.rpc("create_restock", {
      p_product_id: product_id,
      p_supplier_name: supplier_name,
      p_quantity: quantity,
    });
    if (error) throw error;
    return data;
  },
};
