using System;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Azure.Data.Tables;

namespace vote.Votes
{
    public class VotesRepo
    {
        private readonly TableClient _table;

        public VotesRepo()
        {
            TableServiceClient serviceClient = new(Common.DevConnectionString);
            serviceClient.CreateTableIfNotExists("votes");
            _table = serviceClient.GetTableClient("votes");
        }

        public async Task Write(string uid, string pollId, VotesDto votes)
        {
            await _table.UpsertEntityAsync(VoteEntity.From(uid, pollId, votes));
        }

        public ImmutableList<VoteEntity> Read(string id)
        {
            var filter = $"RowKey eq '{id}'";
            var pages = _table.Query<VoteEntity>(filter).AsPages().ToImmutableList();
            if (pages.Count > 1)
                throw new Exception("Assuming we have only one page");
            return pages.First().Values.ToImmutableList();
        }
    }
}