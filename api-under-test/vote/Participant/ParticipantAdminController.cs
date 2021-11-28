using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace vote.Participant
{
    [ApiController]
    [Route("admin/participant")]
    public class ParticipantsAdminController : ControllerBase
    {
        private readonly ParticipantRepo _participantRepo;

        public ParticipantsAdminController(ParticipantRepo participantRepo)
        {
            _participantRepo = participantRepo;
        }
        
        [HttpPost]
        [ProducesResponseType(typeof(IList<ParticipantDto>), 200)]
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
        [ProducesResponseType(typeof(IList<ParticipantDto>), 200)]
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