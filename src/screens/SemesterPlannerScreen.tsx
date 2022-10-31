import { useEffect, useState } from "react";
import { Class, getAvailableClasses } from "../api/getAvailableClasses";
import { FilterClasseByName } from "./steps/FilterClasseByName";
import { FilterClassesByTime } from "./steps/FilterClassesByTime";
import { BlocksDisplay } from "./steps/BlocksDisplay";
import { FilterClassesByTurma } from "./steps/FilterClassesByTurma";

type State =
  | { tag: "LOADING" | "ERROR" }
  | {
      tag:
        | "FILTER_BY_NAME"
        | "FILTER_BY_WEEK_SCHEDULE"
        | "FILTER_BY_TURMAS"
        | "FILTER_COMPLETE";
      classes: Class[];
    };

export function SemesterPlannerScreen({ sessionId }: { sessionId: string }) {
  const [state, setState] = useState<State>({ tag: "LOADING" });

  useEffect(() => {
    getAvailableClasses({ sessionId }).then((result) => {
      if (result.tag === "FAIL") {
        setState({ tag: "ERROR" });
        return;
      }

      setState({
        tag: "FILTER_BY_NAME",
        classes: result.classes,
      });
    });
  }, [sessionId]);

  if (state.tag === "LOADING") {
    return <div>Carregando...</div>;
  }

  if (state.tag === "ERROR") {
    return <div>Ocorreu um erro</div>;
  }

  if (state.tag === "FILTER_BY_NAME") {
    return (
      <FilterClasseByName
        classes={state.classes}
        onCompleted={(selectedClasses) =>
          setState({
            tag: "FILTER_BY_WEEK_SCHEDULE",
            classes: selectedClasses,
          })
        }
      />
    );
  }

  if (state.tag === "FILTER_BY_WEEK_SCHEDULE") {
    return (
      <FilterClassesByTime
        classes={state.classes}
        onCompleted={(selectedClasses) =>
          setState({
            tag: "FILTER_BY_TURMAS",
            classes: selectedClasses,
          })
        }
      />
    );
  }

  if (state.tag === "FILTER_BY_TURMAS") {
    return (
      <FilterClassesByTurma
        classes={state.classes}
        onCompleted={(selectedClasses) =>
          setState({
            tag: "FILTER_COMPLETE",
            classes: selectedClasses,
          })
        }
      />
    );
  }

  if (state.tag === "FILTER_COMPLETE") {
    return <BlocksDisplay classes={state.classes} />;
  }

  return <div></div>;
}
