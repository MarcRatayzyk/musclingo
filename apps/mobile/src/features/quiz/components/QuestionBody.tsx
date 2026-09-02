import type { QuestionType } from "@muscle-mind/types";
import { HotspotQuestion } from "./HotspotQuestion";
import { MatchQuestion } from "./MatchQuestion";
import { MultiChoiceQuestion } from "./MultiChoiceQuestion";
import { OrderQuestion } from "./OrderQuestion";
import { SingleChoiceQuestion } from "./SingleChoiceQuestion";
import { TextQuestion } from "./TextQuestion";
import type { QuizAnswerState, QuizQuestion } from "../types";

type Props = {
  question: QuizQuestion;
  state: QuizAnswerState;
  selectedLeftId: string | null;
  answersById: Map<string, QuizQuestion["answers"][number]>;
  onSelectSingle: (id: string) => void;
  onToggleMulti: (id: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onTextChange: (value: string) => void;
  onSelectLeft: (id: string) => void;
  onSelectRight: (id: string) => void;
};

export function QuestionBody({
  question,
  state,
  selectedLeftId,
  answersById,
  onSelectSingle,
  onToggleMulti,
  onMoveUp,
  onMoveDown,
  onTextChange,
  onSelectLeft,
  onSelectRight,
}: Props) {
  const type = question.type as QuestionType;

  switch (type) {
    case "TEXT":
      return (
        <TextQuestion
          question={question}
          value={state.textAnswer}
          onChange={onTextChange}
        />
      );
    case "MULTI":
      return (
        <MultiChoiceQuestion
          question={question}
          selectedIds={state.selectedAnswerIds}
          onToggle={onToggleMulti}
        />
      );
    case "ORDER":
      return (
        <OrderQuestion
          orderedIds={state.orderedAnswerIds}
          answersById={answersById}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
        />
      );
    case "MATCH":
      return (
        <MatchQuestion
          question={question}
          matches={state.matches}
          selectedLeftId={selectedLeftId}
          onSelectLeft={onSelectLeft}
          onSelectRight={onSelectRight}
        />
      );
    case "HOTSPOT":
      return (
        <HotspotQuestion
          question={question}
          selectedId={state.selectedAnswerIds[0] ?? null}
          onSelect={onSelectSingle}
        />
      );
    case "SINGLE":
    case "TRUE_FALSE":
    default:
      return (
        <SingleChoiceQuestion
          question={question}
          selectedId={state.selectedAnswerIds[0] ?? null}
          onSelect={onSelectSingle}
        />
      );
  }
}
