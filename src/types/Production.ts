import { Product } from "./Product"
import { Worker } from "./Worker"

export type Production = {
   data: Date,
   pontuacao: number,
   valorComissao: number,
   observacao: string,
   status: string,
   produtos : Product[],
   funcionarios: Worker[]
}