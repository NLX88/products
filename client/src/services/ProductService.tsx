import { safeParse, number } from "valibot";
import axios from "axios";
import { DraftProductSchema, ProductSchema, ProductsSchema, Product } from "../types";
import { toBoolean } from "../utils";

const NumberSchema = number();

type ProductData = {
    [k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: Number(data.price),
        });

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`;
            await axios.post(url, {
                name: result.data.name,
                price: result.data.price,
            });
        } else {
            throw new Error("Datos no válidos");
        }
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Ocurrió un error al agregar el producto");
    }
}

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`;
        const { data } = await axios(url);
        const result = safeParse(ProductsSchema, data.data);

        if (result.success) {
            return result.data;
        } else {
            throw new Error("Error al obtener los productos");
        }
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Ocurrió un error al obtener los productos");
    }
}

export async function getProductById(id: Product["id"]) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        const { data } = await axios(url);
        const result = safeParse(ProductSchema, data.data);

        if (result.success) {
            return result.data;
        } else {
            throw new Error("Producto no encontrado");
        }
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Ocurrió un error al obtener el producto");
    }
}

export async function updateProduct(data: ProductData, id: Product["id"]) {
    try {
        const price = safeParse(NumberSchema, data.price)?.success ? Number(data.price) : null;
        if (price === null) throw new Error("El precio no es válido");

        const result = safeParse(ProductSchema, {
            id,
            name: data.name.toString(),
            price,
            availability: toBoolean(data.availability.toString()),
        });

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
            await axios.put(url, result.data);
        }
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Ocurrió un error al actualizar el producto");
    }
}

export async function deleteProduct(id: Product["id"]) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        await axios.delete(url);
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Ocurrió un error al eliminar el producto");
    }
}

export async function updateProductAvailability(id: Product["id"]) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        await axios.patch(url);
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Ocurrió un error al actualizar la disponibilidad del producto");
    }
}
