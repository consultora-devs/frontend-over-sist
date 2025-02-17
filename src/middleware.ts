// app/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Acceder a las cookies del request (en el servidor)
  const token = request.cookies.get("auth_token");

  console.log("Ejecutándose middleware");

  // Si el usuario no tiene el token, redirige a la página de inicio
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Este middleware se aplicará solo a rutas protegidas
export const config = {
  matcher: [
    "/ordenes-de-servicio/:path*", // Ruta protegida
    "/empresas",
    "/reportes",
    "/contabilidad"
  ],
};
