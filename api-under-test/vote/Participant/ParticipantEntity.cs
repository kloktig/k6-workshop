using System;
using Azure;
using Azure.Data.Tables;
#pragma warning disable 8618

namespace vote.Participant
{
    public record ParticipantEntity : ITableEntity
    {
        public static ParticipantEntity Create(string name)
        {
            return new ParticipantEntity
            {
                PartitionKey = name,
                RowKey = Guid.NewGuid().ToString(),
                Name = name,
            };
        }
        public string Name { get; init; }
        public string PartitionKey { get; set; }
        public string RowKey { get; set; }
        public DateTimeOffset? Timestamp { get; set; }
        public ETag ETag { get; set; }
        
    }

    
}