using System;
using Microsoft.AspNetCore.Mvc;

namespace vote.Participant
{
    [ApiController]
    [Route("admin/participants")]
    public class ParticipantsAdminController : ControllerBase
    {
        private readonly ParticipantRepo _participantRepo;

        public ParticipantsAdminController(ParticipantRepo participantRepo)
        {
            _participantRepo = participantRepo;
        }
        
        [HttpPost]
        public IActionResult Post(ParticipantDto participantDto)
        {
            try
            {
                _participantRepo.AddParticipant(participantDto);
                return Ok(_participantRepo.GetParticipants());
            }
            catch (NotSupportedException e)
            {
                return BadRequest(e);
            }
        }
        
        [HttpDelete]
        public IActionResult Delete(ParticipantDto participantDto)
        {
            try
            {
                _participantRepo.RemoveParticipant(participantDto);
                return Ok(_participantRepo.GetParticipants());
            }
            catch (NotSupportedException e)
            {
                return BadRequest(e);
            }
        }
    }
}