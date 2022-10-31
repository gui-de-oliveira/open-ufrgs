import axios from "axios";
import { BASE_URL } from "../config";

type Result =
  | { tag: "SUCCESS"; classes: Class[] }
  | { tag: "FAIL"; error: "UNKNOWN_RESPONSE" | "UNAUTHORIZED" };

export type Class = {
  nome: string;
  etapa: string;
  carater: string;
  creditos: string;
  codigoAtividade: string;
  codigoHabilitacao: string;
  codigoCurso: string;
  codigoSemestre: string;
  isAvailable: boolean;
  turmas: Turma[];
};

export type TimeAndPlace = {
  weekDay: "Segunda" | "Terça" | "Quarta" | "Quinta" | "Sexta";
  startTime: string;
  endTime: string;
  place: string | null;
};

export type Turma = {
  label: string;
  vagas: number;
  places: TimeAndPlace[];
  professors: string[];
};

export async function getAvailableClasses({
  sessionId,
}: {
  sessionId: string;
}): Promise<Result> {
  const response = await axios.get<Result>(`${BASE_URL}/available-classes`, {
    headers: {
      authorization: sessionId,
    },
  });

  return response.data;
}
