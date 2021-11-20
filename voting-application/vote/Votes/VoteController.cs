using System.Collections.Immutable;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using vote.Poll;

namespace vote.Votes
{
    [ApiController]
    [Route("vote")]
    public class VoteController : ControllerBase
    {
        private readonly VotesRepo _votesRepo;
        private readonly PollRepo _pollRepo;

        public VoteController(VotesRepo votesRepo, PollRepo pollRepo )
        {
            _votesRepo = votesRepo;
            _pollRepo = pollRepo;
        }

        [HttpPost]
        [Route("/{pollId}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> AddVote(string pollId, VotesDto participantDto)
        {
            if (!_pollRepo.IsPollOpen(pollId)) 
                return BadRequest("Poll is closed");
            
            var uid = HttpContext.User.Claims.ToImmutableList()[0].Value;
            await _votesRepo.Write(uid, pollId, participantDto);
            
            return Accepted();
        }
    }
}