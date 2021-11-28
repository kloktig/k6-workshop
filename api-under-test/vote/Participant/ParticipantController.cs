using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace vote.Participant
{
    [ApiController]
    [Route("participants")]
    public class ParticipantsController : ControllerBase
    {
        private readonly ParticipantRepo _participantRepo;

        public ParticipantsController(ParticipantRepo participantRepo)
        {
            _participantRepo = participantRepo;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IList<ParticipantDto>), 200)]
        public IActionResult GetParticipants()
        {
            return Ok(_participantRepo.GetParticipants());
        }
    }
}