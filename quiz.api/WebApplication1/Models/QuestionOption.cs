using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quiz.Api.Models
{
    public class QuestionOption
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public char Prefix { get; set; }
    }
}
