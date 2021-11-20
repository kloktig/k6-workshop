using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Text.Json;
using vote.Participant;

#pragma warning disable 8618

namespace vote.Poll
{
    public record PollDto
    {
        public string Id { get; init; }
        public IList<ParticipantDto> Participants { get; init; }
        public DateTimeOffset? StartTime { get; init; }
        public DateTimeOffset? EndTime { get; init; }

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
                Participants = JsonSerializer.Deserialize<IList<ParticipantDto>>(entity.Participants) ??
                               ImmutableList<ParticipantDto>.Empty,
                StartTime = entity.StartTime,
                EndTime = entity.EndTime 
            };
        }
    }
}