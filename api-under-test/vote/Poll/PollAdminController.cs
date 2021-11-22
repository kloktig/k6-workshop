using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using vote.Participant;

namespace vote.Poll
{
    [ApiController]
    [Route("admin/poll")]
    public class PollAdminController : ControllerBase
    {
        private readonly PollRepo _pollRepo;
        private readonly ParticipantRepo _participantRepo;

        public PollAdminController(PollRepo pollRepo, ParticipantRepo participantRepo)
        {
            _pollRepo = pollRepo;
            _participantRepo = participantRepo;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePollFromParticipants(List<ParticipantDto> participantsInPoll)
        {
            var participants = _participantRepo.GetParticipants();
            if (!participantsInPoll.All(participants.Contains))
            {
                return BadRequest("Can only include participants in poll");
            }

            await _pollRepo.WritePoll(participantsInPoll, null);
            return Ok();
        }

        [HttpPost]
        [Route("close/{id}")]
        public async Task<IActionResult> ClosePoll(string id)
        {
            return Ok(await _pollRepo.AddEndTime(id, DateTimeOffset.UtcNow));
        }

        [HttpGet]
        public IActionResult ListAll()
        {
            return Ok(_pollRepo.ListPolls());
        }
    }
}