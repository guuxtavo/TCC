import { Workspace } from "./Workspace";

export type Worker = {
   id?: number,
   nome: string;
   cargo: string;
   classificacao: string;
   login: string;
   role?: string;
   dataNascimento: string,
   celula?: Workspace | null
}