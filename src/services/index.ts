import axios from "axios"

export type Question = {
  question: string
  options: string[]
  result: 'A' | 'B' | 'C' | 'D'
  score: number
}

export const getQuestion = () => {
  return axios.get<Question[]>('http://39.96.210.90:3000/api/exam_questions')
}