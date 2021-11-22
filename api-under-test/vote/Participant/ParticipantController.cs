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
        public IActionResult GetParticipants()
        {
            return Ok(_participantRepo.GetParticipants());
        }
    }
}