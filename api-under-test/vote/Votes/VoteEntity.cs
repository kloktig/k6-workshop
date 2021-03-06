using System;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization.Metadata;
using Azure;
using Azure.Data.Tables;

#pragma warning disable 8618

namespace vote.Votes
{
    public record VoteEntity : ITableEntity
    {
        public int VoteCount(string name) => new[] {VotesDto?.vote1, VotesDto?.vote2, VotesDto?.vote3}.Count(v => v == name);

        public static VoteEntity From(string uid, string pollId, VotesDto votes)
        {
            return new VoteEntity
            {
                PartitionKey = uid,
                RowKey = pollId,
                Votes = JsonSerializer.Serialize(votes, typeof(VotesDto), VotesDtoContext.Default),
            };
        }

        private VotesDto? VotesDto => JsonSerializer.Deserialize<VotesDto>(Votes, VotesDtoContext.Default.VotesDto);
        

        public string Votes { get; init; }
        
        public string PartitionKey { get; set; }
        public string RowKey { get; set; }
        public DateTimeOffset? Timestamp { get; set; }
        public ETag ETag { get; set; }
    }
}