import type { QuestionType } from "@muscle-mind/types";
import { HotspotQuestion } from "./HotspotQuestion";
import { MatchQuestion, initialOrderedRightIds } from "./MatchQuestion";
import { MultiChoiceQuestion } from "./MultiChoiceQuestion";
import { OrderQuestion } from "./OrderQuestion";
import { SingleChoiceQuestion } from "./SingleChoiceQuestion";
import { TextQuestion } from "./TextQuestion";
import { TrueFalseQuestion } from "./TrueFalseQuestion";
import type { QuizAnswerState, QuizQuestion } from "../types";

type Props = {
  question: QuizQuestion;
  state: QuizAnswerState;
  answersById: Map<string, QuizQuestion["answers"][number]>;
  onSelectSingle: (id: string) => void;
  onToggleMulti: (id: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onTextChange: (value: string) => void;
  onMatchReorder: (ids: string[]) => void;
  lockedChoiceId?: string | null;
  wrongChoiceId?: string | null;
  disabled?: boolean;
};

export function QuestionBody({
  question,
  state,
  answersById,
  onSelectSingle,
  onToggleMulti,
  onMoveUp,
  onMoveDown,
  onTextChange,
  onMatchReorder,
  lockedChoiceId = null,
  wrongChoiceId = null,
  disabled = false,
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
          orderedRightIds={
            state.orderedAnswerIds.length > 0
              ? state.orderedAnswerIds
              : initialOrderedRightIds(question.answers)
          }
          onReorder={onMatchReorder}
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
    case "TRUE_FALSE":
      return (
        <TrueFalseQuestion
          choices={question.answers}
          lockedChoiceId={lockedChoiceId}
          wrongChoiceId={wrongChoiceId}
          disabled={disabled}
          onSelect={onSelectSingle}
        />
      );
    case "SINGLE":
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
