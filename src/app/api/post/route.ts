import { NextResponse } from 'next/server';
import { Product } from '@/interfaces/producto'; 

export async function GET() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        
        if (!response.ok) {
            return NextResponse.json({ message: 'Error al obtener los productos' }, { status: response.status });
        }

        const products: Product[] = await response.json();
        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}
