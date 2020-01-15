using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Quiz.Api.Models;

namespace Quiz.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        // GET: api/Question
        [HttpGet]
        public IEnumerable<Question> Get()
        {
            return new Question[]
            { new Question
                {
                Text = "What is the answer to Life, to Universe to Anything?",
                Options = new List<QuestionOption>() 
                {
                    new QuestionOption
                    {
                        Id = 11,
                        Prefix = 'A',
                        Text = "42"
                    },
                    new QuestionOption
                    {
                        Id = 12,
                        Prefix = 'B',
                        Text = "43"
                    },
                    new QuestionOption
                    {
                        Id = 13,
                        Prefix = 'C',
                        Text = "44"
                    },
                    new QuestionOption
                    {
                        Id = 14,
                        Prefix = 'D',
                        Text = "45"
                    },
                }
            }
            };
        }

        // GET: api/Question/5
        [HttpGet("{id}", Name = "Get")]
        public Question Get(int id)
        {
            return new Question
            {
                Text = "What is the answer to Life, to Universe to Anything?",
                Options = new List<QuestionOption>()
                {
                    new QuestionOption
                    {
                        Id = 11,
                        Prefix = 'A',
                        Text = "42"
                    },
                    new QuestionOption
                    {
                        Id = 12,
                        Prefix = 'B',
                        Text = "43"
                    },
                    new QuestionOption
                    {
                        Id = 13,
                        Prefix = 'C',
                        Text = "44"
                    },
                    new QuestionOption
                    {
                        Id = 14,
                        Prefix = 'D',
                        Text = "45"
                    },
                },
                CorrectOptionId = 11
            };
        }

        // POST: api/Question
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Question/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
