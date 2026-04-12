// {
//   "attempt_id": "uuid-v4",
//   "response_id": "uuid-v4",
//   "exam_type": "IELTS",
//   "task_type": "Task 2",
//   "question": "Some people think...",
//   "content": "It is often argued...",
//   "target_score": 7.0
// }

export type WritingSubmittedIntegrationEvent = {
	attempt_id: string;
	response_id: string;
	exam_type: string;
	task_type: string;
	question: string;
	content: string;
	target_score: number;
};
