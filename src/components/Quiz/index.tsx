import React, { memo, useState } from "react";

import { QuizCard } from "./styles";

interface Props {
  hasQuiz: boolean;
  question: string;
  options: string[];
  answer: string[];
}

const Quiz = ({ hasQuiz, question, options, answer }: Props) => {
  return <QuizCard>{question}</QuizCard>;
};

export default memo(Quiz);
