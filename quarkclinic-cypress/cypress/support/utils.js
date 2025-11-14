export function gerarDados() {
  const random = Math.floor(Math.random() * 100000);
  return {
    nome: `Usuário Teste ${random}`,
    telefone: `1199999${random.toString().slice(0, 4)}`,
    genero: "Masculino",
    dataNascimento: "1990-01-01",
    email: `marcos${random}@example.com`,
    tipoDocumento: "CPF",
    numeroDocumento: `123.456.789-${random.toString().slice(0, 2)}`,
    senha: "Senha@1234",
  };
}
export function gerarCPFValido() {
  const random = () => Math.floor(Math.random() * 9);

  let cpf = Array.from({ length: 9 }, () => random());

  const calcDV = (base) => {
    let sum = 0;
    let weight = base.length + 1;

    base.forEach((n) => (sum += n * weight--));

    const mod = sum % 11;
    return mod < 2 ? 0 : 11 - mod;
  };

  const dv1 = calcDV(cpf);
  const dv2 = calcDV([...cpf, dv1]);

  return [...cpf, dv1, dv2].join("");
}
