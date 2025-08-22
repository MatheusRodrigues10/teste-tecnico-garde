export const validateEmail = (email: string): string | null => {
  if (!email) return "O email é obrigatório.";

  // Regex simples para validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) return "Email inválido.";

  return null; // sem erro
};
