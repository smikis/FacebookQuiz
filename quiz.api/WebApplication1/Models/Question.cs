using System.Collections.Generic;

namespace Quiz.Api.Models
{
    public class Question
    {
        public string Text { get; set; }
        public List<QuestionOption> Options { get; set; }
        public int CorrectOptionId { get; set; }
    }
}
