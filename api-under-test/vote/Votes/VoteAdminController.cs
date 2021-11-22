using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using vote.Poll;

namespace vote.Votes
{
    [ApiController]
    [Route("admin/votes")]
    public class VoteAdminController : ControllerBase
    {
        private readonly PollRepo _pollRepo;
        private readonly VotesRepo _votesStorage;

        public VoteAdminController(PollRepo pollRepo)
        {
            _pollRepo = pollRepo;
            _votesStorage = new VotesRepo();
        }

        [HttpGet]
        [Route("voteCounts/{id}")]
        public IActionResult GetVoteCounts(string id)
        {
            var pollDto = PollDto.From(_pollRepo.FindEntity(id));
            var votes = _votesStorage.Read(id);
            var totalCount = pollDto.Participants.Sum(participants=>votes.Sum(vote => vote.VoteCount(participants.Name) ));
            var counts = pollDto.Participants.Select(p =>
            {
                var count = votes.Sum(a => a.VoteCount(p.Name)) ;
                var pct = totalCount == 0
                    ? decimal.Zero
                    : 100 * Convert.ToDecimal(count) / Convert.ToDecimal(totalCount);
                return new VoteCount(p.Name, count, pct);
            });
            return Ok(counts);
        }
    }
}