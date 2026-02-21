import { NextRequest, NextResponse } from 'next/server';
import { vehicles, getBrands, getModelsByBrand, getVariantsByBrandModel } from '@/lib/vehicles';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const action = searchParams.get('action');
  const brand = searchParams.get('brand');
  const model = searchParams.get('model');

  if (action === 'brands') {
    return NextResponse.json(getBrands());
  }

  if (action === 'models' && brand) {
    return NextResponse.json(getModelsByBrand(brand));
  }

  if (action === 'variants' && brand && model) {
    return NextResponse.json(getVariantsByBrandModel(brand, model));
  }

  return NextResponse.json(vehicles);
}
