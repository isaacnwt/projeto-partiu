export interface Link {
  label: string;
  url: string;
}

export interface Contato {
  nome: string;
  telefone?: string;
}

export interface Evento {
  _id: string;
  titulo: string;
  descricao?: string;
  data: string;
  endereco: string;
  imagem: string;
  links?: Link[];
  contatos?: Contato[];
}