using System;
using System.Collections.Generic;
using System.Text.Json;
using Azure;
using Azure.Data.Tables;
using vote.Participant;
#pragma warning disable 8618

namespace vote.Poll
{
    public record PollEntity : ITableEntity
    {
        public static PollEntity Create(IList<ParticipantDto> participants, DateTimeOffset? endTime = null)
        {
            return new PollEntity
            {
                PartitionKey = "TBD",
                RowKey = Guid.NewGuid().ToString(),
                Participants = JsonSerializer.Serialize(participants),
                StartTime = DateTimeOffset.UtcNow,
                EndTime = endTime
            };
        }
        public string Participants { get; private set; }
        public DateTimeOffset StartTime { get; set; }
        public DateTimeOffset? EndTime { get; set; }

        public string PartitionKey { get; set; }
        public string RowKey { get; set; }
        public DateTimeOffset? Timestamp { get; set; }
        public ETag ETag { get; set; }
    }
}