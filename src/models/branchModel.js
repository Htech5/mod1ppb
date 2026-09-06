import { supabase } from "../config/supabaseClient.js";

export const BranchModel = {
  async getAll() {
    const { data, error } = await supabase.from("branches").select("*");
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("branches")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(branch) {
    const { data, error } = await supabase
      .from("branches")
      .insert([branch])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, branch) {
    const { data, error } = await supabase
      .from("branches")
      .update(branch)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async remove(id) {
    const { error } = await supabase.from("branches").delete().eq("id", id);
    if (error) throw error;
    return { message: "Branch deleted successfully" };
  },
};
