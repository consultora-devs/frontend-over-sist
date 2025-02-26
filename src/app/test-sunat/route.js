// app/api/token/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  const url = 'https://api-seguridad.sunat.gob.pe/v1/clientessol/4a638f47-c89b-49fa-9f02-b895231b21af/oauth2/token/';

  const body = new URLSearchParams();
  body.append('grant_type', 'password');
  body.append('scope', 'https://api-sire.sunat.gob.pe');
  body.append('client_id', '4a638f47-c89b-49fa-9f02-b895231b21af');
  body.append('client_secret', 'sIT3Z6hqG4KAIZvVUzWUPA==');
  body.append('username', '1072469331372469331');
  body.append('password', 'Max123_123');

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    const data = await response.json(); // Intenta parsear la respuesta como JSON

    if (!response.ok) {
      // Si la respuesta no es exitosa, devuelve el error de la API
      return NextResponse.json(data, { status: response.status });
    }

    // Si la respuesta es exitosa, devuelve los datos
    return NextResponse.json(data);
  } catch (error) {
    // Si hay un error en la solicitud, devuelve un error genérico
    return NextResponse.json(
      { error: 'Error en la solicitud', details: error.message },
      { status: 500 }
    );
  }
}