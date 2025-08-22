export const formatCep = (value: string): string => {
  // remove tudo que não for número
  let cep = value.replace(/\D/g, "");

  // limita a 8 dígitos
  if (cep.length > 8) {
    cep = cep.substring(0, 8);
  }

  // replace para 00000-000
  if (cep.length > 5) {
    cep = cep.replace(/^(\d{5})(\d{1,3})$/, "$1-$2");
  }

  return cep;
};
