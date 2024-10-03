import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {

    const { userId, products } = await req.json(); 

    const response = await fetch('https://fakestoreapi.com/carts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        date: new Date().toISOString(), 
        products,
      }), 
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ message: data.message || 'Error en la solicitud' }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error); 
    return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
  }
}
