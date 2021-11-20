using Microsoft.AspNetCore.Mvc;

namespace vote.Poll
{
    [ApiController]
    [Route("poll")]
    public class PollController : ControllerBase
    {
        private readonly PollRepo _pollRepo;

        public PollController(PollRepo pollRepo)
        {
            _pollRepo = pollRepo;
        }
        
        [HttpGet]
        public IActionResult GetLastStartedPoll()
        {
            return Ok(_pollRepo.GetLastPoll());
        }
    }
}