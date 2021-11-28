using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Text.Json;
using System.Text.Json.Serialization;
using vote.Participant;

#pragma warning disable 8618

namespace vote.Poll
{
    public record PollDto
    {
        public string Id { get; set; }
        public IList<ParticipantDto> Participants { get; set; }
        public DateTimeOffset? StartTime { get; set; }
        public DateTimeOffset? EndTime { get; set; }

        public static PollDto Default = new()
        {
            Id = "null",
            Participants = ImmutableList<ParticipantDto>.Empty,
            StartTime = null,
            EndTime = null,
        };

        public static PollDto From(PollEntity entity)
        {
            return new PollDto
            {
                Id = entity.RowKey,
                Participants = JsonSerializer.Deserialize(entity.Participants, typeof(IList<ParticipantDto>), ParticipantDtoContext.Default) as IList<ParticipantDto> ?? new List<ParticipantDto>(),
                StartTime = entity.StartTime,
                EndTime = entity.EndTime 
            };
        }
    }
    
    [JsonSerializable(typeof(PollDto))]
    [JsonSourceGenerationOptions(GenerationMode = JsonSourceGenerationMode.Default)]
    internal partial class PollDtoContext : JsonSerializerContext
    {
        
    }
}