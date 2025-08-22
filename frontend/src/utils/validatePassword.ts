export const validatePassword = (password: string): string | null => {
  if (!password) return "A senha é obrigatória.";
  if (password.length < 6) return "A senha deve ter pelo menos 6 caracteres.";
  return null;
};
