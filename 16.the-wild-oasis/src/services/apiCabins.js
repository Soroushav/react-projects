import toast from "react-hot-toast";
import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}
export async function createEditCabin(cabin, id) {
  // https://zbzfewntbmhnaeqapoxr.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const hasImage = cabin.image?.startsWith?.("https://zbzfewntbmhnaeqapoxr.supabase.co");
  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");
  const imagePath = hasImage ? cabin.image : `https://zbzfewntbmhnaeqapoxr.supabase.co/storage/v1/object/public/cabin-images/${imageName}`;
  let query = supabase.from("cabins");

  if (!id) {
    query = query
      .insert([{ ...cabin, image: imagePath }])
  } else {
    query = query.update([{...cabin, image: imagePath}]).eq("id", id);
  }
  const {data, error} = await query.select().single();

  if (error) {
    toast.error("Cabin could not be created/Updated!")
    throw new Error(error.message);
  }

  if(hasImage) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", cabin.id);
    throw new Error("Cabins image could not be uploaded");
  }
  return data;
}
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}
