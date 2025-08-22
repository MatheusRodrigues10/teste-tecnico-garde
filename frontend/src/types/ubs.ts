// Endereço básico usado na tela
export interface UBSAddressBasic {
  road?: string;
  house_number?: string;
  suburb?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
}

// UBS simplificada apenas com os campos usados
export interface UBSBasic {
  id: number;
  name: string;
  distance?: number;
  phone?: string;
  address: UBSAddressBasic;
}
